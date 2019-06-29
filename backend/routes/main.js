var express = require('express');
var router = express.Router();
var db = require('../db-config.json');
var request = require('request');
var mysql = require('mysql');
var con = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
})

// 사용자 계좌 조회
router.post('/', function (req, response) {

    console.log('main router!');
    console.log(req.body);
    var uid = req.body.params.uid;
    var todate = req.body.params.todate;
    var fromdate = req.body.params.fromdate;


    // 회원의 계좌 조회
    var option = {
        method: "POST",
        url: 'https://dev-openapi.kbstar.com:8443/hackathon/getAccountAll',
        headers: {
            'Content-Type': 'application/json',
            'hskey': 'Zb7SYa3g087W8KhyKEr0Q/nlZ9rkK5T4ObQUs2fu8X8=',
            'apikey': 'l7xxd3d3817c16c24fa1a64ea99085bab7c5',

        }, body: JSON.stringify({ "dataHeader": { "udId": "단말기고유ID(UDID)", "subChannel": "채널구분(앱구분용)", "deviceModel": "단말기모델명", "deviceOs": "단말기OS명", "carrier": "캐리어명", "connectionType": "연결정보", "appName": "앱이름", "appVersion": "앱버전", "scrNo": "화면번호", "scrName": "화면명" }, "dataBody": { "계좌번호": "1234567890", "상품계약회차": "", "조회시작년월일": "20160101", "조회종료년월일": "20161231", "다음조회시작년월일": "", "다음거래일련번호": "2" } })
    };

    request(option, function (err, res, body) {
        if (err) {
            throw err;
        }
        else {
            console.log(" 응답 ");
            console.log(body);

            // 모든 계좌의 모든 거래내역 불러오기
            var trans_list = new Array();
            var sql = "SELECT * FROM ACCOUNT WHERE UID = ?";
            con.query(sql, [uid], function (error, result) {
                if (error) throw error;
                else {
                    console.log("거래내역조회");
                    console.log(result);
                    sql = "select d.*, u.uid " +
                        "from user u, deal d, account a " +
                        "where u.uid = a.uid and " +
                        "a.account_no = d.account_no and " +
                        "u.uid = ? and " +
                        "d.tran_date <= ? and " +
                        "d.tran_date >= ?"
                        "order by d.tran_date desc; ";
                    con.query(sql, [uid,todate,fromdate], function (error, result) {
                        if (error) throw error
                        else {

                            console.log("trans_list!!!");
                            console.log(result);

                            var total_income = 0;
                            var income_keyword = new Array();
                            var income_amt = new Array();

                            var total_spending = 0;
                            var spending_keyword = new Array();
                            var spending_amt = new Array();
                            console.log(result.length);
                            for (var i = 0; i < result.length; i++) {
                                if (result[i].inout_type == "입금") {
                                    total_income += result[i].tran_amt;
                                    var index = 0;
                                    while (index < income_keyword.length) {
                                        if (income_keyword[index] == result[i].tran_type) {
                                            income_amt[index] += result[i].tran_amt;
                                            break;
                                        }
                                        index++;
                                    }
                                    if (index == income_keyword.length) {
                                        income_keyword[index] = result[i].tran_type;
                                        income_amt[index] = result[i].tran_amt;
                                    }

                                }
                                else if (result[i].inout_type == "출금") {
                                    total_spending += result[i].tran_amt;
                                    var index = 0;
                                    while (index < spending_keyword.length) {
                                        if (spending_keyword[index] == result[i].tran_type) {
                                            spending_amt[index] += result[i].tran_amt;
                                            break;
                                        }
                                        index++;
                                    }
                                    if (index == spending_keyword.length) {
                                        spending_keyword[index] = result[i].tran_type;
                                        spending_amt[index] = result[i].tran_amt;
                                    }
                                }

                            }
                            for (var a = 0; a < income_amt.length - 1; a++) {
                                for (var b = 0; b < income_amt.length - a - 1; b++) {
                                    if (income_amt[b] < income_amt[b + 1]) {
                                        var temp = income_amt[b];
                                        income_amt[b] = income_amt[b + 1];
                                        income_amt[b + 1] = temp;
                                    }
                                }
                            }

                            for (var a = 0; a < spending_amt.length - 1; a++) {
                                for (var b = 0; b < spending_amt.length - a - 1; b++) {
                                    if (spending_amt[b] < spending_amt[b + 1]) {
                                        var temp = spending_amt[b];
                                        spending_amt[b] = spending_amt[b + 1];
                                        spending_amt[b + 1] = temp;
                                    }
                                }
                            }
                            if (spending_amt.length > 4) {
                                var temp = 0;
                                var len = spending_amt.length;
                                for (var a = 4; a < len; a++) {
                                    temp += spending_amt[a];
                                }
                                spending_keyword[4] = '기타';
                                spending_amt[4] = temp;
                                spending_keyword=spending_keyword.slice(0,5);
                                spending_amt=spending_amt.slice(0,5);
                            }
                            if (income_amt.length > 4) {
                                var temp = 0;
                                for (var a = 4; a < income_amt.length; a++) {
                                    temp += spending_amt[a];
                                    income_amt[a] = null;
                                    income_keyword[a] = null;
                                }
                                income_keyword[4] = '기타';
                                income_amt[4] = temp;
                                income_keyword=income_keyword.slice(0,5);
                                income_amt=income_amt.slice(0,5);
                            }

                            // var list = new Object();
                            // list.income = {};
                            // list.total_income = total_income;
                            // list.spending = {};
                            // list.total_spending = total_spending;
                            // for(var i = 0 ; i<income_keyword.length ;i++){
                            //     list.income[income_keyword[i]] = income_amt[i];
                            // }
                            // for(var i = 0 ; i <spending_keyword.length;i++){
                            //     list.spending[spending_keyword[i]] = spending_amt[i];
                            // }

                            var list = new Object();
                            var income = new Object();
                            var spending = new Object();

                            income[0] = total_income;
                            income[1] = income_keyword;
                            income[2] = income_amt;

                            spending[0] = total_spending;
                            spending[1] = spending_keyword;
                            spending[2] = spending_amt;

                            list[0] = income;
                            list[1] = spending;
                            console.log("list!!!!!!!!!!");
                            console.log(list);

                            response.json(JSON.stringify(list));
                        }
                    })


                }
            })




        }
    })

})


module.exports = router;