var express = require('express');
var router = express.Router();

var dbConnect = require('../connections/herokuDB');
var sql = 'SELECT *, to_char(datetime, \'Mon DD, YYYY HH:MI AM\') AS datetime FROM log JOIN recipes USING(recipeid) JOIN users USING(userid) ORDER BY log.datetime DESC LIMIT 10';

router.get('/', async (req, res) => {
    try {
        if(typeof req.cookies.loggedin == 'undefined'){
            res.redirect('/login');
        }
        const message = req.query.message;
        const client = await dbConnect.connect();
        const result = await client.query(sql);
        const results = {'userData': (req.cookies.userData), 'loggedin': (req.cookies.loggedin), 'message': message, 'results': (result) ? result.rows : null};
        res.render('pages/index', results );
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

module.exports = router;