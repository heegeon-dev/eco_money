<template>
  <div class="pub_view">
    <div class="pub_write">
      <div id="write">
      <header class="write-header" id="show-modal" @click="showModal=true">
        <slot name="header">
          <header id="write_tag">게시물 작성하기</header>
           <div class="grid">
            <div class="grid_item" id="user_data">
             <figure>
              <img id="user_img" src="../assets/3.png"/>
              <figcaption id="user_id">UserName</figcaption>
             </figure>
            </div>
            <div class="grid_item" style="width:64%;">
              <textarea id="write" style="width:90%; margin-top:5%;"
                placeholder="목표금액 달성을 자랑하거나, 대출상품을 문의 하는 등 다양한 게시글을 남겨보세요." >
              </textarea>  
            </div>
            <div class="grid_item">
              <button type="submit" class="btn btn-success" style="margin-top:50%">공유하기</button>
            </div>
           </div>
        </slot>
      </header>
      <appMyModal v-if="showModal" @close="closeModal()">
      </appMyModal>
      </div>
      <div id="write_body">
      <section class="write-body">
        <slot name="body">
          <!-- 포스트 올라오는 필드 -->
        </slot>
       </section>
      </div>
       <footer class="write-footer">
        <slot name="footer">
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
import myModal from '../Modal/Modal.vue'
import {
  mapMutations, mapState
} from 'vuex'

export default {
  name: 'publicpage',
  components:{
    appMyModal: myModal
  },
  data () {
    return {
      showModal:false,
      search_text:"none"
    }
  },
  methods: {
    closeModal(){
      this.showModal = !this.showModal
    } 
  },
  created(){
    console.log("this.$store.getters['auth/searchText'] ",this.$store.getters['auth/searchText'])
    if(this.search_text !== "none"){
       //검색시 키워드 파라미터로 전송하기
      this.search_text = this.$store.getters['auth/searchText']
    } else {
      this.$store.commit('auth/setSearchText', "")
    }
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

.grid {
        width: 500px;
        margin: 0 auto;
        overflow: hidden; 
        display: inline-block;
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

img#user_img{
  width: 50px;

}

div#user_data{
  width: 50px;
  margin-top: 1%;
  margin-left: 2%;
}

textarea#write{
  border: none;
}

header#show-modal{
  width: 100%;
}
</style>