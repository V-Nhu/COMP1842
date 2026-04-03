<template>
  <div id="app" class="app-shell">
    <Navbar />

    <div class="page-shell">
      <flash-message class="flash-global"></flash-message>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style scoped src="./assets/styles/app.css"></style>