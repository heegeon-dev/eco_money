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
        var userseqnum = req.body.userseqnum;
        var accessToken = req.body.accessToken;
        var refreshToken = req.body.refreshToken;

        var sql = 'INSERT INTO user (email, password, nickname, userseqnum, accessToken, refreshToken) VALUES (?,?,?,?,?,?);';
        con.query(sql,[email, password, nickname, userseqnum, accessToken, refreshToken], function (error, results) {

          if (error) throw error;  
          else {
              console.log(this.sql);
              res.send('my key!');
          }
        });
      });

module.exports = router;
