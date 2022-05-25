// importing all the important modules from modules folder
const express = require('express');
const router = express.Router();
const dbConnection = require('../connectDB');

router.use(express.json());

router.post('/get-product', async (req, res) => {
    try {
        const { pid } = req.body?req.body:1001;
        
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

module.exports = router;
