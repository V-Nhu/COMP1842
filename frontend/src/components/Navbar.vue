<template>
  <header class="nav-shell">
    <div class="nav-inner">
      <router-link class="brand-item" to="/">
        <span class="brand-badge">AB</span>
        <span class="brand-copy">
          <strong>AssistBase</strong>
          <small>Centralized knowledge for consistent support delivery</small>
        </span>
      </router-link>

      <nav class="nav-links" aria-label="Main navigation">
        <router-link class="nav-link" to="/" exact>Home</router-link>
        <router-link class="nav-link" to="/entries" exact>Knowledge Base</router-link>
        <router-link class="nav-link" to="/entries/new">New Entry</router-link>
        <router-link class="nav-link" to="/quiz">Learning Hub</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavbarComponent'
}
</script>

<style scoped src="../assets/styles/navbar.css"></style>
