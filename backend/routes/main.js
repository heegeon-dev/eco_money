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

    console.log('main router!');
    var uid = req.body.uid;
    var todate = req.body.todate;
    var fromdate = req.body.fromdate;


    // 회원의 계좌 조회
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
                if (res_temp.rep_code == 'A0000')
                    trans_list[i] = res_temp;
               
            }

            console.log("trans_list!!!");
            console.log(trans_list);

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

})


module.exports = router;