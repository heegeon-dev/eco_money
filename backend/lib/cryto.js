var crypto = require('crypto');
var key = l7xxd3d3817c16c24fa1a64ea99085bab7c5;
function GenerateHMAC(payload) {
    // 암호화 객체 생성, sha256 알고리즘 선택
    var hmac = crypto.createHmac('sha256', key);
 
    // 암호화할 본문 생성
    var timestamp = new Date().getTime();
    var message = new Buffer(payload + timestamp).toString('base64');
 
    hmac.write(message);
    hmac.end();
 
    return hmac.read();
}
 
module.exports.HMACgen= GenerateHMAC;
