var express = require('express');
var router = express.Router();
var {handleMessage,addKey} = require('../controllers/gpg');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { errors: [],message: "" });
});

router.get('/add-key',function(req,res,next){
  res.render("add-keys")
})

router.post('/add-key',addKey)

router.post('/',handleMessage)

module.exports = router;
