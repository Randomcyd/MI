<template>
  <div id="app">
    <nav-header></nav-header>
        <main-content></main-content>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from './components/NavHeader.vue';
import MainContent from './components/MainContent.vue';
import NavFooter from './components/NavFooter.vue';
export default {
  components:{
    NavHeader,MainContent,NavFooter
  }
}
</script>

<style scoped>

</style>>

