var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.clearCookie("userData");
        res.clearCookie("loggedin");
        res.redirect('/');
    } catch (err) {
        console.error(err);
        console.log("Postgres error position:", err.position);
        res.send("Error " + err);
    }
});

module.exports = router;