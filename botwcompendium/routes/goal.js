var db = require('./db').db;

function getGoals(username, cb) {
     console.log("got to get goals");
     let sql = "SELECT GoalID, ItemID, ItemName, TargetAmount, (TargetAmount - Amount) AS Status FROM ((SELECT * From Goal WHERE Username = '"+username+"') NATURAL JOIN (SELECT ItemID, ItemName FROM Item)) LEFT NATURAL JOIN Inventory";
     console.log(sql);
     db.all(sql, [], (err, rows) => {
          rows.forEach(x=>{
               console.log(x);
               if(!x.Status) {
                    x.Status = 0;
               }else if(x.Status < 0) {
                    x.Status = "completed";
               }
          });
          console.log()
          cb(err, rows);
     });
}
module.exports.getGoals = getGoals;

function createGoal(username, item, target, cb) {
     sql = "INSERT INTO Goal(Username, ItemID, TargetAmount) values('"+username+"', "+item+", "+target+")";
     db.run(sql, (err) => {
          cb(err);
     });
}
module.exports.createGoal = createGoal;
