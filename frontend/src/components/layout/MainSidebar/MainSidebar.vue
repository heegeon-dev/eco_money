<template>
  <table>
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
                <p id="api_hash">#{{hash}}</p>
              </div>
            </div>
            <hr>
            <div id="user_goal">
              <div id="user_hash" v-for="hash in userHashList" v-bind:key="hash">
                <p id="user_hash">#{{hash}}</p>
              </div>
              <button id="addhashbtn" v-if="addHash" v-on:click=EditUserHash()>+</button>
              <input v-if="addHashInput" type="text" id="addUserHash">
              <div id="user_goal">
                <span>목표자산:</span>
                <input type="text" id="goal" v-model="userGoal" :readonly="shouldDisable">
                <button v-if="editBtn" v-on:click=EditUserGoal()>수정</button>
              </div>
            </div>
          </li>
          <li class="item tab1" v-on:click=ChangeTab(1) v-bind:class="[ activetab === 1 ? 'active' : '' ]">마이페이지</li>
          <li class="item tab2" v-on:click=ChangeTab(2) v-bind:class="[ activetab === 2 ? 'active' : '' ]">공유페이지</li>
        </ul>
      </th>
      <th id = "tabs_content">
        <PrivatePage v-if="activetab === 1" class="tabcontent" />
        <PublicPage v-if="activetab === 2" class="tabcontent" />
      </th>
    </tr>
  </table>
</template>

<script>
import PrivatePage from '../../PrivatePage.vue';
import PublicPage from '../../PublicPage.vue';

export default {
  components: {
    PrivatePage,
    PublicPage,
  },
  props: {
    /**
       * Whether the main navbar should be sticky, or not.
       */
    stickyTop: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      activetab: 1,
      userName:'test11',
      hashList:['ㅇㅇ적금','ㅇㅇ자동차대출','ㅇㅇ담보대출'],
      userHashList:['포르쉐','반포자이'],
      userGoal:'2020년까지 5억모으기',
      settingOn:false,
      editBtn:false,
      shouldDisable: true,
      addHash:false,
      addHashInput:false
    }
  },
  methods: {
    ChangeTab: function (index) {
      if(index == 1){
        this.activetab = 1
      } else if(index == 2){
        this.activetab = 2
      }
    },
    ClickSetting: function (inex) {
      this.editBtn = true
      this.shouldDisable = false
      this.addHash = true
      document.getElementById('goal').focus()
    },
    EditUserGoal: function () {
      this.shouldDisable = true
      this.editBtn = false
      this.addHash = false
      this.addHashInput = false
    },
    EditUserHash: function () {
      this.addHashInput = true
    }
  }
};
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
  box-shadow: 0px 0px 0px 1px grey;
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
  width: 20%;
  float: left;
  text-align: center;
}
#user_goal{
  display: inline-block;
  width: 100%;
}
#user_goal span {
  float: left;
}
#user_goal input {
  float: left;
  margin-left: 3%;
  width: 100%;
  border: none;
}
#goal{
  width: 30%;
  float: right;
}
</style>
