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
router.post('/', function(req, res, next) {

    if (req.session.user) {
    
        console.log(req.body.pid,req.body.contents);
        
        var sql = "INSERT INTO reply(pid,contents,uid) VALUES(?,?,?) ";
        con.query(sql, [req.body.pid,req.body.contents,req.session.user.uid], function (error, results) {
            if (error) throw error;
            else{
                sql = "select * from reply where pid= ?";
                con.query(sql,[req.body.pid],function(error,results){
                    if(error) throw error;
                    else{
                        console.log(results);
                        res.json(
                            {
                                "count":results.length,
                                "replys":results
                            }
                        );
                    }
                });
            }
        });

    } else {
        res.send('NO');
    }

});

module.exports = router;
