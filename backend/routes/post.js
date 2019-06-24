var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db-config.json');                                                                    



var con = mysql.createConnection({
  host     : db.host,
  user     :  db.user,
  password : db.password,
  database : db.database
})
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
        res.send('NO');
    }
})

module.exports = router;
