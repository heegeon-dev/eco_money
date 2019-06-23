var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/',function(req,res,next){
    if (req.session.user) {

        var sql = 'INSERT INTO post(UID,CONTENTS) VALUES(?,?)';

        con.query(sql,[req.session.uid,req.body.contents],function(error,results){
            if(error) throw error;
            else{
                res.send('Posting!');
            }
        })

    } else {
        console.log('로그인 안되어 있음');
        res.redirect('/login.html');
    }
})

module.exports = router;
