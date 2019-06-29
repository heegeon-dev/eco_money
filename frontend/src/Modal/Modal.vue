<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <p id="header_subject">게시글 쓰기 </p>
        <slot name="header">
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
          <div class="userdata">
            <div id="btn_group">
              <button id="btn" v-on:click="setTerm(1)">1개월</button>
              <button id="btn" v-on:click="setTerm(3)">3개월</button>
              <button id="btn" v-on:click="setTerm(6)">6개월</button>
              <button id="btn" v-on:click="setTerm(12)">12개월</button>
              <button v-on:click="setTerm(99)" style="margin-left: 15%;">조건검색</button>
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
      <section class="modal-body">
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

      <footer class="modal-footer">
     
        <slot name="footer">
         <form class="post_send" method="POST">
          <button type="submit" class="btn btn-success" >공유하기</button>
         </form>
          <button type="button" class="btn-green" @click="close">취소</button>
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
  width: 350px;
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

div#Piegraph {
  width: 30%;
  margin-inline-start: 30%;
}

input#write_date {
    width: 30%;
    border: none;
    margin-left: 20%;
    float: right;
    text-align: end;
}
p#header_subject{
  float: left;
    margin-top: -5px;
    margin-left: -5px;
    background-color: blanchedalmond;
    color: initial;
}
</style>
