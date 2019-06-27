var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db-config.json');
var request = require('request');
var sync_request = require('sync-request');

var con = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
})
// 사용자 계좌 조회
router.post('/', function (req, response) {
    // console.log("main 시작 !");
    // console.log(req.session);
    // if(req.session.user){
    // var uid = req.session.user.uid;
    console.log(req.body);
    var uid = req.body.uid;
    var accessToken;
    var today = new Date();
    var tod = today.getDate();
    var tom = today.getMonth() + 1; //January is 0!
    var toy = today.getFullYear();

    if (tod < 10) {
        tod = '0' + tod
    }
    if (tom < 10) {
        tom = '0' + tom
    }
    var todate = toy + tom + tod;

    var fromd = today.getDate();
    var fromm = today.getDate();
    var fromy = today.getDate();

    if (fromd < 10) {
        fromd = '0' + fromd;
    }
    if (fromm < 10) {
        fromm = '0' + fromm;
    }
    var fromdate = fromy + fromm + fromd;

    var sql = 'SELECT * FROM user WHERE uid = ?';
    con.query(sql, [uid], function (err, result) {

        if (err) {
            console.error(err);
            throw err;
        }
        else {
            console.log(result);
            var accessToken = result[0].accessToken;
            var option = {

                method: "GET",
                url: 'https://testapi.open-platform.or.kr/user/me?user_seq_no=' + result[0].userseqnum,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            };
            var wait = 0;
            request(option, function (err, res, body) {
                if (err) {
                    throw err;
                }
                else {
                    var accessRequestResult = JSON.parse(body);
                    console.log(accessRequestResult);
                    console.log("여기까진 정상");
                    // 모든 계좌의 모든 거래내역 불러오기
                    var trans_list = new Array();
                    console.log("계좌 수:" + accessRequestResult.res_cnt);
                    for (var i = 0; i < accessRequestResult.res_cnt; i++) {
                        option = {
                            // method : "GET",
                            // url :'https://testapi.open-platform.or.kr/v1.0/account/transaction_list?'+
                            // 'fintech_use_num='+ accessRequestResult.res_list[i].fintech_use_num +'&'+
                            // 'inquiry_type=A&'+
                            // 'from_date=' +fromdate+'&'+
                            // 'to_date='+todate+'&'+
                            // 'sort_order=D&'+
                            // 'page_index=1&'+
                            // 'tran_dtime=20160101121212&',
                            headers: {
                                'Authorization': 'Bearer ' + accessToken
                            },

                            qs: 'fintech_use_num=' + accessRequestResult.res_list[i].fintech_use_num + '&' +
                                'inquiry_type=A&' +
                                'from_date=' + fromdate + '&' +
                                'to_date=' + todate + '&' +
                                'sort_order=D&' +
                                'page_index=1&' +
                                'tran_dtime=20160101121212&'

                        }
                        var res = sync_request('GET', 'https://testapi.open-platform.or.kr/v1.0/account/transaction_list', option);
                        var res_temp = JSON.parse(res.getBody('utf8'));
                        if(res_temp.rep_code =='A0000')
                            trans_list[i] = res_temp;
                        // request(option, function(err, response, body){
                        //     if(err) throw err;
                        //     else {
                        //         console.log(wait);
                        //         console.log("여기가 어디 ?");
                        //         console.log(body);
                        //         var accessRequestResult = JSON.parse(body);
                        //         console.log(accessRequestResult);
                        //         tran_list[i] = accessRequestResult;
                        //     }
                        // });
                    }

                    console.log("trans_list!!!");
                    console.log(trans_list);
                    // while(wait < Object.keys(accessRequestResult.res_list).length){
                    //     console.log(wait);
                    // }
                    //거래내역을 범주화 하기
                    // 총 입금액 및 출금액 구하기
                    var total_income = 0;
                    var total_spending = 0;
                    var income_keyword = ["월급", "임대료"];
                    var income_amt = new Array();
                    for (var i = 0; i < income_keyword.length; i++)
                        income_amt[i] = 0;

                    var spending_keyword = ["보험", "공과금", "대출", "통신", "기타"];
                    var spending_amt = new Array();
                    for (var i = 0; i < spending_keyword.length; i++)
                        spending_amt[i] = 0;


                    for (var i = 0; i < trans_list.length; i++) {
                        for (var j = 0; j < trans_list[i].res_list.length; j++) {
                            if (trans_list[i].res_list.inout_type == "입금") {
                                total_income += trans_list[i].res_list.tran_amt;

                                for (var k = 0; k < income_keyword.length; k++) {
                                    if (trans_list[i].res_list.print_content.indexOf(income_keyword[k]))
                                        income_amt[k] += trans_list[i].res_list.tran_amt;
                                    else if (spending_keyword[k] == "기타") {
                                        spending_amt[k] += trans_list[i].res_list.tran_amt;
                                    }
                                }
                            }
                            else if (trans_list[i].res_list.inout_type == "출금") {
                                total_spending += trans_list[i].res_list.tran_amt;

                                for (var k = 0; k < spending_keyword.length; k++) {
                                    if (trans_list[i].res_list.print_content.indexOf(spending_keyword[k]))
                                        spending_amt[k] += trans_list[i].res_list.tran_amt;
                                    else if (spending_keyword[k] == "기타") {
                                        spending_amt[k] += trans_list[i].res_list.tran_amt;
                                    }
                                }
                            }
                        }
                    }

                    // for(var i = 0 ; i < income_keyword.length; i++)
                    //     income_per[i] = (income_amt[i]/total_income) *100;

                    // for(var i = 0 ; i < spending_keyword.length; i++)
                    //     spending_per[i] = (spending_amt[i]/total_spending) * 100;    
                    response.json(
                        {
                            "income": {
                                "total_income": total_income,
                                "income_keyword": income_keyword,
                                "income_amt": income_amt
                            },
                            "spending": {
                                "total_spending": total_spending,
                                "spending_keyword": spending_keyword,
                                "spending_amt": spending_amt
                            }
                        }
                    );


                }
            })

        }






    })
    // }else{
    //     response.send("no");
    // }
})

module.exports = router;