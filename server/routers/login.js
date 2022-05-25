// importing all the important modules from modules folder
const express = require('express');
const router = express.Router();
const dbConnection = require('../connectDB');

router.use(express.json());

router.post('/', async (req, res) => {
    try {
        const { user_name, user_pass } = req.body;
        console.log('trying to login backend!!', user_name);

        // searching for the uid
        let sqlQuery = `SELECT * FROM user WHERE user_name="${user_name}" AND user_pass="${user_pass}"`;
        dbConnection.query(sqlQuery, function (error, results) {
            if (error) throw error;
            console.log('Requested user is: ', results);
            res.send(results);
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
