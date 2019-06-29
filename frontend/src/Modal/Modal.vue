<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <p id="header_subject">게시글 쓰기</p>
        <!-- <slot name="header"> -->
        <div id="user_data">
          <img id="user_img" src="../assets/3.png">

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
        <textarea
          id="write"
          style="width:95%; heigth:80%"
          placeholder="목표금액 달성을 자랑하거나, 대출상품을 문의 하는 등 다양한 게시글을 #해쉬태그와 함께 남겨보세요."
        ></textarea>
        <div class="userdata" v-on:scroll="scrollInfinite($event)">
          <div id="btn_group">
            <button id="amonth" v-on:click="setTerm(1)">1개월</button>
            <button id="btn" v-on:click="setTerm(3)">3개월</button>
            <button id="btn" v-on:click="setTerm(6)">6개월</button>
            <button id="btn" v-on:click="setTerm(12)">12개월</button>
            <button id="btn" v-on:click="setTerm(99)">조건검색</button>
          </div>
          <div class="datepicker" v-if="showDatePicker">
            <div class="datepicker-group">
              <datepicker
                v-model="termfrom"
                :format="setDateFormat"
                :language="ko"
                placeholder="시작일"
              ></datepicker>
            </div>
            <div class="fromto">~</div>
            <div class="datepicker-group">
              <datepicker v-model="termto" :format="setDateFormat" :language="ko" placeholder="종료일"></datepicker>
            </div>
            <div class="datepicker-group-btn">
              <button
                type="button"
                class="btn btn-default btn-sm btn-login btn-info"
                @click="execSearch()"
              >검색</button>
            </div>
          </div>
          <div id="termandonoff">
            <div class="term" v-if="!showDatePicker">
              <input class="termfromto" type="text" v-model="termfrom">
              ~
              <input class="termfromto" type="text" v-model="termto">
            </div>
            <div class="toggle">
              <span>상세금액 표기</span>
              <toggle-button v-model="myDataVariable" color="#fcaf17"/>
            </div>
          </div>
          <!-- <div id="available">
            <p>예상 한달 가용 자산 : {{ asset }} 원</p>
          </div>-->
        </div>
        <!-- </slot> -->
      </header>
      <section class="modal-body">
        <div id="graph">
          <div id="Piegraph">
            <vue-c3 :handler="handler"></vue-c3>
            <p id="title">수입</p>
          </div>
          <div id="graphdetails">
            <div v-for="(value) in incomeName" v-bind:key="value" id="incomedetails">
              <p>{{ value }}</p>
            </div>
            <div v-for="(value) in incomeAmount" v-bind:key="value" id="incomeamnt">
              <p>수입{{ value }}</p>
              <div v-for="(value) in expenditureName" v-bind:key="value" id="incomedetails">
                <p>{{ value }}</p>
              </div>
              <div v-for="(value) in expenditureAmount" v-bind:key="value" id="incomeamnt">
                <p>지출 {{ value }}</p>
              </div>
              <p>예상 한달 가용 자산 : {{ asset }} 원</p>
            </div>
          </div>
        </div>
        <div id="graph">
          <div id="Piegraph" style="margin-top: -250px;">
            <vue-c3 :handler="ExpenditureHandler"></vue-c3>
            <p id="title">지출</p>
          </div>
          <!-- <div id="graphdetails">
            <div v-for="(value, key) in incomeitems" v-bind:key="key">
              
            </div>
          </div>-->
        </div>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <form class="post_send" method="POST">
            <button type="submit" class="btn btn-success">공유하기</button>
          </form>
          <button type="button" class="btn btn-green" @click="close">취소</button>
        </slot>
      </footer>
    </div>
  </div>
</template>
<script>
// 프라이빗 따옴
import Vue from "vue";
import VueC3 from "vue-c3";
import "c3/c3.min.css";
import moment from "moment";
import Datepicker from "vuejs-datepicker";
import { ko } from "vuejs-datepicker/dist/locale";
import axios from "axios";
import FeedViewVue from "../components/FeedView.vue";

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
      showDatePicker: false,
      myDataVariable: true,
      incomeTotal: "",
      incomeName: [],
      incomeAmount: [],
      expenditureTotal: "",
      expenditureName: [],
      expenditureAmount: [],
      incomeitems: [],
      expenditureitems: [],

      options: {
        timePicker: false,
        // startDate: moment().startOf('day'),
        // endDate: moment().startOf('day'),
        locale: {
          format: "YYYY-MM-DD"
        }
      },

      responseList: [],
      asset: "1,000,000",
      ko: ko,
      userId: "",
      tabflag: 1,
      incomedataList: [],
      expenditureList: []
    };
  },
  methods: {
    // 입력받은
    sendPost() {
      this.target(FeedViewVue);
    },
    close() {
      this.$emit("close");
    },
    showIncomeGraph: function() {
      var keylist = [];

      for (var i = 0; i < Object.keys(this.incomeAmount).length; i++) {
        this.incomedataList[i] = [this.incomeName[i], this.incomeAmount[i]];
        keylist.push(this.incomeName[i]);
      }

      let options = {
        data: {
          type: "donut",
          colors: {
          pattern: ["#0080ff", "#03A6FF", "#1EC0FF", "#A3DAFF", "#d3e0f7"]
          },
          columns: this.incomedataList,

          label: {
            color: "#ffffff",
            position: "start",
            format: function(v, id, i, j) {
              return v + "%";
            }
          },
          keys: {
            value: keylist
          }
        },
        legend: {
          show: false
        }
      };
      this.handler.$emit("init", options);
    },
    showExpenditureGraph: function() {
      var keylist = [];

      for (var i = 0; i < Object.keys(this.expenditureAmount).length; i++) {
        this.expenditureList[i] = [
          this.expenditureName[i],
          this.expenditureAmount[i]
        ];
        keylist.push(this.expenditureName[i]);
      }

      let options = {
        data: {
          type: "donut",
          columns: this.expenditureList,
          colors: {
            pattern: ["#0080ff", "#03A6FF", "#1EC0FF", "#A3DAFF", "#d3e0f7"]
          },
          label: {
            color: "#ffffff",
            position: "start",
            format: function(v, id, i, j) {
              return v + "%";
            }
          },
          keys: {
            value: keylist
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
          .format("YYYY-MM-DD");
        this.showDatePicker = false;
        if (this.tabflag == 0) {
          document
            .getElementById("amonth")
            .setAttribute("style", "color:#fff;background-color:#fcaf17");
          this.GetUserMonthData();
        }
        // console.log("setTerm1.termfrom",this.termfrom)
        // console.log("setTerm1.termto",this.termto)
      } else if (value == 3) {
        this.search_term = value;
        this.termfrom = moment(this.termto)
          .subtract(3, "month")
          .format("YYYY-MM-DD");
        this.showDatePicker = false;
        this.tabflag = 0;
        document
          .getElementById("amonth")
          .setAttribute("style", "color:#000;background-color:#fff");
        // console.log("setTerm2.termfrom",this.termfrom)
        // console.log("setTerm2.termto",this.termto)
        this.GetUserMonthData();
      } else if (value == 6) {
        this.search_term = value;
        this.termfrom = moment(this.termto)
          .subtract(6, "month")
          .format("YYYY-MM-DD");
        this.showDatePicker = false;
        this.tabflag = 0;
        document
          .getElementById("amonth")
          .setAttribute("style", "color:#000;background-color:#fff");
        // console.log("setTerm3.termfrom",this.termfrom)
        // console.log("setTerm3.termto",this.termto)
        this.GetUserMonthData();
      } else if (value == 12) {
        this.search_term = value;
        this.termfrom = moment(this.termto)
          .subtract(12, "month")
          .format("YYYY-MM-DD");
        this.showDatePicker = false;
        this.tabflag = 0;
        document
          .getElementById("amonth")
          .setAttribute("style", "color:#000;background-color:#fff");
        // console.log("setTerm4.termfrom",this.termfrom)
        // console.log("setTerm4.termto",this.termto)
        this.GetUserMonthData();
      } else if (value == 99) {
        this.search_term = value;
        this.showDatePicker = true;
        this.tabflag = 0;
        document
          .getElementById("amonth")
          .setAttribute("style", "color:#000;background-color:#fff");
      }
    },
    setDateFormat(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    execSearch: function() {
      this.termto = moment(this.termto).format("YYYY-MM-DD");
      this.termfrom = moment(this.termfrom).format("YYYY-MM-DD");
      // console.log("setTerm5.termfrom",this.termfrom)
      // console.log("setTerm5.termto",this.termto)
      this.GetUserMonthData();
    },
    GetUserMonthData: function() {
      // var termto = moment(this.termto).format('YYYYMMDD')
      // var termfrom = moment(this.termfrom).format('YYYYMMDD')
      // console.log("this.termfrom",this.termfrom)
      // console.log("this.termto",this.termto)
      axios
        .post(
          `http://192.168.160.50:3000/main`,

          {
            //파라미터
            params: {
              uid: this.userId,
              fromdate: this.termfrom,
              todate: this.termto
            }
          }
        )
        .then(
          response => {},
          error => {
            console.log(error);
            this.responseList = JSON.parse(response.data);
            this.incomeitems = this.responseList[0];
            this.expenditureitems = this.responseList.spending;

            console.log("incomeitems", this.incomeitems);
            // console.log("this.incomeitems",this.incomeitems[1])
            // console.log("this.expenditureitems",this.expenditureitems)
            //수입내역
            this.incomeTotal = this.responseList[0][0];
            this.incomeName = this.responseList[0][1];
            this.incomeAmount = this.responseList[0][2];
            //지출내역
            this.expenditureTotal = this.responseList[1][0];
            this.expenditureName = this.responseList[1][1];
            this.expenditureAmount = this.responseList[1][2];

            console.log("incomeTotal", this.incomeTotal);
            console.log("incomeName", this.incomeName);
            console.log("GetUserMonthData_incomeAmount", this.incomeAmount);
            console.log("왔나??");
            this.showIncomeGraph();
            this.showExpenditureGraph();
          },
          error => {
            console.log(error);
          }
        );
    },
    scrollInfinite: function(e) {
      // console.log("스크롤되고있다");
      var scrollBody = e.target.scrollingElement;
      var clientHeight = Math.floor(scrollBody.clientHeight);
      var scroll_body = Math.floor(scrollBody.scrollHeight) - clientHeight;
      var scroll_top = Math.floor(scrollBody.scrollTop);
      var percent_of_scroll = Math.floor((scroll_top / scroll_body) * 100);

      if (this.$route.path == "/MainContent") {
        if (percent_of_scroll >= 98) {
          var self = this;
          setTimeout(function() {
            self.GetUserPastData();
          }, 300);
        }
      }
    },
    GetUserPastData: function() {
      // console.log("스크롤 감지후 호출됨");
    }
  },

  created() {
    //테스트데이터
    this.userId = this.$store.getters["auth/uId"];

    this.graphdataList = ["30%", "20%"];

    //기간표시 초기값
    this.setTerm(1);
    this.termto = moment(new Date()).format("YYYY-MM-DD");
    this.termfrom = moment(this.termto)
      .subtract(1, "month")
      .format("YYYY-MM-DD");
    //this.showIncomeGraph();
    this.GetUserMonthData();
  },
  mounted() {
    //그래프 값 변화시 표시
    // this.GetUserMonthData();
    window.addEventListener("scroll", this.scrollInfinite);

    //초기 탭 클릭표시
    if (this.tabflag == 1) {
      document
        .getElementById("amonth")
        .setAttribute("style", "color:#fff;background-color:#fcaf17");
    }
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

div#tag_group {
  float: left;
  font-size: 15px;
  width: 50%;
  margin-left: 23%;
}
textarea#write {
  width: 100%;
  height: 20%;
  font-size: larger;
  margin-bottom: 3%;
}

p#user_id {
  font-size: large;
  font-weight: bolder;
  width: 5%;
}

.userdata {
  overflow: scroll;
}

.btn-success {
  width: 350px;
  height: 100%;
  margin-top: 5px;
  margin-right: 5px;
  font-size: large;
  font-weight: bold;
  background-color: #7c7363;
  border-color: #7c7363;
}

.btn-green {
  margin-right: 5%;
  height: 100%;
  margin-top: 5px;
  width: 20%;
  font-size: initial;
  font-weight: bold;
  color: white;
  background-color: #4e473f;
  border-color: #4e473f;
}

input#write_date {
  width: 30%;
  border: none;
  margin-left: 20%;
  float: right;
  text-align: end;
}
p#header_subject {
  float: left;
  margin-top: -5px;
  margin-left: -5px;
  background-color: blanchedalmond;
  color: initial;
}

/* 프라이빗과 통일 */
#incomedetails {
    width: 50%;
    float: left;
    /*right: 5%; 
    padding-right: 65%;*/
}
#incomeamnt {
    width: 50%;
    float: left;
    /*right: 5%; 
    padding-left: 30%;*/
}
.vdp-datepicker {
  text-align: center;
  width: 39%;
  float: left;
}
.datepicker-group {
  width: 25%;
  float: left;
  text-align: center;
  padding-left: 1%;
}
.datepicker-group-btn {
  width: 10%;
  float: left;
  padding-left: 4px;
}
.fromto {
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
  width: auto;
  text-align: right;
  float: left;
  position: initial;
  margin-left: 18%;
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
}
#amonth {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-right: -4px;
  float: left;
  width: 15%;
}
#btn {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-right: -4px;
  float: left;
  width: 15%;
}
#btn_group button {
  border: 1px solid #b9bec0;
  background-color: rgba(0, 0, 0, 0);
  color: rgb(74, 76, 77);
  padding: 5px;
  margin-bottom: 2%;
  margin-right: 1px;
  width: 19.5%;
}
#amonth:active,
#amonth:focus,
#amonth:hover #amonth:visited {
  color: white;
  background-color: #fcaf17;
}
#btn:active,
#btn:focus,
#btn:hover #btn:visited {
  color: white;
  background-color: #fcaf17;
}
#graph {
  width: 100%;
}
#Piegraph {
  position: relative;
  width: 30%;
  height: 300px;
  float: left;
  margin-top: -15%;
  margin-left: 5%;
}
#graphdetails {
  width: 50%;
  height: 350px;
  float: left;
  font-size: 0.8em;
  margin-top: 2%;
  border-style: outset;
  margin-left: 15%;
}
#title {
  position: absolute;
  font-size: 1.5rem;
  top: 45%;
  left: 45%;
  width: 15%;
  float: left;
}
</style>
