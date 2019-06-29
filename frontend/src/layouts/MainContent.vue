<template>

  <table>
    <!-- <MainNav /> -->
    <MainSidebar />
    <!-- <MainSidebar :keyword="searchtext" :activetabVal="activetabVal"/> -->
    <!-- <main-footer /> -->
  </table>
</template>

<script>

// Main layout components
// import MainNav from '@/components/layout/MainNav/MainNav.vue';
import MainSidebar from '@/components/layout/MainSidebar/MainSidebar.vue'
// import MainFooter from '@/components/layout/MainFooter/MainFooter.vue';
// import PrivatePage from '@/components/PrivatePage.vue';
// import PublicPage from '@/components/PublicPage.vue';

export default {
  name: 'maincontent-layout',
  components: {
    // MainNav,
    MainSidebar,
    // MainFooter,
    // PrivatePage,
    // PublicPage,
  },
  data() {
    return {
      searchtext:""
    };
  },
  methods: {
  },
  created(){
    // console.log("this.$route.query.keyword",this.$route.query.keyword)
    // if(!this.$route.query.keyword){
    //   this.searchtext = this.$route.query.keyword
    //   this.activetabVal = 2
    // }
  }
};
</script>

<style>
body {background-color:#fffbf2}
</style>
