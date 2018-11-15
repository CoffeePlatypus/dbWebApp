var express = require('express');
var router = express.Router();
var db = require('./db').db;
const sqlite3 = require('sqlite3').verbose();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

function findByUsername(username, cb) {
     let sql = "SELECT * FROM User WHERE Username='"+username+"' LIMIT 1";
     db.all(sql, [], (err, rows) => {
          cb(err, rows[0]);
     });
}
module.exports.findByUsername = findByUsername;
