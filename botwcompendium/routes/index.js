var express = require('express');
var router = express.Router();
var item = require('./item');
var users = require('./users');


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

/* POST log in with username and password in req body*/
router.post('/login', function(req, res, next) {
     console.log(req.body);
     users.findByUsername(req.body.Username, function(err,user){
      if(user && user.Password == req.body.Password) {
        delete user.Password;
        res.send( user );
      }else{
        res.send({msg : "Error: invalid user or password"});
      }
    });
});

module.exports = router;
