var express = require('express');
var router = express.Router();
var item = require('./item')


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
          console.log(items);
          res.send(items);
     });
});

module.exports = router;
