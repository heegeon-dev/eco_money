var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysql = require('mysql');
var db = require('../db-config.json');



var con = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
})


router.get('/', function (req, res, next) {
    console.log("side 시작 !");

    console.log(req.query.uid);

    var sql = "SELECT * FROM user WHERE UID = ?";

    con.query(sql, [req.query.uid], function (error, result) {
        if (error) throw error;
        else {
            console.log(result[0]);
            // res.json(
            //     {
            //         "hashtag": result[0].inputhastag,
            //         "phashtag": result[0].apihashtag,
            //         "goal": result[0].goal
            //     }

            // );
            var hashtag = new Array();
            var phashtag = new Array();
            var temp="#";
            for (var i = 1; i < result[0].inputhastag.length; i++) {
                if (result[0].inputhastag.charAt(i) == '#') {
                    hashtag[hashtag.length]=temp;
                    temp ="#";
                }else{
                temp += result[0].inputhastag.charAt(i);
                }
            }
            hashtag[hashtag.length]=temp;
            temp = "#";
            for (var i = 1; i < result[0].apihashtag.length; i++) {
                if (result[0].apihashtag.charAt(i) == '#') {
                    phashtag[phashtag.length]=temp;
                    temp ="#";
                }else{
                    temp += result[0].apihashtag.charAt(i);
                }
            }
            phashtag[phashtag.length]=temp;
            var aJson = new Object();
            aJson.nickname = result[0].uname;
            aJson.hashtag = hashtag;
            aJson.phashtag = phashtag;
            aJson.goal = result[0].goal;
            console.log(JSON.stringify(aJson));
            res.json(JSON.stringify(aJson))
        }

    })

});
module.exports = router;
