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

// 토큰 발급
router.get('/', function(req, res){
    var access_token="";
    var refresh_token='';
    var user_seq_num ='';
    var auth_code = req.query.code
    console.log("auth code: " + auth_code);
    var getTokenUrl = "https://testapi.open-platform.or.kr/oauth/2.0/token";
    var option = {
        method : "POST",
        url :getTokenUrl,
        headers : {
        },
        form : {
            code : auth_code,
            client_id : "l7xxcf758b9a4a184f7bb641c63637fcbdff",
            client_secret : "00fded2944e247878cfd63eaf86afab3",
            redirect_uri : "http://localhost:3000/authResult",
            grant_type : "authorization_code"
        }
    };
    request(option, function(err, response, body){
        if(err) throw err;
        else {
            console.log("option body:" + body);
            var accessRequestResult = JSON.parse(body);
            console.log("accessRequestRsult :" + accessRequestResult);
            res.json(accessRequestResult);
            /*
            "access_token":"39c8284b-21d2-4c84-a02c-05fc23afabb4",
            "token_type":"Bearer",
            "expires_in":7776000,
            "refresh_token":"a8594fb4-ab8c-4b2e-bff7-ef81420b76af",
            "scope":"login inquiry transfer",
            "user_seq_no":"1100035088"
            */
        }
    })


})
module.exports = router;