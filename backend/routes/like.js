var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get("/",function(){
    console.log(req.query.pid);
  
    if (req.session.user) {
    
        var sql = "SELECT * FROM likes WHERE uid = ? AND pno = ?";
        con.query(sql,[req.session.uid,req.query.pid],function(error,results){
            if(error) throw error;
            else if(results.length>0){
                var sql = "DELETE FROM likes WHERE uid = ? AND pno = ?";
                con.query(sql,[req.session.user.uid,req.query.pid],function(error,results){
                    if(error) throw error;
                    else{
                        sql = "select uid from likes where pid = ?";
                        con.query(sql,[req.query.pid], function(error,results){
                            if(erorr) throw error;
                            else{
                                res.send(results.length);
                            }
                        })
                    }
                
                });
            }else{
                //좋아요가 아직 없을때
                var sql = "INSERT INTO likes(uid,pno) values(?,?)";
                con.query(sql,[req.session.user.uid,req.query.pid],function(error,results){
                    if(error) throw error;
                    else{
                        sql = "select uid from likes where pid = ?";
                        con.query(sql,[req.query.pid], function(error,results){
                            if(erorr) throw error;
                            else{
                                res.send(results.length);
                            }
                        })
                    }
                });
                
            }
        })

    } else {
        res.send('NO');
    }
})
module.exports = router;
