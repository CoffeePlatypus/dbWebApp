var express = require('express');
var router = express.Router();
var item = require('./item');
var users = require('./users');
var inventory = require('./inventory');


/* GET home page. */
router.get('/', function(req, res, next) {
     res.sendFile( 'index.html', { root : __dirname + "/../public" } );
});

/* GET items */
router.get('/items', function(req, res, next) {
     console.log("getting items");
     item.findItems("", function(err, items){
          if(err) {
               console.log(err);
               res.status( 500 ).send( { 'msg' : 'Error retriving items' } );
          }
          res.send(items);
     });
});

/* GET item by id in path*/
router.get('/items/:itemID', function(req, res, next) {
     console.log("getting item" + req.params.itemID);
     item.findItemByID(req.params.itemID, function(err, item) {
          if(err) {
               console.log(err);
               res.status( 500 ).send( { 'msg' : 'Error retriving item'} );
          }
          res.send(item);
     });
});

/* GET inventory*/
router.get('/inventory/:userID', function(req, res, next){
     inventory.getInventory(req.params.userID, "", function(err, rows){
          if(err) {
               console.log(err);
               res.status( 500 ).send( { 'msg' : 'Error retriving item'} );
          }
          res.send(rows);
     });
});

/* POST add items to inventory*/
router.post('/inventory/:userID/:itemID', function(req, res, next){
     console.log(req.body.amount);
     inventory.addInventory(req.params.userID, req.params.itemID, req.body.amount, function(err, rows){
          if(err) {
               console.log(err);
               res.status( 500 ).send( { 'msg' : 'Error adding item to inventory'} );
          }
          res.status(200);
     });
});

/* POST create goal */
router.post('/goals/:username/:itemID', function(req, res, next){
     console.log("creating goal");

});

/* POST log in with username and password in req body*/
router.post('/login', function(req, res, next) {
     console.log(req.body);
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
