<template>
    <div class="container">
      <div class="title">
        <button id="login">LOGIN</button>
        <p>WELCOM TO SNF!!</p>
        <br>
        <p class="title-ex">SNF는 Social Network Financial의 약자로,<br>
          금융 활동 내역을 공유하는 플랫폼 입니다.<br>
          나의 금융 활동 내역을 다양한 사람들과 비교해 보세요.<br>
        </p>
        <button id="signup">SIGN UP</button>
      </div>
      <div class="login">
        <label for="uname"><b>이메일</b></label>
        <input type="text" placeholder="EMail" v-model="mail_address" required>
        <div v-if="errMailAddress" class="invalid-feedback">{{ errMsgMailAddress }}</div>

        <label for="psw"><b>비밀번호</b></label>
        <input type="password" placeholder="Password" v-model="password" required>
        <div v-if="errPassword" class="invalid-feedback">{{ errMsgPassword }}</div>

        <label for="nickname"><b>닉네임</b></label>
        <input type="nickname" placeholder="Nickname" v-model="nickname" required>
        <div v-if="errNickName" class="invalid-feedback">{{ errMsgNickName }}</div>
    
        <button v-on:click="loginSubmit">회원가입</button>
        <button type="button" class="cancelbtn" v-on:click="moveToLogin">돌아가기</button>
        <button type="button" class="authbtn" v-on:click="moveToAuth">인증</button>
      </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Join',
  data () {
    return {
        mail_address:"",
        password:"",
        nickname:"",
        errMailAddress:"false",
        errMsgMailAddress:"",
        errPassword:"false",
        errMsgPassword:"",
        errNickName:"false",
        errMsgNickName:""
    }
  },
  methods:{
    loginSubmit: function() {
      if (!this.chkValidation()) {
         return false
      } else {
        axios.post(`http://127.0.0.1:3000/join`, 
        { 
            email: this.mail_address,
            password: this.password,
            nickname: this.nickname
        }).then(
            (response) => { 
                if(response.data == "my key!"){
                    this.$router.push("/MainContent")
                }
            },
            (error) => { console.log(error) }
            // res=> {
            //     console.log(res)
            //     this.$router.push("/private")
            // }
        )
      }
    },
    chkValidation: function() {
        //메일 미입력 체크
        if (this.mail_address == null || this.mail_address == "") {
          this.errMailAddress = true
          this.errMsgMailAddress = "메일주소를 입력해주세요."
        } else {
          this.errMailAddress = false
          this.errMsgMailAddress = ''
        }
        //패스워드 미입력 체크
        if (this.password == null || this.password == '') {
          this.errPassword = true
          this.errMsgPassword = "패스워드를 입력해주세요."
        } else {
          this.errPassword = false
          this.errMsgPassword = ''
        }

        //닉네임 미입력 체크
        if (this.nickname == null || this.nickname == '') {
          this.errNickName = true
          this.errMsgNickName = "닉네임을 입력해주세요."
        } else {
          this.errNickName = false
          this.errMsgNickName = ''
        }
        
        //에러가 없을때만 true를 반환
        if (this.errMailAddress || this.errPassword || this.errNickName) {
          return false
        } else {
          return true
        }
    },
    moveToLogin: function() {
        this.$router.push("/")
    },
    moveToAuth: function() {
      //인증URL 추가예정
      axios.post(`http://192.168.160.50:3000/`, 
        { 
        }).then(
            (response) => { 
                if(response.data == "my key!"){
                    this.$router.push("/MainContent")
                }
            },
            (error) => { console.log(error) }
        )
    }
  }
}
</script>
<style>
.invalid-feedback {
  display: block;
  color: #e50000;
  font-size: 11px;
  font-weight: bold;
  width: 55%;
  margin-left: 50%;
}
label {
    float: left;
    width: 55%;
}
.container{
  max-width: 100%;
  height: 100%;
}
.login {
  float: left;
  width: 50%;
}
.title {
  float: left;
  width: 50%;
  background-color: #fcaf17;
  color: #fff;
}
#login{
  position: absolute;
  right: 53%;
}
#signup{
  position: absolute;
  left:3%;
}
</style>
