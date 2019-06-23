var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
    
    if (req.session.user) {
    
        // var uid = req.session.uid;
        // var uid = ''
        // var sql = 'SELECT* FROM user WHERE uid = ?'
        // con.query(sql,[req.session.uid], function (error, results) {
        //   if (error) throw error;  
        //   else {
        //       res.json(results);
        //   }
        // });
    
    }else{
        console.log('로그인 안되어 있음');
        res.redirect('/login.html');
    }
});

module.exports = router;
