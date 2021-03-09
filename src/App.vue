<template>
  <div class="page-wrapper">
    <Header />
    <SackList />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import SackList from './components/SackList.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    SackList,
    Footer
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
