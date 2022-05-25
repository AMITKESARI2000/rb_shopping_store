// importing all the necessary files for backend implementation

const express = require('express');
const app = express();
const cors = require('cors');
const body_parser = require('body-parser');
const dotenv = require('dotenv');
const dbConnection = require('./connectDB');

const PORT = process.env.PORT || 5000;
app.use(cors());
dotenv.config();

// importing all the routers
const productRouter = require('./routers/product');
const cartRouter = require('./routers/cart');
const loginRouter = require('./routers/login');
const createdbRouter = require('./routers/createdb');

// adding routes for each of them, it will work relatively
// app.use('/', authRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/login', loginRouter);
app.use('/createdb', createdbRouter);

// simple route
app.get('/', (req, res) => {
    let sqlQuery = 'SELECT * FROM product';
    dbConnection.query(sqlQuery, function (error, results) {
        if (error) throw error;
        // console.log('Produ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ct list is: ', results);
        // res.send({
        //     message: 'Welcome to the rb_shopping_store application.',
        //     data: results,
        // });
        res.send(results);
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
// dbConnection.end();
