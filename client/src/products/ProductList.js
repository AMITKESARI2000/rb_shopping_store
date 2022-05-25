import { Link } from 'react-router-dom';
import Product from './Product';
import ProductH from './ProductH';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollToTopOnMount from '../template/ScrollToTopOnMount';
import axios from 'axios';

let categories = [
    "Men's Wear",
    " Women's Wear",
    'Electronics',
    'Daily Items',
    'Food',
    'Accessories',
];
let brands = ['Levi', 'Apple', 'Adidas', 'Nike', 'HP'];
let manufacturers = ['Apple', 'Samsung', 'Sonata', 'Tata', 'Bajaj'];
let globalMinPrice = 100;
let globalMaxPrice = 100000;

const ProductList = () => {
    const [minPrice, setMinPrice] = useState(globalMinPrice);
    const [maxPrice, setMaxPrice] = useState(globalMaxPrice);

    const [viewType, setViewType] = useState({ grid: true });
    const [productsList, setProductsList] = useState([]);
    const [manufacturersList, setManufacturersList] = useState(manufacturers);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}`)
            .then((res) => {
                setProductsList(res.data);
                productsList.forEach(function (item, index) {
                    categories.push(item.category);
                    brands.push(item.brand);
                    manufacturers.push(item.manufacturer);
                    categories = [...new Set(categories)];
                    brands = [...new Set(brands)];
                    manufacturers = [...new Set(manufacturers)];
                });
            })
            .catch((err) => console.log(err));
    }, []);

    const changeViewType = () => {
        setViewType({
            grid: !viewType.grid,
        });
    };

    return (
        <div className="container mt-5 py-4 px-xl-5">
            <ScrollToTopOnMount />
            <nav aria-label="breadcrumb" className="bg-custom-light rounded">
                <ol className="breadcrumb p-3 mb-0">
                    <li className="breadcrumb-item">
                        <Link
                            className="text-decoration-none link-secondary"
                            to="/products"
                            replace
                        >
                            All Products
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Carousel
                    </li>
                </ol>
            </nav>

            <div className="h-scroller d-block d-lg-none">
                <nav className="nav h-underline">
                    {categories.map((v, i) => {
                        return (
                            <div key={i} className="h-link me-2">
                                <Link
                                    to="/products"
                                    className="btn btn-sm btn-outline-dark rounded-pill"
                                    replace
                                >
                                    {v}
                                </Link>
                            </div>
                        );
                    })}
                </nav>
            </div>

            <div className="row mb-3 d-block d-lg-none">
                <div className="col-12">
                    <div id="accordionFilter" className="accordion shadow-sm">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button
                                    className="accordion-button fw-bold collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseFilter"
                                    aria-expanded="false"
                                    aria-controls="collapseFilter"
                                >
                                    Filter Products
                                </button>
                            </h2>
                        </div>
                        <div
                            id="collapseFilter"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFilter"
                        >
                            <div className="accordion-body p-0">
                                {/* TODO: add heree */}
                                {/* <FilterMenuLeft /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4 mt-lg-3">
                <div className="d-none d-lg-block col-lg-3">
                    <div className="border rounded shadow-sm">
                        {/* ===FILTER MENU=== */}
                        <ul className="list-group list-group-flush rounded">
                            <li className="list-group-item d-none d-lg-block">
                                <h5 className="mt-1 mb-2">Browse</h5>
                                <div className="d-flex flex-wrap my-2">
                                    {categories.map((v, i) => {
                                        return (
                                            <Link
                                                key={i}
                                                to="/products"
                                                className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                                                replace
                                            >
                                                {v}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </li>
                            <li className="list-group-item">
                                <h5 className="mt-1 mb-1">Brands</h5>
                                <div className="d-flex flex-column">
                                    {brands.map((v, i) => {
                                        return (
                                            <div key={i} className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="flexCheckDefault"
                                                >
                                                    {v}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </li>
                            <li className="list-group-item">
                                <h5 className="mt-1 mb-1">Manufacturers</h5>
                                <div className="d-flex flex-column">
                                    {manufacturers.map((v, i) => {
                                        return (
                                            <div key={i} className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="flexCheckDefault"
                                                >
                                                    {v}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </li>
                            <li className="list-group-item">
                                <h5 className="mt-1 mb-2">Price Range</h5>
                                <div className="d-grid d-block mb-3">
                                    <div className="form-floating mb-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Min"
                                            defaultValue={minPrice}
                                            value={minPrice}
                                            onChange={(e) => {
                                                setMinPrice(e.target.value);
                                            }}
                                        />
                                        <label htmlFor="floatingInput">
                                            Min Price
                                        </label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Max"
                                            defaultValue={maxPrice}
                                            value={maxPrice}
                                            onChange={(e) => {
                                                setMaxPrice(e.target.value);
                                            }}
                                        />
                                        <label htmlFor="floatingInput">
                                            Max Price
                                        </label>
                                    </div>
                                    <button
                                        className="btn btn-dark"
                                        // onClick={handlePriceRange}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </li>
                        </ul>
                        {/* ===FILTER MENU=== */}
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="d-flex flex-column h-100">
                        <div className="row mb-3">
                            <div className="col-lg-3 d-none d-lg-block">
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    defaultValue=""
                                >
                                    <option value="">All Models</option>
                                    <option value="1">iPhone X</option>
                                    <option value="2">iPhone Xs</option>
                                    <option value="3">iPhone 11</option>
                                </select>
                            </div>
                            <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                                <div className="input-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Search products..."
                                        aria-label="search input"
                                    />
                                    <button className="btn btn-outline-dark">
                                        <FontAwesomeIcon
                                            icon={['fas', 'search']}
                                        />
                                    </button>
                                </div>
                                <button
                                    className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                                    onClick={changeViewType}
                                >
                                    <FontAwesomeIcon
                                        icon={[
                                            'fas',
                                            viewType.grid
                                                ? 'th-list'
                                                : 'th-large',
                                        ]}
                                    />
                                </button>
                            </div>
                        </div>
                        <div
                            className={
                                'row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 ' +
                                (viewType.grid
                                    ? 'row-cols-xl-3'
                                    : 'row-cols-xl-2')
                            }
                        >
                            {productsList
                                .filter(
                                    (product, index) =>
                                        product.price <= maxPrice &&
                                        product.price >= minPrice
                                )
                                .map((product, index) => {
                                    return (
                                        <Product
                                            key={index}
                                            product={product}
                                        />
                                    );
                                })}
                        </div>
                        <div className="d-flex align-items-center mt-auto">
                            <span className="text-muted small d-none d-md-inline">
                                Showing 10 of 100
                            </span>
                            <nav
                                aria-label="Page navigation example"
                                className="ms-auto"
                            >
                                <ul className="pagination my-0">
                                    <li className="page-item">
                                        <a className="page-link" href="!#">
                                            Previous
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="!#">
                                            1
                                        </a>
                                    </li>
                                    <li className="page-item active">
                                        <a className="page-link" href="!#">
                                            2
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="!#">
                                            3
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="!#">
                                            Next
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
