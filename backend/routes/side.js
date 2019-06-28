var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db-config.json');



router.get('/', function (req, res, next) {
    console.log("side 시작 !");

    console.log(req.body.uid);

    var sql = "SELECT * FROM user WHERE UID = ?";

    con.query(sql, [req.session.user.uid], function (error, result) {
        if (error) throw error;
        else {
            res.json(
                {
                    "hashtag": result[0].hashtag,
                    "phashtag": result[0].phashtag,
                    "goal": result[0].goal
                }

            );
        }

    })

});
module.exports = router;
