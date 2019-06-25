var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var client_id = "l7xxcf758b9a4a184f7bb641c63637fcbdff";
    var redirect_uri = "http://localhost:3000/authResult";
    var scope = "login inquiry transfer";
    var response_type = "JSON";
    var qs = 
    "?response_type=code&"
    + "client_id="+client_id+"&"
    + "redirect_uri=http://localhost:3000/authResult&"
    + "scope="+scope+"&"
    + "auth_type=0&"
    + "invoke_type=ajax"
    
    var option = {
        method : "GET",
        url :'https://testapi.open-platform.or.kr/oauth/2.0/authorize2'+ qs,
        success:function(data){
            console.log(data.location);
        }
    };

    console.log("option : " + option);
});

module.exports = router;
