const mysql = require('mysql');
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

module.exports = dbConnection;