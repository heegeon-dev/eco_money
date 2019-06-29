<template>
  <div class="userdata">
    <div id="btn_group">
        <button id="btn" name="btn" v-on:click=setTerm(1)>1개월</button>
        <button id="btn" v-on:click=setTerm(3)>3개월</button>
        <button id="btn" v-on:click=setTerm(6)>6개월</button>
        <button id="btn" v-on:click=setTerm(12)>12개월</button>
        <button id="btn" v-on:click=setTerm(99)>조건검색</button>
    </div>
    <div class="datepicker" v-if=showDatePicker>
      <div class="datepicker-group">
        <datepicker v-model="termfrom" :format="setDateFormat" :language="ko" placeholder="시작일"></datepicker>
      </div>
      <div class="fromto">
        ~
      </div>
      <div class="datepicker-group">
        <datepicker v-model="termto" :format="setDateFormat" :language="ko" placeholder="종료일"></datepicker>
      </div>
      <div class="datepicker-group-btn">
        <button type="button" class="btn btn-default btn-sm btn-login btn-info" @click="execSearch()">검색</button>
      </div>
    </div>
    <div id="termandonoff">
      <div class="term" v-if=!showDatePicker>
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
import Datepicker from 'vuejs-datepicker'
import {ko} from 'vuejs-datepicker/dist/locale'
import axios from 'axios'

export default {
  name: 'privatepage',
  components:{
    VueC3,
    'datepicker': Datepicker,
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
      showDatePicker:false,
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
      options: {
        timePicker: false,
        // startDate: moment().startOf('day'),
        // endDate: moment().startOf('day'),
        locale: {
          format: 'YYYY/MM/DD'
        }
      },
      asset:"1,000,000",
      ko:ko
    }
  },
  methods: {
    showIncomeGraph: function() {
      //Jsondata 이름이랑 %출력
      // var dataList = []
      // for(var i =0; i < Object.keys(this.incomeitems).length; i++){
      //   var rowData = []
      //   rowData['income_amt'] = this.incomeitems[i].income_amt
      //   rowData['income_keyword'] = this.incomeitems[i].income_keyword
      //   dataList.push(rowData)
      // }

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
          // json: dataList,
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
          //   this.expenditureitems
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
        this.showDatePicker = false
      }
      else if(value == 3)
      {
        this.search_term = value
        this.termfrom = moment(this.termto).subtract(3, 'month').format('YYYY/MM/DD')
        this.showDatePicker = false
      } 
      else if(value == 6)
      {
        this.search_term = value
        this.termfrom = moment(this.termto).subtract(6, 'month').format('YYYY/MM/DD')
        this.showDatePicker = false
      }
      else if(value == 12)
      {
        this.search_term = value
        this.termfrom = moment(this.termto).subtract(12, 'month').format('YYYY/MM/DD')
        this.showDatePicker = false
      } 
      else if(value == 99)
      {
        this.search_term = value
        this.showDatePicker = true
      }
    },
    setDateFormat(date){
      return moment(date).format('YYYY/MM/DD')
    },
    execSearch: function(){
      this.termto = moment(this.termto).format('YYYY/MM/DD')
      this.termfrom = moment(this.termfrom).format('YYYY/MM/DD')
    },
    GetUserMonthData: function(){
      // var termto = moment(this.termto).format('YYYYMMDD')
      // var termfrom = moment(this.termfrom).format('YYYYMMDD')
        axios.get(`http://192.168.160.50:3000/main`, 
        { 
          //파라미터추가
          // fromdate: termfrom,
          // todate: termto,
        }).then(
            (response) => { 
              console.log(response)
              // this.incomeitems = response.data.income
              // this.expenditureitems = response.data.spending
            },
            (error) => { console.log(error) }
        )
    }
  },
  created () {
    //테스트데이터
    this.graphdataList = ['30%','20%']

    //기간표시 초기값
    this.setTerm(1)
    this.termto = moment(new Date).format('YYYY/MM/DD')
    this.termfrom = moment(this.termto).subtract(1, 'month').format('YYYY/MM/DD')
    //데이터 호출
    
  },
  mounted () {
    //그래프 값 변화시 표시
    this.showIncomeGraph()
    this.showExpenditureGraph()

    this.GetUserMonthData()
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
  width: 100%;
  font-size: 21px;
  text-align: center;
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
  width: 28%;
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
#btn:active, #btn:focus, #btn:hover #btn:visited{
  color:white;
  background-color: #fcaf17;
}
#Piegraph{
  position: relative;
  width: 52%;
  float: left;
  margin-top: 2%;
}
#graphdetails {
  width: 35%;
  float: left;
  font-size: 0.8em;
  margin-top: 2%;
}
#title{
  position: absolute;
  font-size: 1.5rem;
  top: 45%;
  left: 45%;
  width: 15%;
  float: left;
}
</style>