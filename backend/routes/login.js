var express = require('express');
var router = express.Router();

router.post("/", function (req, res, next) {
    let body = req.body;
    
    if (req.session.user) {
      console.log('already login!');
    // TODO 이미 로그인 되어 있을 경우          
    
    } else {
      // 로그인이 되어 있지 않을 경우 (로그인동작)
      var userEmail = req.body.email;
      var userPassword = req.body.password;
      console.log(userEmail, userPassword);
    
      var sql = "SELECT * FROM user WHERE email = ?";
      con.query(sql, [userEmail], function (error, results) {
        if (error) throw error;  
        else {
    
          if(userPassword == results[0].user_password){
            req.session.user =
            {
                uid : results[0].uid,
                nickname : results[0].nickname,
                email: userEmail,
            };
            res.send('login!');
          }else {
              res.json('등록정보가 없습니다');
          }
        }
      });
    }
    });


    module.exports = router;