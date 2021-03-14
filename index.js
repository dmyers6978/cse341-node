const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var bodyParser = require('body-parser')

var mainRouter = require('./routes/main');
var addUser = require('./routes/addUser');
var dbRouter = require('./routes/db');
var personRouter = require('./routes/getPerson');
var getRateRouter = require('./routes/getRate');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: true }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', mainRouter)
  .get('/register', (req, res) => {res.render('pages/register')})
  .use('/addUser', addUser)
  .use('/getPerson', personRouter)
  .use('/postalrate', getRateRouter)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))