<template>
  <div class="ui container home-page">
    <!-- Hero Banner -->
    <section class="hero-section">
      <div class="hero-badge">AssistBase</div>
      <h1 class="hero-title">Smarter Knowledge for<br>Better Support</h1>
      <p class="hero-subtitle">
        Organize support content, manage standardized responses, and prepare staff with structured learning in one platform.
      </p>
      <div class="cta-row">
        <router-link class="ui primary button cta-primary" to="/entries">
          <i class="list icon"></i> Browse Entries
        </router-link>
        <router-link class="ui button cta-secondary" to="/entries/new">
          <i class="plus icon"></i> Add New Entry
        </router-link>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stat-card">
        <div class="stat-icon stat-icon--entries">
          <i class="database icon"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ entriesCount }}</span>
          <span class="stat-label">Total Entries</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-icon--categories">
          <i class="tags icon"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ categoriesCount }}</span>
          <span class="stat-label">Categories</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-icon--quiz">
          <i class="graduation cap icon"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">5</span>
          <span class="stat-label">Quiz Questions</span>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { getEntries } from '../helpers/entryService'

export default {
  name: 'HomeView',
  data() {
    return {
      entriesCount: 0,
      categoriesCount: 0
    }
  },
  created() {
    this.loadStats()
  },
  methods: {
    async loadStats() {
      try {
        const { data } = await getEntries()
        const entries = Array.isArray(data) ? data : []
        this.entriesCount = entries.length
        const cats = new Set(entries.map(e => e.category).filter(Boolean))
        this.categoriesCount = cats.size
      } catch (err) {
        this.entriesCount = 0
        this.categoriesCount = 0
      }
    }
  }
}
</script>

<style scoped src="../assets/styles/home.css"></style>
