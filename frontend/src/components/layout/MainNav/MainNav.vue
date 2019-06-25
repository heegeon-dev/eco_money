<template>
  <header class="main-header">
    <div class='green_window'>
	    <input type='text' class='input_text' placeholder="검색할 키워드를 입력하세요" />
        <img type='submit' src="../../../assets/search.svg" class='sch_smit'>
    </div>
    <p><u>#자동차대출</u></p>
    <p><u>#적금상품</u></p>
    <p><u>#펀드상품</u></p>
    <button v-on:click="showList">더보기</button>
    <img src = "../../../assets/bell.svg">
    <img src = "../../../assets/icon.svg">
  </header>
</template>

<script>
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
      searchItem:[]
    }
  },
  methods: {
    showList: function () {
    },
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
    margin-left: 25%;
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
img {
    width: 2%;
    display: inline-block;
    vertical-align: top;
    margin-top: 1%;
    margin-left: 1%;
}
p{
    display: inline-block;
    width: 6%;
    font-size: 12px;
    margin-left: 1%;
    vertical-align: top;
    margin-top: 1%;
}
button{
    vertical-align: top;
    margin-top: 1%;
    margin-left: 1%;
}

</style>
