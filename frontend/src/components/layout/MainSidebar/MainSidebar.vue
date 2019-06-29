<template>
  <table>
    <header class="main-header">
      <div class='green_window'>
        <input type='text' class='input_text' v-model="keyword" placeholder="검색할 키워드를 입력하세요" />
          <img src="../../../assets/search.svg" v-on:click="search(keyword)" class='sch_smit'>
        <div class ="searchHash">            
          <a v-on:click="search(tag1)"><u>#자동차대출</u></a>
          <a v-on:click="search(tag2)"><u>#적금상품</u></a>
          <a v-on:click="search(tag3)"><u>#펀드상품</u></a>
          <select id='searchbtn' @change="chageLangSelect()">
            <option value='' selected>더보기</option>
            <option value="예금상품">예금상품</option>
            <option value="담보/전세대출">담보/전세대출</option>
            <option value="주택도시기금대출">주택도시기금대출</option>
            <option value="신탁상품">신탁상품</option>
            <option value="보험상품">보험상품</option>
          </select>
        </div>
      </div>
      <img id="btn-icon1" src = "../../../assets/bell.svg">
      <img id="btn-icon2" src = "../../../assets/icon.svg">
      <button id="logout" v-on:click="Logout">로그아웃</button>
    </header>
    <tr>
      <th id = "tabs_item">
        <ul class="tabs_item">
          <!-- <li  v-for="(item, index) in items"> -->
          <li class="user_profile">
            <div id="user_data">
              <img id="user_img" src="../../../assets/3.png"/>
              <p id="user_id">{{userName}}</p>
              <img id="user_setting" v-on:click="ClickSetting" src="../../../assets/setting_icon.png"/>
              <div class="hash" v-for="hash in hashList" v-bind:key="hash">
                <p id="api_hash">{{hash}}</p>
              </div>
            </div>
            <hr>
            <div id="user_goal">
              <div id="user_hash" v-for="hash in userHashList" v-bind:key="hash">
                <p id="user_hash">{{hash}}</p>
              </div>
              <img id="addhashbtn" v-if="addHash" v-on:click=EditUserHash() src="../../../assets/plus.png"/>
              <input v-if="addHashInput" type="text" id="addUserHash" v-model="userHash">
              <div id="user_goal">
                <span>목표자산:</span>
                <input type="text" id="goal" v-model="userGoal" :readonly="shouldDisable">
                <button id="edit-btn" v-if="editBtn" v-on:click=EditUserGoal()>수정</button>
              </div>
            </div>
          </li>
          <li class="item tab1" v-on:click=ChangeTab(1) v-bind:class="[ activetab === 1 ? 'active' : '' ]">마이페이지</li>
          <li class="item tab2" v-on:click=ChangeTab(2) v-bind:class="[ activetab === 2 ? 'active' : '' ]">공유페이지</li>
        </ul>
      </th>
      <th id = "tabs_content">
        <PrivatePage v-if="activetab === 1" class="tabcontent"/>
        <PublicPage v-if="activetab === 2" class="tabcontent"/>
      </th>
    </tr>
  </table>
</template>

<script>
import PrivatePage from '../../PrivatePage.vue'
import PublicPage from '../../PublicPage.vue'
import axios from 'axios'
import {
  mapMutations, mapState
} from 'vuex'

export default {
  components: {
    PrivatePage,
    PublicPage
  },
  data() {
    return {
      activetab: 1,
      userName:'',
      hashList:[],
      userHashList:[],
      userHash:'',
      userGoal:'',
      settingOn:false,
      editBtn:false,
      shouldDisable: true,
      addHash:false,
      addHashInput:false,
      searchItem:[],
      keyword:"",
      userDataList:[],
      tag1:"자동차대출",
      tag2:"적금상품",
      tag3:"펀드상품",

      updateFlg:0,
      userId:"",
      scrollFlag: false
    }
  },
  methods: {
    ChangeTab: function (index) {
      if(index == 1){
        this.activetab = 1
        this.keyword=""
      } else if(index == 2){
        this.activetab = 2
      }
    },
    ClickSetting: function (index) {
      this.editBtn = true
      this.shouldDisable = false
      this.addHash = true
      document.getElementById('goal').focus()
    },
    EditUserGoal: function () {
      this.updateFlg = 1
      this.UpdateUserData(this.updateFlg)
      //sidebar api완성되면 지울것
      this.shouldDisable = true
      this.editBtn = false
      this.addHash = false
      this.addHashInput = false
    },
    EditUserHash: function () {
      this.addHashInput = true
    },
    showList: function () {
    },
    Logout: function () {
      console.log("Logout")
      axios.post(`http://192.168.160.50:3000/logout`, 
        {
            // email: this.mail_address,
            // password: this.password,
            // nickname: this.nickname
        }).then(
            (response) => { 
                if(response.data == "my key!"){
                    this.$router.push("/Login")
                }
            },
            (error) => { console.log(error) }
        )
    },
    search: function (keyword) {
      this.keyword = keyword
      console.log("keyword",this.keyword)
      if(this.keyword =="" || this.keyword ==null || this.keyword ==undefined){
        this.keyword =="none"
      }
      this.$store.commit('auth/setSearchText', this.keyword)
      this.ChangeTab(2)
    },
    chageLangSelect: function () {
      var keyword = event.target.value
      console.log("event.target.value",event.target.value)
      this.search(keyword)
    },
    GetUserData: function () {

      axios.get(`http://192.168.160.50:3000/side`, 
        {
          //파라미터
        }).then(
            (response) => { 
                this.userDataList = JSON.parse(response.data)
                this.hashList = this.userDataList.hashtag
                this.userHashList = this.userDataList.phashtag
                this.userGoal = this.userDataList.goal
                this.userName = this.userDataList.nickname
            },
            (error) => { console.log(error) }
        )
    },
    UpdateUserData: function () {
      console.log("userHash",this.userHash)
      if(this.userHash !==''){
        this.userHashList.push(this.userHash)
      } 
      console.log("updateFlg",this.updateFlg)
      console.log("inputHashtag",this.userHashList)
      console.log("goal",this.userGoal)

      axios.get(`http://192.168.160.50:3000/side-update`, 
        {
          update_flag:this.updateFlg,
          inputHashtag:this.userHashList,
          goal:this.userGoal,
        }).then(
            (response) => { 
              this.shouldDisable = true
              this.editBtn = false
              this.addHash = false
              this.addHashInput = false
              this.userHash = ""
            },
            (error) => { console.log(error) }
        )
    },
    scrollInfinite: function(e) {
      // if(this.scrollFlag)
      // {
        if (!this.noMoreData || !this.busy) {

          var scrollBody = e.target.scrollingElement
          var clientHeight = Math.floor(scrollBody.clientHeight)
          var scroll_body = Math.floor(scrollBody.scrollHeight) - clientHeight
          var scroll_top = Math.floor(scrollBody.scrollTop)
          var percent_of_scroll = Math.floor((scroll_top / scroll_body) *100)

          if(this.$route.path == '/MainContent'){
            if (percent_of_scroll >= 100) {
              var self = this
              setTimeout(function() {
                self.GetUserPastData()
              }, 300)
            }
          }
        }
      // }
    },
    GetUserPastData: function() {
      console.log("스크롤 감지후 호출됨")
    }
  },
  created(){
    this.GetUserData()
  },
  mounted(){
    window.addEventListener('scroll', this.scrollInfinite)
  }
}
</script>
<style>
table {
  width: 100%;
}
ul{
  list-style:none;
}
li.item {
  margin-bottom: 3%;
  font-size: 1.5rem;
}
li.item.active{
  background-color: #fcaf17;
  color: #fff;
}
.user_profile{
  margin-bottom: 20%;
  box-shadow: 0px 0px 0px 1px grey;
  border-radius: 10%;
  padding: 10%;
  width: 100%;
}
#tabs_item{
  width: 19%;
  height: 100%;
  padding: 2%;
  position: fixed;
  top: 10%;
}
 #tabs_content{
  width: 45%;
  float: left;
  margin-left: 28%;
  margin-top: 9%;
  /* box-shadow: 0px 0px 0px 1px grey; */
}
div#termandonoff {
  padding: 2%;
}
div#graph {
  padding: 2%;
}
#user_data{
  display: inline-block;
}
#user_id{
  float: left;
  width: 65%;
  font-size: 10px;
}
#user_setting{
  float: left;
  width: 10%;
  cursor: pointer;
}
#user_img{
  float: left;
  width: 20%;
}
#api_hash{
  width: 25%;
  float: left;
  font-size: 0.3em;
}
#user_hash{
  width: 40%;
  float: left;
  font-size: 0.7em;
}
#addhashbtn{
  width: 10%;
  float: left;
  text-align: center;
  cursor: pointer;
}
#user_goal{
  display: inline-block;
  width: 100%;
  margin-top: 5%;
}
#user_goal span {
  float: left;
}
#edit-btn{
  width: 30%;
  margin-top: 5%;
  border-radius: 4px;
  background-color:#fcaf17;
  color: #fff;
}
#goal {
  float: left;
  margin-left: 3%;
  width: 100%;
  border: none;
}
#addUserHash{
  float: left;
  margin-left: 3%;
  width: 100%;
}
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
#btn-icon1{
  width: 2%;
  position: absolute;
  right: 29%;
}
#btn-icon2{
  width: 2%;
  position: absolute;
  right: 25%;
}
p{
  display: inline-block;
  width: 20%;
  font-size: 12px;
  margin-left: 1%;
  vertical-align: top;
  margin-top: 1%;
}
a{
  display: inline-block;
  width: 20%;
  font-size: 12px;
  margin-left: 1%;
  vertical-align: top;
  margin-top: 1%;
}
/* GENERAL BUTTON STYLING */
#logout,
#logout::after {
  -webkit-transition: all 0.3s;
	-moz-transition: all 0.3s;
  -o-transition: all 0.3s;
	transition: all 0.3s;
}
#logout {
  background: none;
  border: 3px solid #fff;
  border-radius: 5px;
  color: #fff;
  font-size: 9px;
  position: relative;
  text-transform: uppercase;
  width: 15%;
}
#logout::before,
#logout::after {
  background: #fff;
  content: '';
  position: absolute;
  z-index: -1;
}
#logout:hover {
  color: #fcaf17;
}
#logout{
  width: 5%;
  position: absolute;
  right: 18%;
  top: 37%;
}
#logout::after {
  height: 100%;
  left: 0;
  top: 0;
  width: 0;
}
#logout:hover:after {
  width: 100%;
}
select {
  margin-bottom: 1em;
  padding: .25em;
  border: 0;
  border-bottom: 2px solid currentcolor; 
  font-weight: bold;
  letter-spacing: .15em;
  border-radius: 0;
  background-color: antiquewhite;
}
select::-ms-expand {
  /* for IE 11 */
  display: none;
}
</style>
