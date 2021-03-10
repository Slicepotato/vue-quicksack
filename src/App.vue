<template>
  <div class="page-wrapper">
    <Header />
    <UpNext />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import UpNext from '@/components/UpNext.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    UpNext,
    Footer,
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
