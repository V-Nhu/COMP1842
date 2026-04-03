<template>
  <header class="nav-shell">
    <div class="nav-inner">
      <router-link class="brand-item" to="/">
        <span class="brand-badge">HRL</span>
        <span class="brand-copy">
          <strong>Helpdesk Response Library</strong>
          <small>Business support knowledge base and training tool</small>
        </span>
      </router-link>

      <nav class="nav-links" aria-label="Main navigation">
        <router-link class="nav-link" to="/" exact>Home</router-link>
        <router-link class="nav-link" to="/entries">Helpdesk Entries</router-link>
        <router-link class="nav-link" to="/entries/new">Add Entry</router-link>
        <router-link class="nav-link" to="/quiz">Training Quiz</router-link>
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
