import Banner from './Banner';
import FeatureProduct from './FeatureProduct';
import ScrollToTopOnMount from '../template/ScrollToTopOnMount';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Landing() {
    const [productList, setProductList] = useState([]);

    const getItems = (_) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}`).then((res) => {
            const pData = res.data;
            console.log('product data', pData);
            setProductList(pData);
        });
    };


    useEffect(() => {
        getItems();
    }, []);

    return (
        <>
            <ScrollToTopOnMount />
            <Banner />
            <div className="d-flex flex-column bg-white py-4">
                <p className="text-center px-5">
                    Welcome to RB Shopping Store. Browse through products to buy
                    your dream.
                </p>
                <div className="d-flex justify-content-center">
                    <Link to="/products" className="btn btn-primary" replace>
                        Browse products
                    </Link>
                </div>
            </div>
            <h2 className="text-muted text-center mt-4 mb-3">New Arrival</h2>
            <div className="container pb-5 px-lg-5">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
                    {productList.map((product, index) => {
                        // return <p>Got {product.prod_name}!</p>;
                        return <FeatureProduct key={index} product={product} />;
                    })}
                </div>
            </div>
            <div className="d-flex flex-column bg-white py-4">
                <h5 className="text-center mb-3">Follow us on</h5>
                <div className="d-flex justify-content-center">
                    <a
                        href="https://www.facebook.com/amit.kesari/"
                        className="me-3"
                    >
                        <FontAwesomeIcon icon={['fab', 'facebook']} size="2x" />
                    </a>
                    <a href="https://www.instagram.com/cdc_iitt/">
                        <FontAwesomeIcon
                            icon={['fab', 'instagram']}
                            size="2x"
                        />
                    </a>
                    <a href="https://twitter.com/cdc_iitt" className="ms-3">
                        <FontAwesomeIcon icon={['fab', 'twitter']} size="2x" />
                    </a>
                </div>
            </div>
        </>
    );
}

export default Landing;
