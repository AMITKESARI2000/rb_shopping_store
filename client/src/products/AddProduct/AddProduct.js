import React, { useRef, useState, useEffect } from 'react';
import { TextField, Grid, Rating, Typography, Stack } from '@mui/material';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const AddProduct = () => {
    const [pid, setPid] = useState(Math.round(Math.random() * 1000));
    const [prod_name, setProd_name] = useState('Silk Saree');
    const [arrival, setArrival] = useState('2022-02-05');
    const [price, setPrice] = useState(3200);
    const [offer, setOffer] = useState('15');
    const [category, setCategory] = useState("Women's Wear");
    const [manufacturer, setManufacturer] = useState('Saanskaar');
    const [brand, setBrand] = useState('South Kadhai');
    const [color, setColor] = useState('Green');
    const [prod_status, setProd_status] = useState('InStock');
    const [rating, setRating] = useState(4);
    const [prod_desc, setProd_desc] = useState(
        'Excellent saree with best quality in average prize range. To be delivered in time within specified period of delivery.'
    );
    const [imageUrl, setImageUrl] = useState(
        'https://images.unsplash.com/photo-1610189012906-4c0aa9b9781e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNpbGslMjBzYXJlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600'
    );

    const handleSubmit = () => {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/products/add-product`, {
                pid: pid,
                prod_name: prod_name,
                arrival: arrival,
                price: price,
                offer: offer,
                category: category,
                manufacturer: manufacturer,
                brand: brand,
                color: color,
                prod_status: prod_status,
                rating: rating,
                prod_desc: prod_desc,
                imageUrl: imageUrl,
            })
            .then((res) => {
                console.log(
                    'Got for insert entry: ',
                    pid,
                    prod_name,
                    arrival,
                    price,
                    offer,
                    category,
                    manufacturer,
                    brand,
                    color,
                    prod_status,
                    rating,
                    prod_desc,
                    imageUrl
                );
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };
    return (
        <div>
            <h4>AddProduct</h4>
            <h4>P</h4>
            <Grid container justifyContent="space-around" alignItems="center">
                <Grid item xs={12} sm={5}>
                    <h4 style={{ paddingLeft: '1em' }}>Details:</h4>
                    <TextField
                        label="Product ID"
                        color="info"
                        fullWidth
                        value={pid}
                        required
                        disabled
                        style={{ margin: '0.5em' }}
                    />
                    <TextField
                        label="Product Name"
                        color="info"
                        fullWidth
                        value={prod_name}
                        required
                        onChange={(e) => setProd_name(e.target.value)}
                        style={{ margin: '0.4em' }}
                    />
                    <TextField
                        label="Arrival Date [YYYY-MM-DD]"
                        color="info"
                        fullWidth
                        value={arrival}
                        required
                        onChange={(e) => setArrival(e.target.value)}
                        style={{ margin: '0.4em' }}
                    />
                    <TextField
                        label="Price"
                        color="info"
                        fullWidth
                        value={price}
                        required
                        onChange={(e) => setPrice(e.target.value)}
                        style={{ margin: '0.4em' }}
                    />
                    <TextField
                        label="Offer %"
                        color="info"
                        fullWidth
                        value={offer}
                        required
                        onChange={(e) => setOffer(e.target.value)}
                        style={{ margin: '0.4em' }}
                    />
                    <TextField
                        label="Category"
                        color="info"
                        fullWidth
                        value={category}
                        required
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ margin: '0.4em' }}
                    />
                    <TextField
                        label="Manufacturer"
                        color="info"
                        fullWidth
                        value={manufacturer}
                        required
                        onChange={(e) => setManufacturer(e.target.value)}
                        style={{ margin: '0.4em' }}
                    />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <h4 style={{ paddingLeft: '1em' }}>Add Product</h4>

                    <LoadingButton
                        color="info"
                        onClick={handleSubmit}
                        loadingPosition="start"
                        endIcon={<DoneAllIcon />}
                        variant="contained"
                        sx={{ margin: '1.3em' }}
                    >
                        Submit
                    </LoadingButton>
                    <TextField
                        label="Brand"
                        color="info"
                        fullWidth
                        value={brand}
                        required
                        onChange={(e) => setBrand(e.target.value)}
                        style={{ margin: '0.4em' }}
                    />
                    <TextField
                        label="Color"
                        color="info"
                        fullWidth
                        value={color}
                        required
                        onChange={(e) => setColor(e.target.value)}
                        style={{ margin: '0.4em' }}
                    />
                    <TextField
                        label="Product status [InStock/OutOfStock]"
                        color="info"
                        fullWidth
                        value={prod_status}
                        required
                        onChange={(e) => setProd_status(e.target.value)}
                        style={{ margin: '0.4em' }}
                    />
                    <TextField
                        label="Image URL"
                        color="info"
                        fullWidth
                        value={imageUrl}
                        required
                        onChange={(e) => setImageUrl(e.target.value)}
                        style={{ margin: '0.4em' }}
                    />

                    <TextField
                        label="Product Description"
                        color="info"
                        fullWidth
                        multiline
                        value={prod_desc}
                        required
                        onChange={(e) => setProd_desc(e.target.value)}
                        style={{ margin: '0.4em' }}
                    />

                    <div
                        style={{
                            margin: '0.4em',
                            border: '1px solid grey',
                            borderRadius: '3px',
                            padding: '0.5em',
                        }}
                    >
                        <Typography component="legend">Rating*</Typography>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default AddProduct;
