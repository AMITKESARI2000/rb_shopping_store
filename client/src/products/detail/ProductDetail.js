import Image from '../../nillkin-case-1.jpg';
import RelatedProduct from './RelatedProduct';
import Ratings from 'react-ratings-declarative';
import { Link, useParams } from 'react-router-dom';
import ScrollToTopOnMount from '../../template/ScrollToTopOnMount';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const iconPath =
    'M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z';

const ProductDetail = () => {
    // Getting details of the user
    const userData = JSON.parse(localStorage.getItem('profile'));
    let Cid = userData.uid + 2000;

    const changeRating = (newRating) => {};
    const { pid } = useParams();
    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState({});

    useEffect(() => {
        setLoading(true);

        if (pid != parseInt(pid, 10)) {
            window.location = `${process.env.REACT_APP_FRONTEND_URL}/products`;
        }
        // Getting product from the backend
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/products/get-product`, {
                pid: pid,
            })
            .then((res) => {
                console.log('hi pid product: ', pid, res.data);
                setProductData(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    const addToCartClick = (e) => {
        let Cid = userData.uid + 2000;

        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/cart/add-product`, {
                cid: Cid,
                uid: userData.uid,
                pid: productData.pid,
                cart_status: 'Progress',
                cart_name: userData.user_name + 'cart',
                bill: productData.price,
                location: 'Jr-49, Renukoot',
                email: userData.email,
                payid: Math.round(Math.random() * 1000000),
            })
            .then((res) => {
                console.log('hi cartid data sent', res.data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            {loading ? (
                // Show circular progress till loading
                <div>
                    <h1>Loading...</h1>
                    <h1>Loading...</h1>
                    <CircularProgress />
                </div>
            ) : (
                <div className="container mt-5 py-4 px-xl-5">
                    <ScrollToTopOnMount />
                    <nav
                        aria-label="breadcrumb"
                        className="bg-custom-light rounded mb-4"
                    >
                        <ol className="breadcrumb p-3">
                            <li className="breadcrumb-item">
                                <Link
                                    className="text-decoration-none link-secondary"
                                    to="/products"
                                >
                                    All Products
                                </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <a
                                    className="text-decoration-none link-secondary"
                                    href="!#"
                                >
                                    {productData.category}
                                </a>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                {productData.prod_name}
                            </li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-12 mb-4">
                                    <img
                                        className="border rounded ratio ratio-1x1"
                                        alt=""
                                        src={productData.imageUrl}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="d-flex flex-column h-100">
                                <h2 className="mb-1">
                                    {productData.prod_name}
                                </h2>
                                <h4 className="text-muted mb-4">
                                    Rs. {productData.price}
                                </h4>

                                <div className="row g-3 mb-4">
                                    <div className="col">
                                        <button
                                            className="btn btn-outline-dark py-2 w-100"
                                            onClick={addToCartClick}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                    <Link to={`/checkout/${Cid}`}>
                                        <div className="col">
                                            <button
                                                className="btn btn-dark py-2 w-100"
                                                onClick={addToCartClick}
                                            >
                                                Buy now
                                            </button>
                                        </div>
                                    </Link>
                                </div>

                                <h4 className="mb-0">Details</h4>
                                <hr />
                                <dl className="row">
                                    <dt className="col-sm-4">Code</dt>
                                    <dd className="col-sm-8 mb-3">
                                        {productData.pid}
                                    </dd>

                                    <dt className="col-sm-4">Category</dt>
                                    <dd className="col-sm-8 mb-3">
                                        {productData.category}
                                    </dd>

                                    <dt className="col-sm-4">Brand</dt>
                                    <dd className="col-sm-8 mb-3">
                                        {productData.brand}
                                    </dd>

                                    <dt className="col-sm-4">Manufacturer</dt>
                                    <dd className="col-sm-8 mb-3">
                                        {productData.manufacturer}
                                    </dd>

                                    <dt className="col-sm-4">Color</dt>
                                    <dd className="col-sm-8 mb-3">
                                        {productData.color}
                                    </dd>

                                    <dt className="col-sm-4">Status</dt>
                                    <dd className="col-sm-8 mb-3">
                                        {productData.prod_status}
                                    </dd>

                                    <dt className="col-sm-4">Rating</dt>
                                    <dd className="col-sm-8 mb-3">
                                        <Ratings
                                            rating={productData.rating}
                                            widgetRatedColors="rgb(253, 204, 13)"
                                            changeRating={changeRating}
                                            widgetSpacings="2px"
                                        >
                                            {Array.from(
                                                { length: 5 },
                                                (_, i) => {
                                                    return (
                                                        <Ratings.Widget
                                                            key={i}
                                                            widgetDimension="20px"
                                                            svgIconViewBox="0 0 19 20"
                                                            svgIconPath={
                                                                iconPath
                                                            }
                                                            widgetHoverColor="rgb(253, 204, 13)"
                                                        />
                                                    );
                                                }
                                            )}
                                        </Ratings>
                                    </dd>
                                </dl>

                                <h4 className="mb-0">Description</h4>
                                <hr />
                                <p className="lead flex-shrink-0">
                                    <small>{productData.prod_desc}</small>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <hr />
                            <h4 className="text-muted my-4">
                                Related products
                            </h4>
                            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
                                {Array.from({ length: 4 }, (_, i) => {
                                    return (
                                        <RelatedProduct
                                            key={i}
                                            percentOff={i % 2 === 0 ? 15 : null}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetail;
