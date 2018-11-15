var db = require('./db').db;
const sqlite3 = require('sqlite3').verbose();

function getInventory(userID, query, cb) {
     let sql = "SELECT ItemID, ItemName, ItemClass, SellPrice, Amount FROM Item NATURAL JOIN (SELECT ItemID, Amount FROM Inventory WHERE Username = '"+userID+"')";
     db.all(sql, [], (err, rows) =>{
          // console.log(rows);
          cb(err, rows);
     });
}
module.exports.getInventory = getInventory;

function addInventory(userID, itemID, amount, cb) {
     let sql = "SELECT InventoryID, Amount FROM Inventory WHERE Username = '"+userID+"' AND ItemID = "+itemID;
     console.log(sql);
     db.all(sql, [], (err, rows) =>{
          console.log(rows);
          if(rows) {
               row = rows[0];
               console.log(row);
               amount = Number(amount) + Number(row.Amount);
               console.log(amount);
               sql = "UPDATE Inventory SET Amount = "+amount+" WHERE InventoryID = " + row.InventoryID;
               console.log(sql);
          }else{
               sql = "INSERT INTO Inventory(Username, ItemID, Amount) values('"+userID+"', "+itemID+", "+amount+");";
          }
          db.run(sql);
     });
}
module.exports.addInventory = addInventory
