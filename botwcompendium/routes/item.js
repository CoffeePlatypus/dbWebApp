var db = require('./db').db;
const sqlite3 = require('sqlite3').verbose();

// if (err) {
//      console.log("error");
//      console.log(err);
//      throw err;
// }
// rows.forEach((row) => {
//      console.log(row);
// });
// console.log(rows);

function findItems(query, cb) {
     console.log("items: "+ query);
     // let sql = `SELECT * FROM Item`;
     let sql = `SELECT ItemID, ItemName, ItemClass, hp, ItemEffect, SellPrice, DyeColor FROM Item`;
     db.all(sql, [], (err, rows) => {
          cb(err, rows);
     });
}

module.exports.findItems = findItems;

function findItemByID(itemID, cb) {
     console.log(itemID);
     let sql = `SELECT * FROM Item WHERE ItemID =`+itemID+" LIMIT 1";
     db.all(sql, [], (err, rows) => {
          cb(err, rows[0]);
     });
}

module.exports.findItemByID = findItemByID;
