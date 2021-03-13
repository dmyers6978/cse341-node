process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://vetulyqhkgwrjl:e5bf556bca465ce8a8358b1812122207e2498fc4cee9e7be5025a8b7b25c8a70@ec2-54-159-175-113.compute-1.amazonaws.com:5432/d7bc9a3a4e8sqn?ssl=true',
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;