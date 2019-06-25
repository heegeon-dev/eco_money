var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db-config.json');                                                                    
var request = require('request');

var con = mysql.createConnection({
  host     : db.host,
  user     : db.user,
  password : db.password,
  database : db.database
})
// 사용자 계좌 조회
router.get('/', function(req, res){
  
    var uid = req.session.user.uid;
    var result_finnum;
    var accessToken;
    var userinfo;
    var today = new Date();
    var tod = today.getDate();
    var tom = today.getMonth()+1; //January is 0!
    var toy = today.getFullYear();
    
    if(tod<10) {
        tod='0'+tod
    } 
    if(tom<10) {
        tom='0'+tom
    }
    var todate = toy+tom+tod;
   
    var fromd = today.getDate();
    var fromm = today.getDate();
    var fromy = today.getDate();

    if(fromd<10) {
        fromd='0'+fromd;
    } 
    if(fromm<10) {
        fromm='0'+fromm;
    }
    var fromdate = fromy + fromm + fromd;

    var sql = 'SELECT * FROM user WHERE uid = ?';
    con.query(sql,[uid], function(err, result){
        
      if(err){
            console.error(err);
            throw err;
        }
        else {
            console.log(result);
            userinfo = result;
            accessToken = result[0].accessToken;
            var option = {
        
                method : "GET",
                url :'https://testapi.open-platform.or.kr/user/me?user_seq_no='+result[0].userseqnum,
                headers : {
                    'Authorization' : 'Bearer ' + accessToken
                }
            };
            result_finnum = option;
            console.log(result_finnum);

            // request(option, function(err, response, body){
            //     if(err) throw err;
            //     else {
            //         console.log(body);
            //         var accessRequestResult = JSON.parse(body);
            //         console.log(accessRequestResult);
                
            //     }
            // })
   
        }

        // 모든 계좌의 모든 거래내역 불러오기
        var tran_list = new array;
        for(var i = 0 ; i < result_finnum.res.list.length ; i++){
            tran_list[i] = {
                method : "GET",
                url :'https://testapi.open-platform.or.kr/v1.0/account/transaction_list?'+
                'fintech_use_num='+ result_finnum.res.list[i].fintech_use_num +'&'+
                'inquiry_type=A&'+
                'from_date=' +fromdate+'&'+
                'to_date='+todate+'&'+
                'sort_order=D&'+
                'page_index=1&'+
                'tran_dtime=20160101121212&',
                headers : {
                    'Authorization' : 'Bearer ' + accessToken
                }

            }
        }

    
    //거래내역을 범주화 하기
        // 총 입금액 및 출금액 구하기
        var total_income=0;
        var total_spending=0;
        var income_keyword = ["월급","임대료"];
        var income_amt = new array;
        var income_per = new array;
        for(var i = 0 ; i < income_keyword.length ; i++)
            income_amt[i]=0;
        
        var spending_keyword = ["보험","공과금","대출","통신","개인지출","교통비"]; 
        var spending_amt = new array;
        var spending_per = new array;
        for(var i = 0 ; i < spending_keyword.length ; i++)
            spending_amt[i]=0;


        for( var i = 0 ; i < tran_list.length ; i++){
            for( var j = 0 ; j < trans_list[i].res_list.length ; j++){
                if(trans_list[i].res_list.inout_type == "입금"){
                    total_income+=trans_list[i].res_list.tran_amt;
                    
                    for(var k = 0 ; k < income_keyword.length ; k++){
                        if(trans_list[i].res_list.print_content.indexOf(income_keyword[k]))
                            income_amt[k] += trans_list[i].res_list.tran_amt;
                    }
                }
                else if(trans_list[i].res_list.inout_type == "출금" ){
                    total_spending+=trans_list[i].res_list.tran_amt;

                    for(var k = 0 ; k < spending_keyword.length ; k++){
                        if(trans_list[i].res_list.print_content.indexOf(spending_keyword[k]))
                            spending_amt[k] += trans_list[i].res_list.tran_amt;
                    }
                }
            }
        }

        // for(var i = 0 ; i < income_keyword.length; i++)
        //     income_per[i] = (income_amt[i]/total_income) *100;
        
        // for(var i = 0 ; i < spending_keyword.length; i++)
        //     spending_per[i] = (spending_amt[i]/total_spending) * 100;

        
        
        res.json(
            {
                "nickname" : userinfo[0].nickname,
                "hashtag" : userinfo[0].hashtag.split('#'),
                "phashtag" : userinfo[0].phashtag.split('#'),
                "goal" : userinfo[0].goal,
                "income": {
                    "total_income" :total_income,
                    "income_keyword" : income_keyword,
                    "income_amt" : income_amt
                },
                "spending" : {
                    "total_spending" :total_spending,
                    "spending_keyword" : spending_keyword,
                    "spending_amt" : spending_amt
                }
            }
        );



    })
   
})
  
  module.exports = router;