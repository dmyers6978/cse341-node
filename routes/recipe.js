var express = require('express');
var router = express.Router();

var dbConnect = require('../connections/herokuDB');
router.get('/', async (req, res) => {
    try {
        let name = req.query.name;
        let desc = req.query.description.replace(/(?:\r\n|\r|\n)/g, '<br>');
        let userId = req.query.userId;
        const client = await dbConnect.connect();
        var sql = "INSERT INTO recipes (recipename, recipedesc, userid) VALUES('" + name + "', '" + desc + "', '" + userId + "') returning \"recipeid\";";
        let result = await client.query(sql);
        if(result.rowCount > 0){
            sql = "INSERT INTO log (recipeid) VALUES ('" + result.rows[0].recipeid + "');";
            await client.query(sql);
            var message = "Recipe added.";
            var message = encodeURIComponent(message);
        res.redirect('/?message=' + message);
        } else{
            var message = "Something went wrong.";
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