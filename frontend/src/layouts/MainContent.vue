<template>

  <table>
    <MainNav />
    <MainSidebar/>
    <!-- <main-footer /> -->
  </table>
</template>

<script>

// Main layout components
import MainNav from '@/components/layout/MainNav/MainNav.vue';
import MainSidebar from '@/components/layout/MainSidebar/MainSidebar.vue';
import MainFooter from '@/components/layout/MainFooter/MainFooter.vue';
import PrivatePage from '@/components/PrivatePage.vue';
import PublicPage from '@/components/PublicPage.vue';

export default {
  name: 'maincontent-layout',
  components: {
    MainNav,
    MainSidebar,
    MainFooter,
    PrivatePage,
    PublicPage,
  },
  data() {
    return {
      activetab: 1,
    };
  },
  methods: {
    ChangeTab: function (index) {
      if(index == 1){
        this.activetab = 1
        console.log("activetab=1")
      } else if(index == 2){
        this.activetab = 2
        console.log("activetab=2")
      }
    }
  }
};
</script>

<style>
</style>
