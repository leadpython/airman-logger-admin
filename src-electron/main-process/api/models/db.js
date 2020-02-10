const pgp = require('pg-promise')()
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'airman_logger',
  user: 'postgres',
  password: '22hz5az7k909t7m'
})
module.exports = db;