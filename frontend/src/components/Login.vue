<template>
    <div class="container">
        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" v-model="mail_address" required>
        <div v-if="errMailAddress" class="invalid-feedback">{{ errMsgMailAddress }}</div>

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" v-model="password" required>
        <div v-if="errPassword" class="invalid-feedback">{{ errMsgPassword }}</div>

        <button v-on:click="loginSubmit">로그인</button>
        <button v-on:click=moveToJoin()>회원가입</button>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
        mail_address:"",
        password:"",
        errMailAddress:"false",
        errMsgMailAddress:"",
        errPassword:"false",
        errMsgPassword:""
    }
  },
  methods:{
    loginSubmit: function() {
      console.log("로그인")
       if (!this.chkValidation()) {
         return false
      } else {
        axios.post(`http://127.0.0.1:3000/login`, 
          { 
              email: this.mail_address,
              password: this.password
          }).then(
              (response) => { 
                if(response.data == "login!"){
                    this.$router.push("/MainContent")
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
label {
    float: left;
    width: 55%;
}
</style>