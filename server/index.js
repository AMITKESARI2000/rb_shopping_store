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

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'rb_shopping_store'
});

connection.connect(err => {
    if (err) {
        return err;
    }
});

app.use(cors());

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
});
// database: 'rbshoppingstore',

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
    res.json({ message: 'Welcome to th rb_shopping_store application.' });
});

app.get('/createdb', (req, res) => {
    let sqlQuery = 'CREATE DATABASE rbstore';
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('rb store db created');
    });
});

dbConnection.query(
    'SELECT 1 + 1 AS solution',
    function (error, results) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
dbConnection.end();
