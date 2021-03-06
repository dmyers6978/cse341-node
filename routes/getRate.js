var express = require('express');
var router = express.Router();

// Needed for post... 
// extended can be true or false...depends on if you need json style data
router.use(express.urlencoded({ extended: true }));

/* Post mail postage page. */

router.post('/', function(req, res){
    // note post uses 'body' while get uses 'query'
    let weight = req.body.weight;
    let mailType = req.body.mailType;
    let rate = calculateRate(weight, mailType);
    res.render('pages/getRate', {weight, mailType, rate})
});

function calculateRate(weight, mailType) {
    let rate = 0.0;
    let weightRate = 0.2;
    switch(mailType) {
        case 'Letters (Stamped)':
            if (weight <= 3){
                rate = 0.55 + Math.floor(weight) * weightRate;
            } else if (weight < 3.5){
                rate = 1.15;
            } else {
                rate = -1;
            }
            break;
        case 'Letters (Metered)':
            if (weight <= 3){
                rate = 0.51 + Math.floor(weight) * weightRate;
            } else if (weight < 3.5){
                rate = 1.11;
            } else {
                rate = -1;
            }
            break;
        case 'Large Envelopes (Flats)':
            if (weight <= 13){
                rate = 1.00 + Math.floor(weight) * weightRate;
            } else {
                rate = -1;
            }
            break;
        case 'First-Class Package Service—Retail':
            if (weight <= 4) {
                rate = 4.00;
            } else if (weight <= 8) {
                rate = 4.80;
            } else if (weight <= 12) {
                rate = 5.50;
            } else if (weight <= 13) {
                rate = 6.25;
            } else {
                rate = -1;
            }
            break;
        default:
            break;
    }

    if (rate == -1){
        rate = "Undefined";
    } else {
        rate = "$" + rate.toFixed(2);
    }
    
    return rate;
}

module.exports = router;