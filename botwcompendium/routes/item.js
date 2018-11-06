var db = require('./db').db;
const sqlite3 = require('sqlite3').verbose();

function findItems(query, cb) {
     console.log(db);
     console.log("items: "+ query);
     let sql = `SELECT * FROM Item`;
     db.all(sql, [], (err, rows) => {
          console.log("db callback");
          cb(err, rows);

          // if (err) {
          //      console.log("error");
          //      console.log(err);
          //      throw err;
          // }
          // rows.forEach((row) => {
          //      console.log(row);
          // });
          // console.log(rows);

     });
     console.log("djfdo");
}

module.exports.findItems = findItems;
