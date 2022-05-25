// importing all the important modules from modules folder
const express = require('express');
const router = express.Router();
const dbConnection = require('../connectDB');

router.use(express.json());

router.post('/get-product', async (req, res) => {
    try {
        const { pid } = req.body ? req.body : 1001;

        // searching for the id
        let sqlQuery = `SELECT * FROM product WHERE pid=${pid}`;
        dbConnection.query(sqlQuery, function (error, results) {
            if (error) throw error;
            console.log('Specified product of ', pid, ' is: ', results[0]);
            res.send(results[0]);
        });
    } catch (err) {
        console.log(err);
    }
});

router.post('/add-product', async (req, res) => {
    try {
        const {
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
            imageUrl,
        } = req.body ? req.body : 1001;

        // insert values into product table
        let sqlQuery = `INSERT INTO product VALUES(${pid}, "${prod_name}", "${arrival}", ${price}, "${offer}", "${category}", "${manufacturer}", "${brand}", "${color}", "${prod_status}", ${rating}, "${prod_desc}", "${imageUrl}")`;
        dbConnection.query(sqlQuery, function (error, results) {
            if (error) throw error;
            console.log(
                'Inserted into product with pid ',
                pid,
                ' is: ',
                results[0]
            );
            res.send(results[0]);
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
