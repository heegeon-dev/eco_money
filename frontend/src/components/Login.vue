<template>
    <div class="container">
        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" v-model="user_id" required>

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" v-model="user_pwd" required>

        <button v-on:click="loginSubmit">로그인</button>
    
        <div class="container" style="background-color:#f1f1f1">
            <button type="button" class="cancelbtn">Cancel</button>
            <button v-on:click=moveToJoin()>회원가입</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
        user_id:"",
        user_pwd:""
    }
  },
  methods:{
    loginSubmit: function() {
      console.log("로그인")
      axios.post(`http://127.0.0.1:3000/login`, 
        { 
            email: this.user_id,
            password: this.user_pwd
        }).then(
            (response) => { console.log(response) },
	        (error) => { console.log(error) }
            // res=> {
            //     console.log(res)
            //     this.$router.push("/MainContent")
            // }
        )
    },
    moveToJoin: function() {
        this.$router.push("/Join")
    },
  }
}
</script>