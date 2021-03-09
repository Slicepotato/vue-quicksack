<template>
  <div class="page-wrapper">
    <Header />
    <UpNext />
    <SackList />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import UpNext from '@/components/UpNext.vue';
import SackList from '@/components/SackList.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    UpNext,
    SackList,
    Footer
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
