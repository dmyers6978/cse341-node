var express = require('express');
var router = express.Router();

var dbConnect = require('../connections/herokuDB');

/* GET home page. */
router.get('/', async (req, res) => {
    try {
        const client = await dbConnect.connect();
        const result = await client.query('SELECT * FROM test_table');
        const results = { 'results': (result) ? result.rows : null};
        res.render('pages/db', results );
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

module.exports = router;