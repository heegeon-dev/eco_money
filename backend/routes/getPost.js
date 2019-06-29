var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
})

/* GET users listing. */
router.post('/', function (req, res, next) {
    var uid = req.body.uid;
    var flag = req.body.flag;   // 0 : 자기 자신  /   1 : 공유  /   2 : 검색
    var sql = "";
    var keyword = "";
    var fromno = req.body.fromno;
    var tono = req.body.tono;

    if (flag = 0) {
        sql = "SELECT * FROM post WHERE uid = " + uid + " limit "+ fromno +" , "+ tono;;

    } else if (flag = 1) {
        sql = "SELECT * FROM post ORDER BY reg_date limit "+ fromno +" , "+ tono;;
    
    } else if (flag = 2) {
        keyword = req.body.keyword;
        sql =   "select p.gp_inc_tot total_income, p.gp_int_keywd income_keyword, p.gp_inc_amt income_amount, "+
                "p.gp_spd_tot total_spending, p.gp_spd_keywd spending_keyword, p.gp_spd_amt spending_amt, "+
                "p.reg_date reg_date, p.apihashtag phashtag, p.inputhastag hashtag "+
                "from user u , post p where (p.apihashtag LIKE '%"+keyword+
                "%' or p.inputhastag LIKE '%"+keyword+
                "%') and u.uid = p.uid " +
                "limit "+ fromno +" , "+ tono;

    }

    con.query(sql, function (error, result) {
        if (error) throw error
        else {
            console.log(result);
            res.json(JSON.stringify(result));
        }
    })
});

module.exports = router;
