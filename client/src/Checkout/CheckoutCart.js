import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Grid,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
} from '@mui/material';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CheckoutCart = () => {
    let sum = 0;
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem('profile'))
    );
    // uid = 0001, 0002, ...
    // pid = 1001, 1002, ...
    // cid = 2001, 2002, ...
    let Cid = userData.uid + 2000;
    const [cartItems, setCartItems] = useState([]);
    const [totalBilled, setTotalBilled] = useState(0);
    const [loading, setLoading] = useState(true);
    const checkoutImageUrl =
        'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNob3BwaW5nfGVufDB8fDB8fA%3D%3D&auto=format&w=900&h=400';

    const [open, setDialogOpen] = useState(false);
    const [snackbar, setSnackbar] = useState(false);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleSnackbarClose = (event, reason) => {
        // if (reason === 'clickaway') {
        //     return;
        // }

        setSnackbar(false);
    };

    const handlePayment = () => {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/cart/del-cart`, {
                cid: Cid,
                uid: userData.uid,
                newBalance: userData.balance - totalBilled,
            })
            .then((res) => {
                setSnackbar(true);

                setCartItems([]);
                setUserData(res.data);
                localStorage.setItem(
                    'profile',
                    JSON.stringify({ ...res.data })
                );
            })
            .catch((err) => console.log(err));

        setDialogOpen(false);
        setTimeout(() => {
            window.location = `${process.env.REACT_APP_FRONTEND_URL}#/profile/${userData.uid}`;
        }, 500);
    };

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
                // setCartItems(res.data);
                for (let i = 0; i < cartItems.length; i++) {
                    const element = cartItems[i];
                    if (element.payid === payid) {
                        sum -= element.bill;
                        Math.ceil(sum);
                    }
                }
            })
            .catch((err) => console.log(err));
        setTotalBilled(sum);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        // console.log(payid, payid);
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

                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={handleClickOpen}
                                    >
                                        Pay 💵
                                    </Button>
                                    <Dialog
                                        open={open}
                                        onClose={handleDialogClose}
                                    >
                                        <DialogTitle>
                                            Payment Checkout
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Confirm Password for a payment
                                                of Rs. {Math.round(totalBilled)}
                                                .00 from user account of{' '}
                                                {userData.user_name}.<br />
                                                <br />
                                                Note: All taxes included
                                            </DialogContentText>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                label="Password"
                                                type="password"
                                                fullWidth
                                                variant="standard"
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleDialogClose}>
                                                Cancel
                                            </Button>
                                            <Button onClick={handlePayment}>
                                                Pay!
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                    <Snackbar
                                        open={open}
                                        autoHideDuration={6000}
                                        onClose={handleSnackbarClose}
                                    >
                                        <Alert
                                            onClose={handleSnackbarClose}
                                            severity="success"
                                            sx={{ width: '100%' }}
                                        >
                                            Paying Rs. {totalBilled}...
                                        </Alert>
                                    </Snackbar>

                                    <hr></hr>
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
                                        Math.ceil(sum);

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
                                                    onClick={() => {
                                                        removeCartItem(
                                                            item.payid
                                                        );
                                                    }}
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
