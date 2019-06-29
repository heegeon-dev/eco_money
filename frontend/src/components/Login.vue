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
        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" v-model="mail_address" required>
        <div v-if="errMailAddress" class="invalid-feedback">{{ errMsgMailAddress }}</div>

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" v-model="password" required>
        <div v-if="errPassword" class="invalid-feedback">{{ errMsgPassword }}</div>

        <button v-on:click="loginSubmit">로그인</button>
        <button v-on:click=moveToJoin()>회원가입</button>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
import {
  mapMutations, mapState
} from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
        mail_address:"",
        password:"",
        errMailAddress:"false",
        errMsgMailAddress:"",
        errPassword:"false",
        errMsgPassword:"",
        uid:"",
    }
  },
  methods:{
    loginSubmit: function() {
      var self = this
       if (!this.chkValidation()) {
         return false
      } else {
        //127.0.0.1
        axios.post(`http://192.168.160.50:3000/login`, 
          { 
              email: self.mail_address,
              password: self.password
          }).then(
              (response) => { 
                console.log("response",response)
                if(response.data !== "" || response.data !=="undefind"){
                  self.$store.commit('auth/uId', response.data)
                  self.uid = self.$store.getters['auth/uId']
                  self.$router.push("/MainContent")
                }
               },
              (error) => { console.log(error) }
              // res=> {
              //     console.log(res)
              //     this.$router.push("/MainContent")
              // }
          )
      }
    },
    moveToJoin: function() {
        this.$router.push("/Join")
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
        
        //에러가 없을때만 true를 반환
        if (this.errMailAddress || this.errPassword) {
          return false
        } else {
          return true
        }
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