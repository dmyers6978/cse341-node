process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://tpnnjebckpwvbv:b65c2beaa02277e6b29cb6205283528e455e3c61fe3145f9eb649666634d5de8@ec2-52-71-231-37.compute-1.amazonaws.com:5432/d7b67qvjo3dssf?ssl=true',
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;