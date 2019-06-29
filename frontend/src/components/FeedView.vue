<template>
  <div class="feed-view">
    <div class="feed-content">
      <header class="feed_header">
        <slot name="header">
          <div id="user_data">
            <img id="user_img" src="../assets/3.png">
            <section id="bubble">
            <div class="rec">
             <div class="before">
            <p id="user_id">UserName</p>
            <input class="termfromto" id="write_date" type="form" v-model="termto">

            <div id="tag_group">
              <p id="user_hash">#연봉0000</p>
              <p id="user_hash">#행복대출</p>
              <p id="user_hash">#3년적금</p>
              <p id="user_hash">#자동차대출</p>
              <p id="user_hash">#포르쉐</p>
              <p id="user_hash">#반포자이</p>
            </div>
                 </div>
                  <div class="after"></div>
                    <div class="middle"></div>
                    <div class="small"></div>
            </div>
            </section>
          </div>
          <textarea id="write" style="width:95%; heigth:80%"></textarea>
          <div class="userdata">
            <div id="btn_group">
              <button id="btn" v-on:click="setTerm(1)">1개월</button>
              <button id="btn" v-on:click="setTerm(3)">3개월</button>
              <button id="btn" v-on:click="setTerm(6)">6개월</button>
              <button id="btn" v-on:click="setTerm(12)">12개월</button>
            </div>
            <div id="termandonoff">
              <div class="term">
                <input class="termfromto" type="text" v-model="termfrom">
                ~
                <input class="termfromto" type="text" v-model="termto">
              </div>

              <div class="toggle">
                <span>상세금액 표기</span>
                <toggle-button v-model="myDataVariable" color="#fcaf17"/>
              </div>
            </div>
          </div>
        </slot>
      </header>
      <section class="feed-body">
        <div id="graph">
          <div id="Piegraph">
            <vue-c3 :handler="handler"></vue-c3>
            <p id="title">수입</p>
          </div>
          <div id="graphdetails">
            <div v-for="(value, key) in incomeitems" v-bind:key="key">수입 {{ key }} : {{ value }}</div>
          </div>
        </div>
        <div id="graph">
          <div id="Piegraph">
            <vue-c3 :handler="ExpenditureHandler"></vue-c3>
            <p id="title">지출</p>
          </div>
          <div id="graphdetails">
            <div v-for="(value, key) in incomeitems" v-bind:key="key">수입 {{ key }} : {{ value }}</div>
          </div>
        </div>
      </section>

      <footer class="feed-footer">
        <slot name="footer">
        <form class="feed-comment-btn" method="POST">
          <section class="“feed-comment”">
            <div id="btn_group2">
            
              <button id="btn2">
                
                  <img id="like" src="../assets/like.png">
                
              </button>
            
              <button id="btn2">
                <img id="like" src="../assets/comment.png">
              </button>
          
              <button id="btn2">
            
                  <img id="like" src="../assets/bookmark.png">
               
              </button>
           
            </div>
         
          </section>
        </form>

          <!-- <div class="“feed-comment-time”">
            <input class="termfromto" id="write_date" type="form" v-model="termto">
          </div> -->

          <section>
            <div class="feed-comment-area">
              <form class="feed-comment-post" method="POST">
                <textarea id="comment_form" placeholder="Add a comment…"></textarea>
                <button type="submit">Post</button>
              </form>
            </div>
          </section>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
// 프라이빗 따옴
import Vue from "vue";
import VueC3 from "vue-c3";
import Datepicker from "vuejs-datepicker";
import { ko } from "vuejs-datepicker/dist/locale";
import "c3/c3.min.css";
import moment from "moment";

export default {
  name: "modal",
  components: {
    VueC3,
    datepicker: Datepicker
  },

  data() {
    return {
      msg: "wwww",
      handler: new Vue(),
      ExpenditureHandler: new Vue(),
      graphdataList: [],
      search_term: "",
      termfrom: "",
      termto: "",
      myDataVariable: true,
      incomeitems: {
        "20%": "주식회사ㅇㅇ 4,000,000원",
        "40%": "ㅇㅇ투자상품 1,100,000원",
        "20%": "적금상품 800,000원"
      },
      expenditureitems: {
        "20%": "주식회사ㅇㅇ 4,000,000원",
        "40%": "ㅇㅇ투자상품 1,100,000원",
        "20%": "적금상품 800,000원"
      },
      range: ["", ""],
      options: {
        timePicker: false,
        // startDate: moment().startOf('day'),
        // endDate: moment().startOf('day'),
        locale: {
          format: "YYYY/MM/DD"
        }
      },
      asset: "1,000,000"
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    showIncomeGraph: function() {
      let options = {
        data: {
          type: "donut",
          columns: [
            ["Office", 20],
            ["Work", 30],
            ["School", 40],
            ["Water", 50]
          ],
          colors: ["#0080ff", "#03A6FF", "#1EC0FF", "#A3DAFF", "#d3e0f7"],
          // jason:[
          //   this.graphdataList
          // ],
          label: {
            color: "#ffffff",
            position: "start",
            format: function(v, id, i, j) {
              return v + "%";
            }
          },
          keys: {
            value: ["Man", "Woman"]
          },
          groups: [["Man", "Woman"]],
          names: {
            Man: "남자",
            Woman: "여자"
          }
        },
        legend: {
          //position:'right'
          show: false
        }
      };
      this.handler.$emit("init", options);
    },
    showExpenditureGraph: function() {
      let options = {
        data: {
          type: "donut",
          columns: [
            ["Office", 20],
            ["Work", 30],
            ["School", 40],
            ["Water", 50]
          ],
          colors: ["#0080ff", "#03A6FF", "#1EC0FF", "#A3DAFF", "#d3e0f7"],
          // jason:[
          //   this.graphdataList
          // ],
          label: {
            color: "#ffffff",
            position: "start",
            format: function(v, id, i, j) {
              return v + "%";
            }
          },
          keys: {
            value: ["Man", "Woman"]
          },
          groups: [["Man", "Woman"]],
          names: {
            Man: "남자",
            Woman: "여자"
          }
        },
        legend: {
          //position:'right'
          show: false
        }
      };
      this.ExpenditureHandler.$emit("init", options);
    },
    //개월수 탭했을때
    setTerm: function(value) {
      if (value == 1) {
        this.search_term = value;
        this.termfrom = moment(this.termto)
          .subtract(1, "month")
          .format("YYYY/MM/DD");
      } else if (value == 3) {
        this.search_term = value;
        this.termfrom = moment(this.termto)
          .subtract(3, "month")
          .format("YYYY/MM/DD");
      } else if (value == 6) {
        this.search_term = value;
        this.termfrom = moment(this.termto)
          .subtract(6, "month")
          .format("YYYY/MM/DD");
      } else if (value == 12) {
        this.search_term = value;
        this.termfrom = moment(this.termto)
          .subtract(12, "month")
          .format("YYYY/MM/DD");
      } else if (value == 99) {
        this.search_term = value;
        this.termfrom = moment(this.termto)
          .subtract(1, "month")
          .format("YYYY/MM/DD");
      }
    }
  },
  created() {
    //테스트데이터
    this.graphdataList = ["30%", "20%"];

    //기간표시 초기값
  
    this.termto = moment(new Date()).format("YYYY/MM/DD");
    this.termfrom = moment(this.termto)
      .subtract(1, "month")
      .format("YYYY/MM/DD");
  },
  mounted() {
    //그래프 값 변화시 표시
    this.showIncomeGraph();
    this.showExpenditureGraph();
  }
};
</script>
<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  /* overflow-x: auto; */
  display: flex;
  flex-direction: column;
  width: 35%;
  height: auto;
  position: fixed;
  top: 2%;
  left: 30%;
}

.modal-footer {
  padding: 5px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
  padding: 15px;
  display: list-item;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 1px 10px;
  /* overflow: scroll; */
  height: 50%;
  overflow: scroll;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
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
p {
  margin-top: 3%;
}

img#like {
    width: 15px;
    height:15px;
}
#available p {
  width: 100%;
  font-size: 21px;
  text-align: center;
  color: #fcaf17;
}
input#calendar {
  border-radius: 6px;
  margin-top: 11%;
}
.term {
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
label {
  font-size: 9px;
}
.toggle {
  width: 42%;
  text-align: right;
  float: left;
  margin-left: 11%;
}
.toggle span {
  font-size: 9px;
  font-weight: 100;
  margin-right: 2%;
}
.termfromto {
  width: 30%;
  border: none;
  margin-left: 2%;
}
.user_data {
  box-shadow: 0px 0px 0px 1px grey;
  width: -webkit-fill-available;
  
}
#btn {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  float: left;
  width: 15%;
}

button#btn2 {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  float: left;
  width: 50%;
  display: table-row;
}
#btn_group button {
  border: 1px solid #b9bec0;
  background-color: rgba(0, 0, 0, 0);
  color: rgb(74, 76, 77);
  padding: 5px;
  margin-bottom: 2%;
}
#btn:active,
#btn:visited,
#btn:hover {
  color: white;
  background-color: #fcaf17;
}

 #Piegraph {
  position: relative;
  float: left;
}

#graphdetails {
  width: 35%;
  float: left;
  font-size: 0.8em;
  margin-top: 2%;
}
#title {
  position: absolute;
  font-size: 1.5rem;
  top: 45%;
  left: 45%;
  width: 15%;
  float: left;
}

div#tag_group {
  float: left;
  font-size: large;
  width: 50%;
  margin-left: 15%;
}
textarea#write {
  width: 100%;
  height: 20%;
  font-size: larger;
  margin-bottom: 3%;
  
}

div#graph{
    padding: 5%;
}

p#user_id {
  font-size: large;
  font-weight: bolder;
  width: 5%;
}

.toggle {
  width: 28%;
  text-align: right;
  float: left;
}
.toggle span {
  font-size: 9px;
  font-weight: 100;
  margin-right: 2%;

}

.userdata {
  overflow: scroll;
}

.btn-success {
  width: 70%;
  height: 100%;
  margin-top: 5px;
  margin-right: 5px;
  font-size: large;
  font-weight: bold;
}

.btn-green {
  margin-right: 5%;
  height: 100%;
  margin-top: 5px;
  width: 20%;
  font-size: initial;
}

input#write_date {
    width: 30%;
    border: none;
    margin-left: 20%;
    float: right;
    text-align: end;
}

.feed-body{
    display: flex;
    margin-top: -10%;
    margin-bottom: -15px;
}

div#graphdetails{
    margin-top: -60%;
    margin-left: 50%;
}

.feed-footer{
    margin-top: 1%;
}

#feed-view {
     overflow: scroll;
}



#feed-comment{
    margin-left: 30%;
}

textarea#comment_form{
        width: 60%;
}

div#btn_group2{
    display: flex;
    margin-bottom: 10px;
    width: 100%;
}
</style>
