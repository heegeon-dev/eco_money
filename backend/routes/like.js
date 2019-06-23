var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get("/",function(){
    console.log(req.query.dest);
  
    if (req.session.user) {
    
        var sql = "SELECT * FROM likes WHERE uid = ? AND pno = ?";
        con.query(sql,[req.session.uid,req.query.dest],function(error,results){
            if(error) throw error;
            else if(result){
                //좋아요가 이미 있을때
            }else{
                //좋아요가 아직 없을때
                var sql = "INSERT INTO likes(uid,pno) values(?,?)";
                con.query(sql,[req.session.uid,req.query.dest],function(error,results){
                    if(error) throw error;
                    else{
                        res.send('Like!');
                    }
                });
                
            }
        })

    } else {
        console.log('로그인 안되어 있음');
        res.redirect('/login.html');
    }
})
module.exports = router;
