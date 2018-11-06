const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('C:\\sqlite\\Compendium.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the Compendium database.');
});

// let sql = `SELECT * FROM Item`;
// db.all(sql, [], (err, rows) => {
//      console.log("db callback");
//
//
//      // if (err) {
//      //      console.log("error");
//      //      console.log(err);
//      //      throw err;
//      // }
//      rows.forEach((row) => {
//           console.log(row);
//      });
//      // console.log(rows);
//
// });

// module.exports = { collection : (name) => db.collection(name) }
module.exports.db = db;

// function close() {
//      db.close((err) => {
//        if (err) {
//          return console.error(err.message);
//        }
//        console.log('Close the database connection.');
//      });
// }
//
// module.exports.close = close;
