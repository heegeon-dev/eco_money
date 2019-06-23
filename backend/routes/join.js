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
        var email = req.body.email;
        var password = req.body.password;
        var nickname = req.body.nickname;
        console.log(nickname, email, password);
        var sql = 'INSERT INTO `fintech`.`user` (email, nickname,password ) VALUES (?,?,?);'
        con.query(sql,[email, nickname, password ], function (error, results) {
          if (error) throw error;  
          else {
              console.log(this.sql);
              res.send('Join!');
          }
        });
      });

module.exports = router;
