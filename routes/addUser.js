var express = require('express');
var router = express.Router();

var dbConnect = require('../connections/herokuDB');

router.post('/', async (req, res) => {
    try {
        let uName = req.body.uName;
        let fName = req.body.fName;
        let lName = req.body.lName;
        const client = await dbConnect.connect();
        var sql = "SELECT * FROM users WHERE uname = '" + uName + "';";
        let result = await client.query(sql);
        if(result.rowCount > 0){
            var message = "That user already exists.";
            res.render('pages/register', {message, uName, fName, lName})
        } else{
        var sql = "INSERT INTO users (uname, fname, lname) VALUES ('" + uName + "','" + fName + "','" + lName + "');";
        result = await client.query(sql);
        const success = result.rowCount;
        if(success == 1){
            var message = "User added successfully.";
        } else{
            var message = "Something went wrong.";
        }
        var message = encodeURIComponent(message);
        res.redirect('/?message=' + message);
    }
        client.release();
    } catch (err) {
        console.error(err);
        console.log("Postgres error position:", err.position);
        res.send("Error " + err);
    }
});

module.exports = router;