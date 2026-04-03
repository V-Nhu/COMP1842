<template>
  <div class="ui container home-page">
    <section class="hero-section">
      <h1 class="hero-title">Helpdesk Response Library</h1>
      <p class="hero-subtitle">
        A business-focused support system for storing standard issue responses and training new
        staff.
      </p>
      <div class="cta-row">
        <router-link class="ui primary button cta-primary" to="/entries">View Helpdesk Entries</router-link>
        <router-link class="ui button cta-secondary" to="/quiz">Open Training Quiz</router-link>
      </div>
    </section>

    <section class="features-section">
      <h2 class="section-heading">Key Features</h2>
      <div class="feature-grid">
        <article class="feature-card">
          <div class="feature-icon">KB</div>
          <h3>Knowledge Base</h3>
          <p>
            Store approved responses for common support issues such as password resets, billing
            questions, and technical faults.
          </p>
        </article>

        <article class="feature-card">
          <div class="feature-icon">SM</div>
          <h3>Search &amp; Manage</h3>
          <p>
            Create, view, update, and delete helpdesk entries, then search by issue code or filter
            by category.
          </p>
        </article>

        <article class="feature-card">
          <div class="feature-icon">ST</div>
          <h3>Staff Training</h3>
          <p>
            New support staff can practise matching issue codes with the correct response through
            interactive quizzes.
          </p>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped src="../assets/styles/home.css"></style>
