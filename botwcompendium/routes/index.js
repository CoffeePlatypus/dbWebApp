var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  es.sendFile( 'index.html', { root : __dirname + "/../public" } );
});

module.exports = router;
