<template>
  <section>
    <div class="pub_view">
      <div class="pub_write">
        <div id="write">
          <header class="write-header" id="show-modal" @click="showModal=true">
            <slot name="header">
              <header id="write_tag">게시물 작성하기</header>
              <div class="grid">
                <div class="grid_item" id="user_data">
                  <figure>
                    <img id="user_img" src="../assets/3.png">
                    <figcaption id="user_id">UserName</figcaption>
                  </figure>
                </div>
                <div class="grid_item" style="width: 75%;">
                  <textarea id="write" placeholder="목표금액 달성을 자랑하거나, 대출상품을 문의 하는 등 다양한 게시글을 남겨보세요."></textarea>
                </div>
                <div class="grid_item">
                  <button
                    type="submit"
                    class="btn btn-success"
                    style="margin-top:50%; width: auto; font-size: larger;
              font-weight: bold;
               background-color: #7c7363;
               border-color: #7c7363;"
                  >공유하기</button>
                </div>
              </div>
            </slot>
          </header>
          <appMyModal v-if="showModal" @close="closeModal()"></appMyModal>
        </div>
        <div id="write_body">
          <section class="write-body">
            <slot name="body"></slot>
            <div id="feedview_page">
              <newPost v-if="postfeed=true"/>
              <div id="no_feed" v-if="postfeed=false">
                <p style=" font-size: 20px;
                          width: 100%;">
                 (๑°ㅁ°๑)‼✧ <br>
                  컨텐츠가 없습니다.
                  게시글을 남겨보세요!
                </p>
              </div>
            </div>
          </section>
        </div>
        <footer class="write-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </section>
</template>



<script>
import myModal from "../Modal/Modal.vue";
import FeedView from "./FeedView.vue";
import { mapMutations, mapState } from "vuex";
import axios from 'axios'

export default {
  name: "publicpage",
  components: {
    appMyModal: myModal,
    newPost: FeedView
  },
  data() {
    return {
      postfeed: true,
      showModal: false,
      search_text: "none",
      uid:"",
      offset: 0,
      limit: 5,
      PublicPostList:[],
      mode:1
    };
  },
  methods: {
    closeModal() {
      this.showModal = !this.showModal;
    },
    showFeed: function(index) {
      this.postfeed = true;
      document.getElementsByClassName("feed-view");
    },
    GetPublicPost:function(){
      if(this.search_text !== "")
      {
        this.mode =2
      } else {
        this.mode =1
      }
        axios.post(`http://192.168.160.50:3000/getPost`, 
        { 
          //파라미터
          params: {
            mode:this.mode,
            keyword:this.search_text,
            offset: this.offset,
            limit: this.limit,
            uid:this.userId
          }
        }).then(
            (response) => { 
              this.PublicPostList = JSON.parse(response.data)
              console.log("this.PublicPostList",this.PublicPostList)
              this.offset = this.offset+5
              console.log("this.offset",this.offset)
            },
            (error) => { console.log(error) }
        )
    }
  },
  created() {
    console.log(
      "this.$store.getters['auth/searchText'] ",
      this.$store.getters["auth/searchText"]
    )
    //uid설정
    this.userId = this.$store.getters['auth/uId']

    //검색어 있을때, 없을때 파라미터 설정
    if (this.search_text !== "") {
      //검색시 키워드 파라미터로 전송하기
      this.search_text = this.$store.getters["auth/searchText"]
    } else {
      this.$store.commit("auth/setSearchText", "")
    }

    //포스트출력
    this.GetPublicPost()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div#pub_write {
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

p{
  margin-top: 3%;
}
p#incomedetails {
    width: 100%;
    /* right: 5%; */
    padding-right: 65%;
}
p#incomeamnt {
    width: 100%;
    /* right: 5%; */
    padding-left: 30%;
}

/* from private */

.vdp-datepicker {
  text-align: center;
  width: 39%;
  float: left;
}
.datepicker-group{
  width: 25%;
  float: left;
  text-align: center;
  padding-left: 1%;
}
.datepicker-group-btn{
  width: 10%;
  float: left;
  padding-left:4px;
}
.fromto{
  width: 10%;
  float: left;
  text-align: center;
}
#available p {
  width: 96%;
  font-size: 21px;
  text-align: center;
  color: #fcaf17;
  border-style: outset;
}
input#calendar{
  border-radius: 6px;
  margin-top: 11%;
}
.term{
  width: 50%;
  float: left;
  margin-right: 35px;
  text-align: -webkit-auto;
}
div#search {
  width: 15%;
  float: left;
  margin-left: 2%;
}
label{
  font-size: 9px;
}
.toggle{
  width: 28%;
  text-align: right;
  float: left;
  position: absolute;
  top: 25%;
  right: 28%;
}
.toggle span{
  font-size: 9px;
  font-weight: 100;
  margin-right: 2%;
}
.termfromto {
  width: 30%;
  border:none;
  margin-left: 2%;
}
.user_data{
  box-shadow: 0px 0px 0px 1px grey;
}
#amonth{
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-right:-4px;
  float: left;
  width: 15%;
}
#btn{
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-right:-4px;
  float: left;
  width: 15%;
}
#btn_group button{
  border: 1px solid #b9bec0;
  background-color: rgba(0,0,0,0);
  color: rgb(74, 76, 77);
  padding: 5px;
  margin-bottom: 2%;
  margin-right: 1px;
  width: 19.5%;
}
#amonth:active, #amonth:focus, #amonth:hover #amonth:visited{
  color:white;
  background-color: #fcaf17;
}
#btn:active, #btn:focus, #btn:hover #btn:visited{
  color:white;
  background-color: #fcaf17;
}
#graph{
  width: 100%;
}
#Piegraph{
  position: relative;
  width: 50%;
  height: 300px;
  float: left;
  margin-top: 2%;
}
#graphdetails {
  width: 50%;
  height: 350px;
  float: left;
  font-size: 0.8em;
  margin-top: 2%;
  border-style: outset;
}
#title{
  position: absolute;
  font-size: 1.5rem;
  top: 45%;
  left: 45%;
  width: 15%;
  float: left;
}



/* what i did */

.grid {
  width: 500px;
  margin: auto;
  overflow: hidden;
  display: list-item;
}
.grid_item {
  float: left;
}

header#write_tag {
  text-align: left;
  background-color: blanchedalmond;
}

.figure {
  display: inline-grid;
}

img#user_img {
  width: 50px;
}

div#user_data {
  width: 50px;
  margin-top: 1%;
  margin-left: 2%;
}

textarea#write {
  border: none;
  width: 90%;
  margin-top: 6%;
}

div#write {
background-color: white;
}

div#no_feed {
  margin-top: 20%;
}

header#show-modal {
  width: 100%;
}

div#write_body {
  margin-top: 5%;
  background-color: white;
}
</style>
