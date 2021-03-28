var express = require('express');
var router = express.Router();

var dbConnect = require('../connections/herokuDB');
router.get('/', async (req, res) => {
    try {
        let recipeId = req.query.recipeId;
        const client = await dbConnect.connect();
        var sql = "SELECT * FROM recipes WHERE recipeid = " + recipeId + ";";
            let result = await client.query(sql);
            const results = {'results': (result) ? result.rows : null};
            res.render('pages/details', results );
            client.release();
    } catch (err) {
        console.error(err);
        console.log("Postgres error position:", err.position);
        res.send("Error " + err);
    }
});
module.exports = router;