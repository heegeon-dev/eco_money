<template>
    <div class="container">
        <label for="uname"><b>이메일</b></label>
        <input type="text" placeholder="EMail" name="uname" v-model="user_id" required>

        <label for="psw"><b>비밀번호</b></label>
        <input type="password" placeholder="Password" name="psw" v-model="user_pwd" required>

        <label for="nickname"><b>닉네임</b></label>
        <input type="nickname" placeholder="nickname" name="nickname" v-model="nickname" required>

        <button v-on:click="loginSubmit">회원가입</button>
        <label>
            <input type="checkbox" checked="checked" name="remember"> Remember me
        </label>
    
        <div class="container" style="background-color:#f1f1f1">
            <button type="button" class="cancelbtn">Cancel</button>
            <span class="psw">Forgot <a href="#">password?</a></span>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Join',
  data () {
    return {
        user_id:"",
        user_pwd:"",
        nickname:""
    }
  },
  methods:{
    loginSubmit: function() {
      console.log("회원가입")
      axios.post(`http://127.0.0.1:3000/join`, 
        { 
            email: this.user_id,
            password: this.user_pwd,
            nickname: this.nickname
        }).then(
            (response) => { 
                console.log(response.data)
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
  }
}
</script>