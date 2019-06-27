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

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.user) {

    console.log(req.session.user);

    var sql = "SELECT * FROM user WHERE UID = ?";

    con.query(sql,[req.session.user.uid],function(error,result){
        if(error) throw error;
        else{
            res.json(
                {
                    "hashtag" : result[0].hashtag,
                    "phashtag" : result[0].phashtag,
                    "goal" : result[0].goal
                }
                
            );
        }

    })

  }else{
      res.send('NO');
  }
});

module.exports = router;
