var db = require('./db').db;

function getCreatures(query, cb) {
     let sql = "SELECT * FROM Creature";
     console.log(sql);
     db.all(sql, [], (err, rows) =>{
          cb(err, rows);
     });
}
module.exports.getCreatures = getCreatures;

function getCreature(id, cb) {
     let sql = "SELECT CreatureID, CreatureName, CreatureDescription, ItemName, LocationName FROM Creature LEFT NATURAL JOIN CreatureLocation LEFT NATURAL JOIN (SELECT ItemName, CreatureID FROM Item NATURAL JOIN CreatureDrops WHERE CreatureID = "+id+") WHERE CreatureID = "+id;
     console.log(sql);
     db.all(sql, [], (err, rows) =>{
          var creature = {};
          creature.CreatureID = rows[0].CreatureID;
          creature.CreatureName = rows[0].CreatureName;
          creature.CreatureDescription = rows[0].CreatureDescription;
          var loc = [];
          if(rows[0].LocationName) {
               rows.forEach(x=>{
                    if(!loc.includes(x.LocationName)) {
                         loc.push(x.LocationName);
                    }
               });
          }
          creature.Locations = loc;
          var items = [];
          if(rows[0].ItemName) {
               rows.forEach(x=>{
                    if(!items.includes(x.ItemName)) {
                         items.push(x.ItemName);
                    }
               });
          }
          creature.Drops = items;
          console.log(creature);
          cb(err, creature);
     });
}
module.exports.getCreature = getCreature;
