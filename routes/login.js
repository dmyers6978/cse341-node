var express = require('express');
var router = express.Router();

var dbConnect = require('../connections/herokuDB');

router.post('/', async (req, res) => {
    try {
        let uName = req.body.uName;
        const client = await dbConnect.connect();
        var sql = "SELECT * FROM users WHERE uname = '" + uName + "';";
        let result = await client.query(sql);
        if(result.rowCount > 0){
            res.cookie("loggedin", "true");
            res.cookie("userData", result.rows[0]);
            var message = "Welcome back " + result.rows[0].fname + " " + result.rows[0].lname + ".";
            message = encodeURIComponent(message);
            res.redirect('/?message=' + message);
            
        } else{
        var message = "Nobody by that username exists. Try again.";
        res.render('pages/login', {message})
    }
        client.release();
    } catch (err) {
        console.error(err);
        console.log("Postgres error position:", err.position);
        res.send("Error " + err);
    }
});

module.exports = router;