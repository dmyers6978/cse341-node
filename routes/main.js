var express = require('express');
var router = express.Router();

var dbConnect = require('../connections/herokuDB');
var sql = 'SELECT * FROM log JOIN recipes USING(recipeid) JOIN users USING(userid)';

/* GET home page. */
router.get('/', async (req, res) => {
    try {
        const message = res.get('message');
        const client = await dbConnect.connect();
        const result = await client.query(sql);
        const results = {'results': (result) ? result.rows : null};
        res.render('pages/index', results );
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

module.exports = router;