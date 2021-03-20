const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var bodyParser = require('body-parser')
const CookieParser = require('cookie-parser');

var mainRouter = require('./routes/main');
var addUser = require('./routes/addUser');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(CookieParser())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', mainRouter)
  .get('/register', (req, res) => {res.render('pages/register')})
  .get('/login', (req, res) => {res.render('pages/login')})
  .use('/addUser', addUser)
  .use('/loginReq', loginRouter)
  .use('/logout', logoutRouter)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))