var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.user) {
    
    

  }else{
      res.send('NO');
  }
});

module.exports = router;
