import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import axios from 'axios';


const Product = ({ product }) => {
    // Getting details of the user
    const userData = JSON.parse(localStorage.getItem('profile'));
    let percentOff;
    let offPrice = `Rs. ${product.price}`;

    const [cartList, setCartList] = useState([]);

    const addToCartClick = (e) => {
        let Cid = userData.uid + 2000;


        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/cart/add-product`, {
                cid: Cid,
                uid: userData.uid,
                pid: product.pid,
                cart_status: 'Progress',
                cart_name: userData.user_name + 'cart',
                bill: product.price,
                location: 'Jr-49, Renukoot',
                email: userData.email,
                payid: Math.round(Math.random() * 1000000),
            })
            .then((res) => {
                console.log('hi cartid data sent', res.data);
            })
            .catch((err) => console.log(err));
    };

    if (product.offer && product.offer > 0) {
        percentOff = (
            <div
                className="badge bg-dim py-2 text-white position-absolute"
                style={{ top: '0.5rem', right: '0.5rem' }}
            >
                {product.offer}% OFF
            </div>
        );

        offPrice = (
            <>
                <del>
                    Rs.{' '}
                    {Math.round(
                        product.price + (product.offer * product.price) / 100
                    )}
                    .99
                </del>{' '}
                Rs. {product.price}
            </>
        );
    }

    return (
        <div className="col">
            <div className="card shadow-sm">
                <Link to={`/products/${product.pid}`} href="/" replace>
                    {percentOff}
                    <img
                        className="card-img-top bg-dark cover"
                        height="200"
                        alt=""
                        src={product.imageUrl}
                    />
                </Link>
                <div className="card-body">
                    <h5 className="card-title text-center text-dark text-truncate">
                        {product.prod_name}
                    </h5>
                    <p className="card-text text-center text-muted mb-0">
                        {offPrice}
                    </p>
                    <div className="d-grid d-block">
                        <button
                            className="btn btn-outline-dark mt-3"
                            onClick={addToCartClick}
                        >
                            <FontAwesomeIcon icon={['fas', 'cart-plus']} /> Add
                            to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
