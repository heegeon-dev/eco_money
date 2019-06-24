<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button id="show-modal" @click="showModal = true">Show Modal</button>
    <app-my-modal v-if="showModal" @close="closeModal()">
    </app-my-modal>
  </div>
</template>

<script>
import myModal from '../Modal/Modal.vue'

export default {
  name: 'publicpage',
  components:{
    appMyModal: myModal
  },
  data () {
    return {
      msg: 'wwww',
      showModal:false,
    }
  },
  methods: {
    closeModal(){
      this.showModal = !this.showModal
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
</style>
