<template>
  <header class="nav-wrapper">
    <div class="nav-content">
      <router-link class="brand-block" to="/">
        <span class="brand-badge">HL</span>
        <div>
          <h1>Helpdesk Library</h1>
          <p>Knowledge base &amp; staff training platform</p>
        </div>
      </router-link>

      <nav class="nav-links">
        <router-link to="/" exact active-class="is-active">Home</router-link>
        <router-link to="/entries" active-class="is-active">Entries</router-link>
        <router-link to="/add" active-class="is-active">Add Entry</router-link>
        <router-link to="/quiz" active-class="is-active">Training Quiz</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-wrapper {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 16px 20px;
  background: rgba(248, 251, 255, 0.88);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(215, 225, 234, 0.8);
}

.nav-content {
  width: min(1120px, 100%);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: inherit;
}

.brand-badge {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #0f766e, #155e75);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 800;
  flex-shrink: 0;
}

.brand-block h1 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
}

.brand-block p {
  margin: 0;
  color: #64748b;
  font-size: 0.82rem;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.nav-links a {
  padding: 9px 16px;
  border-radius: 999px;
  color: #374151;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

.nav-links a:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.nav-links a.is-active {
  background: #0f172a;
  color: #ffffff;
}

@media (max-width: 768px) {
  .nav-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .nav-links {
    width: 100%;
  }
}
</style>
