<template>
  <div class="userdata">
    <div id="btn_group">
        <button id="btn" v-on:click=setTerm(1)>1개월</button>
        <button id="btn" v-on:click=setTerm(3)>3개월</button>
        <button id="btn" v-on:click=setTerm(6)>6개월</button>
        <button id="btn" v-on:click=setTerm(12)>12개월</button>
        <!-- <button  v-on:click=setTerm(99)>조건검색</button> -->
        <div id="search">
          <date-range-picker id="calendar" v-model="range" :options="options" placeholder/>
        </div>
        <!-- <v-range-selector :start-date.sync="range.start" :end-date.sync="range.end"/> -->
        <!-- <datepicker placeholder="조건검색"></datepicker> -->
    </div>
    <div id="termandonoff">
      <div class="term">
        <input class="termfromto" type="text" v-model="termfrom">
        ~
        <input class="termfromto" type="text" v-model="termto">
      </div>
      <div class="toggle">
        <span>상세금액 표기</span><toggle-button v-model="myDataVariable" color="#fcaf17"/>
      </div>
    </div>
    <div id="available">
      <p>예상 한달 가용 자산 : {{ asset }} 원</p>
    </div>
    <div id="graph">
      <div id="Piegraph">
        <vue-c3 :handler="handler"></vue-c3>
        <p id="title">수입</p>
      </div>
      <div id="graphdetails">
        <div v-for="(value, key) in incomeitems" v-bind:key="key">
          수입 {{ key }} : {{ value }}
        </div>
      </div>
    </div>
    <div id="graph">
      <div id="Piegraph">
        <vue-c3 :handler="ExpenditureHandler"></vue-c3>
        <p id="title">지출</p>
      </div>
      <div id="graphdetails">
        <div v-for="(value, key) in incomeitems" v-bind:key="key">
          수입 {{ key }} : {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueC3 from 'vue-c3'
import 'c3/c3.min.css'
import moment from 'moment'

export default {
  name: 'privatepage',
  components:{
    VueC3,
  },
  data () {
    return {
      msg: 'wwww',
      handler: new Vue(),
      ExpenditureHandler: new Vue(),
      graphdataList:[],
      search_term:"",
      termfrom:"",
      termto: "",
      myDataVariable:true,
      incomeitems: {
       '20%' : '주식회사ㅇㅇ 4,000,000원',
       '40%': 'ㅇㅇ투자상품 1,100,000원',
       '20%': '적금상품 800,000원',
      },
      expenditureitems: {
       '20%' : '주식회사ㅇㅇ 4,000,000원',
       '40%': 'ㅇㅇ투자상품 1,100,000원',
       '20%': '적금상품 800,000원',
      },
      range: ["", ""],
      options: {
        timePicker: false,
        // startDate: moment().startOf('day'),
        // endDate: moment().startOf('day'),
        locale: {
          format: 'YYYY/MM/DD'
        }
      },
      asset:"1,000,000"
    }
  },
  methods: {
    showIncomeGraph: function() {
      let options = {
        data:{
          type:'donut',
          columns: [
            ['Office', 20],
            ['Work', 30],
            ['School', 40],
            ['Water', 50]
          ],
          colors: ['#0080ff', '#03A6FF', '#1EC0FF', '#A3DAFF', '#d3e0f7'],
          // jason:[
          //   this.graphdataList
          // ],
          label:{
            color:'#ffffff',
            position: 'start',
            format: function(v, id, i, j){ return v + "%"},
          },
          keys: {
            value :['Man','Woman']
          },
          groups: [
            ['Man','Woman']
          ],
          names: {
            Man : "남자",
            Woman : "여자"
          }
        },
        legend:{
          //position:'right'
          show: false
        }
      }
      this.handler.$emit('init', options)
    },
    showExpenditureGraph: function() {
      let options = {
        data:{
          type:'donut',
          columns: [
            ['Office', 20],
            ['Work', 30],
            ['School', 40],
            ['Water', 50]
          ],
          colors: ['#0080ff', '#03A6FF', '#1EC0FF', '#A3DAFF', '#d3e0f7'],
          // jason:[
          //   this.graphdataList
          // ],
          label:{
            color:'#ffffff',
            position: 'start',
            format: function(v, id, i, j){ return v + "%"},
          },
          keys: {
            value :['Man','Woman']
          },
          groups: [
            ['Man','Woman']
          ],
          names: {
            Man : "남자",
            Woman : "여자"
          }
        },
        legend:{
          //position:'right'
          show: false
        }
      }
      this.ExpenditureHandler.$emit('init', options)
    },
    //개월수 탭했을때
    setTerm: function(value){
      if(value == 1)
      {
        this.search_term = value
        this.termfrom = moment(this.termto).subtract(1, 'month').format('YYYY/MM/DD')
      }
      else if(value == 3)
      {
        this.search_term = value
        this.termfrom = moment(this.termto).subtract(3, 'month').format('YYYY/MM/DD')
      } 
      else if(value == 6)
      {
        this.search_term = value
        this.termfrom = moment(this.termto).subtract(6, 'month').format('YYYY/MM/DD')
      }
      else if(value == 12)
      {
        this.search_term = value
        this.termfrom = moment(this.termto).subtract(12, 'month').format('YYYY/MM/DD')
      } 
      else if(value == 99)
      {
        this.search_term = value
        this.termfrom = moment(this.termto).subtract(1, 'month').format('YYYY/MM/DD')
      }
    }
  },
  created () {
    //테스트데이터
    this.graphdataList = ['30%','20%']
    
    //기간표시 초기값
    this.termto = moment(new Date).format('YYYY/MM/DD')
    this.termfrom = moment(this.termto).subtract(1, 'month').format('YYYY/MM/DD')
  },
  mounted () {
    //그래프 값 변화시 표시
    this.showIncomeGraph()
    this.showExpenditureGraph()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
#available p {
  width: 100%;
  font-size: 21px;
  color: #fcaf17;
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
  width: 42%;
  text-align: right;
  float: left;
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
}
#btn:active, #btn:visited, #btn:hover{
  color:white;
  background-color: #fcaf17;
}
#Piegraph{
  position: relative;
  width: 60%;
  float: left;
  margin-top: 2%;
}
#graphdetails {
  width: 31%;
  float: left;
  font-size: 0.8em;
  margin-top: 2%;
}
#title{
  position: absolute;
  font-size: 1rem;
  top: 42%;
  left: 42%;
  width: 15%;
  float: left;
}
</style>