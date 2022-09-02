var express = require('express');
var router = express.Router();
var {handleMessage} = require('../controllers/gpg');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { message: "" });
});

router.get('/hello', function(req,res,next){
  res.send("HELLO")
})
router.post('/',handleMessage)

module.exports = router;
