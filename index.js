const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://tpnnjebckpwvbv:b65c2beaa02277e6b29cb6205283528e455e3c61fe3145f9eb649666634d5de8@ec2-52-71-231-37.compute-1.amazonaws.com:5432/d7b67qvjo3dssf?ssl=true',
  ssl: {
    rejectUnauthorized: false
  }
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
