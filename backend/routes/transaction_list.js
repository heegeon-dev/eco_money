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

// 거래내역조회
router.post('/', function(req,res){
    var userEmail = req.decoded.email;
    var finNum = req.body.finNum;
    var sql = "SELECT userseqnum, accessToken FROM user WHERE email = ?";
    connection.query(sql,[userEmail], function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        else {
            console.log(result[0].accessToken);
            var option = {
                method : "GET",
                url :'https://testapi.open-platform.or.kr/v1.0/account/transaction_list?'+
                'fintech_use_num='+finNum+'&'+
                'inquiry_type=A&'+
                'from_date=20160101&'+
                'to_date=20160101&'+
                'sort_order=D&'+
                'page_index=1&'+
                'tran_dtime=20160101121212&',
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