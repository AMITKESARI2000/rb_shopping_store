// importing all the important modules from modules folder
const express = require('express');
const router = express.Router();
const dbConnection = require('../connectDB');

router.use(express.json());

router.post('/get-cart', async (req, res) => {
    try {
        const { cid } = req.body;

        // searching for the cid
        let sqlQuery = `SELECT * FROM cart WHERE cid=${cid}`;
        dbConnection.query(sqlQuery, function (error, results) {
            if (error) throw error;
            console.log('got from cart', results);
            res.send(results);
        });
    } catch (err) {
        console.log(err);
    }
});

router.post('/del-cart', async (req, res) => {
    try {
        const { cid, uid, newBalance } = req.body;

        // searching for the cid

        let sqlQuery = `UPDATE user SET balance=${newBalance} WHERE uid=${uid}`;
        dbConnection.query(sqlQuery, function (error, results) {
            if (error) throw error;
            console.log('updated balance :', newBalance);
        });
        sqlQuery = `DELETE FROM cart WHERE cid=${cid}`;
        dbConnection.query(sqlQuery, function (error, results) {
            if (error) throw error;
            console.log('deleted cart, cid:', cid);
        });
        sqlQuery = `SELECT * FROM user WHERE uid=${uid}`;
        dbConnection.query(sqlQuery, function (error, results) {
            if (error) throw error;
            console.log('return user, uid:', uid, results[0]);
            res.send(results[0]);
        });
    } catch (err) {
        console.log(err);
    }
});

router.post('/del-product', async (req, res) => {
    try {
        const { payid } = req.body;

        // searching for the cid
        let sqlQuery = `DELETE FROM cart WHERE payid=${payid}`;
        dbConnection.query(sqlQuery, function (error, results) {
            if (error) throw error;
            console.log('deleted from cart, payid:', payid);
        });
    } catch (err) {
        console.log(err);
    }
});

router.post('/add-product', async (req, res) => {
    try {
        const {
            cid,
            uid,
            pid,
            cart_status,
            cart_name,
            bill,
            location,
            email,
            payid,
        } = req.body;

        // searching for the id
        let sqlQuery = `INSERT INTO cart VALUES(${cid}, ${uid}, ${pid}, "${cart_status}", "${cart_name}", ${bill}, "${location}", "${email}", ${payid})`;
        dbConnection.query(sqlQuery, function (error, results) {
            if (error) throw error;
            console.log('inserted into cart', results[0]);
            res.send(results[0]);
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
