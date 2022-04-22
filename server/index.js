// importing all the necessary files for backend implementation

const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

const SELECT_ALL_ITEMS_QUERY = 'SELECT * FROM items';

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

app.get('/', (req, res) => {
    res.send("Hello")
});

app.get('/items', (req, res) => {
    connection.query(SELECT_ALL_ITEMS_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});

app.listen(4000, () => {
    console.log(`Products server listening on port 4000`)
});