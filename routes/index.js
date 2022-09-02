var express = require('express');
var router = express.Router();
var {handleMessage,addKey, getRecipients} = require('../controllers/gpg');

/* GET home page. */
router.get('/',getRecipients);

router.get('/add-key',function(req,res,next){
  res.render("add-keys")
})

router.post('/add-key',addKey)

router.post('/',handleMessage)

module.exports = router;
