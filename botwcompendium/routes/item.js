var db = require('./db').db;
const sqlite3 = require('sqlite3').verbose();

function processQuery(queryObj) {
     console.log("query obj: "+queryObj);
     if(queryObj.ItemName || queryObj.ItemClass || queryObj.SellPrice || queryObj.ItemEffect || queryObj.hp || queryObj.DyeColor) {
          query = " WHERE ";
          count = countProps(queryObj) - 1;
          console.log("And count "+count);
          if (queryObj.ItemName ) query += "ItemName LIKE '%" + queryObj.ItemName+"%'" + (count-- > 0 ? " AND " : "");
          if (queryObj.ItemClass ) query += "ItemClass LIKE '%" + queryObj.ItemClass+"%'" + (count-- > 0 ? " AND " : "");
          if (queryObj.SellPrice ) query += "SellPrice LIKE '%" + queryObj.SellPrice+"%'" + (count-- > 0 ? " AND " : "");
          if (queryObj.ItemEffect ) query += "ItemEffect LIKE '%" + queryObj.ItemEffect+"%'" + (count-- > 0 ? " AND " : "");
          if (queryObj.DyeColor ) query += "DyeColor LIKE '%" + queryObj.DyeColor+"%'" + (count-- > 0 ? " AND " : "");
          if (queryObj.hp ) query += "hp LIKE '%" + queryObj.hp+"%'";
          return query;
     }else{
          return "";
     }
}

function countProps(query) {
     count = 0;
     for (var prop in query) {
          console.log(query[prop]);
          if(query[prop]) {
               count++;
          }
     }
     return count;
}

function findItems(query, cb) {
     let sql = `SELECT ItemID, ItemName, ItemClass, hp, ItemEffect, SellPrice, DyeColor FROM Item`;
     if(query) {
          query = processQuery(query);
          // console.log(query)
          sql += query;
     }
     console.log(sql);
     db.all(sql, [], (err, rows) => {
          cb(err, rows);
     });
}
module.exports.findItems = findItems;

function findItemByID(itemID, cb) {
     let sql = 'SELECT * FROM Item JOIN (SELECT CreatureName FROM CreatureDrops NATURAL JOIN Creature WHERE ItemID = '+itemID+') WHERE ItemID = '+itemID;
     db.all(sql, [], (err, rows) => {
          cb(err, rows);
     });
}

module.exports.findItemByID = findItemByID;
