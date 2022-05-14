// importing all the necessary files for backend implementation

const express = require('express');
const app = express();
const cors = require('cors');
const body_parser = require('body-parser');
const dotenv = require('dotenv');
const mysql = require('mysql');

// socket route functions
// const { getUser } = require('./routers/chatusers');
// const { verifyKey } = require('./helper/spamCheck');

const PORT = process.env.PORT || 5000;

app.use(cors());
dotenv.config();

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD || 'root123',
    database: 'rb_shopping_store',
});

dbConnection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// importing all the routers
// const chatboxRouter = require('./routers/chatbox');
// const askSomethingQuestionRouter = require('./routers/askSomethingQuestion');

// adding routes for each of them, it will work relatively
// app.use('/chatbox', chatboxRouter);
// app.use('/ask-something/question', askSomethingQuestionRouter);
// app.use('/', authRouter);

// simple route
app.get('/', (req, res) => {
    let sqlQuery = 'SELECT * FROM product';
    dbConnection.query(sqlQuery, function (error, results) {
        if (error) throw error;
        console.log('Product list is: ', results);
        // res.send({
        //     message: 'Welcome to the rb_shopping_store application.',
        //     data: results,
        // });
        res.send(results);
    });
});

app.get('/createdb', (req, res) => {
    // let sqlQuery = 'CREATE DATABASE rb_shopping_store;';
    let sqlQuery = `use rb_shopping_store;`;

    dbConnection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        console.log("db create:", result);
        res.send('rb store db created');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
// dbConnection.end();
