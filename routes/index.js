var express = require('express');
var router = express.Router();
var {handleMessage} = require('../controllers/gpg');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { errors: [],message: "" });
});
router.get('/add-keys',function(req,res,next){
  res.render("add-keys")
})

router.post('/',handleMessage)

module.exports = router;
