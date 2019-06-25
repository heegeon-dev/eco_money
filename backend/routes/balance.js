var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db-config.json');                                                                    
var request = require('request');

var con = mysql.createConnection({
  host     : db.host,
  user     :  db.user,
  password : db.password,
  database : db.database
})

// 잔액조회 
router.get("/",function(req,res){

    var email = req.body.email;
    var finNum = req.body.finNum;
    
    var sql = "SELECT userseqnum accessToken FROM user WHERE email = ?";
    con.query(sql,[email], function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        else {
            console.log(result[0].accessToken);
            var option = {
                method : "GET",
                url :'https://testapi.open-platform.or.kr/v1.0/account/balance?fintech_use_num='+finNum+'&tran_dtime=20190523101921',
                headers : {
                    'Authorization' : 'Bearer ' + result[0].accessToken
                }
            };
            request(option, function(err, response, body){
                if(err) throw err;
                else {
                    console.log(body);
                    res.json(JSON.parse(body));
                }
            })
        }
    })
  })
  

module.exports = router;