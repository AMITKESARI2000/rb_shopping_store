import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Button } from '@mui/material';

const CheckoutCart = () => {
    let sum = 0;
    const userData = JSON.parse(localStorage.getItem('profile'));
    // uid = 0001, 0002, ...
    // pid = 1001, 1002, ...
    // cid = 2001, 2002, ...
    let Cid = userData.uid + 2000;
    const [cartItems, setCartItems] = useState([]);
    const [totalBilled, setTotalBilled] = useState(0);
    const [loading, setLoading] = useState(true);
    const checkoutImageUrl =
        'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNob3BwaW5nfGVufDB8fDB8fA%3D%3D&auto=format&w=900&h=400';

    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/cart/get-cart`, {
                cid: Cid,
            })
            .then((res) => {
                console.log('hi cart items found', res.data);
                setLoading(false);
                setCartItems(res.data);
            })
            .catch((err) => console.log(err));
        setTotalBilled(sum.toFixed(2));
    }, []);

    const handleBillUpdate = () => {
        setTotalBilled(sum.toFixed(2));
    };

    const removeCartItem = (payid) => {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/cart/del-product`, {
                payid: payid,
            })
            .then((res) => {
                setCartItems(res.data);
                sum = 0;
                for (let i = 0; i < cartItems.length; i++) {
                    const element = cartItems[i];
                    sum += element.bill;
                }
                window.location.reload();
            })
            .catch((err) => console.log(err));
        setTotalBilled(sum);
    };

    return (
        <div>
            {loading ? (
                <div>
                    <h1>Loading Checkout Cart...</h1>
                    <h1>Loading Checkout Cart...</h1>
                </div>
            ) : (
                <div>
                    <h1>Loaded Checkout Cart.</h1>
                    {cartItems.length === 0 ? (
                        <h1>Empty cart. Please buy some items first</h1>
                    ) : (
                        <div
                            style={{ margin: '4em' }}
                            onMouseEnter={handleBillUpdate}
                        >
                            <Grid container>
                                <Grid
                                    item
                                    sm={4}
                                    xs={12}
                                    style={{ margin: '3em' }}
                                >
                                    <h2
                                        style={{
                                            textDecoration: 'underline',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        Cart Checkout
                                    </h2>
                                    <h4 style={{ fontStyle: 'italic' }}>
                                        Total Payable Amount: Rs. {totalBilled}
                                    </h4>
                                    <img
                                        className="card-img-top bg-dark cover"
                                        width="200"
                                        height="400"
                                        alt=""
                                        src={checkoutImageUrl}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <hr></hr>
                                    {cartItems.map((item, index) => {
                                        sum += item.bill;
                                        Math.round(sum);
                                        sum += 0.99;
                                        return (
                                            <div key={index}>
                                                <h4>
                                                    Cart Name:{' '}
                                                    <i>{item.cart_name}</i>
                                                </h4>
                                                <h4>
                                                    Bill: <i>Rs.{item.bill}</i>
                                                </h4>
                                                <h4>
                                                    Location:{' '}
                                                    <i>{item.location}</i>
                                                </h4>
                                                <h4>
                                                    Email (for tracking and
                                                    OTP): <i>{item.email}</i>
                                                </h4>
                                                <h4>
                                                    PayID: <i>{item.payid}</i>
                                                </h4>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    // onClick={removeCartItem(item.payid)}
                                                >
                                                    Remove
                                                </Button>
                                                <hr></hr>
                                            </div>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CheckoutCart;
