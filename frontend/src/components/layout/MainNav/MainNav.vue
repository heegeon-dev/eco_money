<template>
  <header class="main-header">
    <div class='green_window'>
	    <input type='text' class='input_text' v-model="keyword" placeholder="검색할 키워드를 입력하세요" />
        <img src="../../../assets/search.svg" v-on:click="search" class='sch_smit'>
      <div class ="searchHash">            
        <p><u>#자동차대출</u></p>
        <p><u>#적금상품</u></p>
        <p><u>#펀드상품</u></p>
        <button v-on:click="showList">더보기</button>
      </div>
    </div>
    <img src = "../../../assets/bell.svg">
    <img src = "../../../assets/icon.svg">
    <button id="logout" v-on:click="Logout">로그아웃</button>
  </header>
</template>

<script>
import axios from 'axios'
import {
  mapMutations, mapState
} from 'vuex'

export default {
  name: 'main-nav',
  props: {
    /**
       * Whether the footer should be wrapped in a container, or not.
       */
    contained: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchItem:[],
      keyword:"",
    }
  },
  methods: {
    showList: function () {
    },
    Logout: function () {
      axios.post(`http://127.0.0.1:3000/logout`, 
        { 
            email: this.mail_address,
            password: this.password,
            nickname: this.nickname
        }).then(
            (response) => { 
                if(response.data == "my key!"){
                    this.$router.push("/Login")
                }
            },
            (error) => { console.log(error) }
            // res=> {
            //     console.log(res)
            //     this.$router.push("/private")
            // }
        )
    },
    search: function () {
      console.log(this.keyword)
      if(this.keyword =="" || this.keyword ==null || this.keyword ==undefined){
        this.keyword =="none"
      }
      // this.$emit('change')
      // this.$store.commit('auth/setSearchText', this.keyword)
      // this.$store.commit('auth/setSearchFlag', 1)
      // this.$router.push({ path: '/MainContent/'})
      // axios.post(`http://127.0.0.1:3000/main`, 
      //   { 
      //       keyword: this.keyword
      //   }).then(
      //       (response) => { 
      //           if(response.data == "my key!"){
      //               this.$router.push("/MainContent")
      //           }
      //       },
      //       (error) => { console.log(error) }
      //   )
    }
  }
};
</script>
<style>
.main-header{
    position: fixed;
    top: 0;
    width: 100%;
    background-color:#fcaf17;
    padding: 1%;
    z-index: 999;
}
.green_window {
	display: inline-block;
	width: 366px; height: 34px;
	border: 3px solid #fcaf17;
  background: white;
}
.input_text {
	width: 348px; height: 21px;
	margin: 6px 0 0 9px;
	border: 0;
	line-height: 21px;
	font-weight: bold;
	font-size: 16px;
	outline: none;
}
.sch_smit {
  width: 20px;
  vertical-align: top;
  cursor: pointer;
  margin-left: 90%;
  margin-top: -6%;
  z-index: 1;
}
.searchHash{
  width:100%;
}
img {
  width: 2%;
  display: inline-block;
  vertical-align: top;
  margin-top: 1%;
  margin-left: 1%;
}
p{
  display: inline-block;
  width: 20%;
  font-size: 12px;
  margin-left: 1%;
  vertical-align: top;
  margin-top: 1%;
}
button{
  vertical-align: top;
  margin-left: 1%;
  width: 15%;
}
#logout{
  width: 5%;
  position: absolute;
  right: 2%;
  top: 23%;
}

</style>
