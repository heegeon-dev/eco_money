<template>
  <table>
    <tr>
      <th id = "tabs_item">
        <ul class="tabs_item">
          <!-- <li  v-for="(item, index) in items"> -->
          <li class="user_profile">
            <div id="user_data">
              <img id="user_img" src="../../../assets/3.png"/>
              <p id="user_id">UserName</p>
              <img id="user_setting" src="../../../assets/setting_icon.png"/>
              <p id="user_hash">#연봉0000</p>
              <p id="user_hash">#행복대출</p>
              <p id="user_hash">#3년적금</p>
              <p id="user_hash">#자동차대출</p>
            </div>
            <hr>
            <div id="user_goal">
              <div id="user_goal">
                <p id="user_hash">#포르쉐</p>
                <p id="user_hash">#반포자이</p>
              </div>
              <div id="user_goal">
                <span>목표자산:</span>
                <input type="text" id="goal">
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
    };
  },
  methods: {
    ChangeTab: function (index) {
      if(index == 1){
        this.activetab = 1
      } else if(index == 2){
        this.activetab = 2
      }
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
 }
 #user_img{
   float: left;
   width: 20%;
 }
 #user_hash{
   width: 30%;
   float: left;
   font-size: 9px;
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
}
 #goal{
   width: 30%;
   float: right;
 }
</style>
