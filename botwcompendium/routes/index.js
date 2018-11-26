var express = require('express');
var router = express.Router();
var item = require('./item');
var users = require('./users');
var inventory = require('./inventory');
var goal = require('./goal');
var creature = require('./creature');

function sender(res, err, rows) {
     console.log("sendin");
     if(err) {
          console.log(err);
          res.status( 500 ).send( { 'msg' : err } );
     }
     res.send(rows);
}

/* GET home page. */
router.get('/', function(req, res, next) {
     res.sendFile( 'index.html', { root : __dirname + "/../public" } );
});

/* GET items */
router.get('/items', function(req, res, next) {
     query = ""
     if(req.query.query) {
          console.log("body!!");
          query = JSON.parse(req.query.query);
          console.log(query);
     }
     item.findItems(query, (err, rows)=>{sender(res, err, rows)});
});

router.get('/creatures', function(req,res,next){
     creature.getCreatures("",(err, rows)=>{sender(res,err,rows)});
});

router.get('/creatures/:creatureID', function(req,res,next){
     creature.getCreature(req.params.creatureID, (err, creature)=>{sender(res,err,creature)});
});

/* GET item by id in path*/
router.get('/items/:itemID', function(req, res, next) {
     item.findItemByID(req.params.itemID, (err, item)=>{sender(res, err, item)});
});

/* GET inventory*/
router.get('/inventory/:userID', function(req, res, next){
     inventory.getInventory(req.params.userID, "", (err, rows)=>{sender(res,err,rows)});
});

/* POST add items to inventory*/
router.post('/inventory/:userID/:itemID', function(req, res, next){
     inventory.addInventory(req.params.userID, req.params.itemID, req.body.amount, function(err){
          if(err) {
               console.log(err);
               res.status( 500 ).send( { 'msg' : 'Error adding item to inventory'} );
          }
          res.status(200).send({'msg' : "added Items"});
     });
});

router.get('/goals/:userID', function(req, res,next) {
     console.log("getting goals");
     console.log(req.params.userID);
     goal.getGoals(req.params.userID, (err, rows)=>{sender(res,err,rows)});
});

/* POST create goal */
router.post('/goals/:userID/:itemID', function(req, res, next){
     console.log("creating goal");
     goal.createGoal(req.params.userID, req.params.itemID,req.body.amount, (err)=>{
          if(err) {
               console.log(err);
               res.status( 500 ).send( { 'msg' : 'Error adding item to inventory'} );
          }
          res.status(200).send({'msg' : "created goal"});
     });
});

/* POST log in with username and password in req body*/
router.post('/login', function(req, res, next) {
     users.findByUsername(req.body.Username, function(err,user){
          // console.log(user);
          if(user && user.Password == req.body.Password) {
               delete user.Password;
               res.send( user );
          }else{
               res.send({msg : "Error: invalid user or password"});
          }
    });
});

module.exports = router;
