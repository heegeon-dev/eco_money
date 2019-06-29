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
router.get('/', function(req, res, next) {

    var uid = req.body.uid;
});

module.exports = router;
