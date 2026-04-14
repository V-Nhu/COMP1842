<template>
  <div class="ui container view-page">
    <div class="view-card">
      <div class="view-header">
        <div class="view-header-icon">
          <i class="eye icon"></i>
        </div>
        <div>
          <h2 class="page-title">Entry Details</h2>
          <p class="page-subtitle">Full information for this knowledge base entry.</p>
        </div>
      </div>

      <div class="view-divider"></div>

      <div v-if="isLoading" class="view-loader">
        <div class="ui active inline centered loader"></div>
        <p class="loader-text">Loading entry...</p>
      </div>

      <div v-else-if="entry" class="view-body">
        <div class="detail-row">
          <span class="detail-label">Issue Code</span>
          <span class="code-badge">{{ entry.issueCode }}</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">Category</span>
          <span class="category-pill">{{ formatCategory(entry.category) }}</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">Created</span>
          <span class="detail-value">{{ formatDate(entry.createdAt) }}</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">Last Updated</span>
          <span class="detail-value">{{ formatDate(entry.updatedAt) }}</span>
        </div>

        <div class="detail-block">
          <span class="detail-label">Response</span>
          <div class="response-box">{{ entry.responseText }}</div>
        </div>
      </div>

      <div class="view-divider"></div>

      <div class="view-actions">
        <router-link class="ui button" to="/entries">
          <i class="arrow left icon"></i> Back to List
        </router-link>
        <router-link
          class="ui primary button"
          :to="`/entries/${id}/edit`"
        >
          <i class="pencil icon"></i> Edit Entry
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getEntry } from '../helpers/entryService'

export default {
  name: 'ViewEntryView',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      entry: null,
      isLoading: false
    }
  },
  created() {
    this.loadEntry()
  },
  methods: {
    async loadEntry() {
      this.isLoading = true
      try {
        const { data } = await getEntry(this.id)
        this.entry = data
      } catch (err) {
        this.flashMessage.error({ message: 'Failed to load entry.', time: 3500 })
      } finally {
        this.isLoading = false
      }
    },
    formatCategory(category) {
      if (!category) return 'General'
      return category.charAt(0).toUpperCase() + category.slice(1)
    },
    formatDate(dateValue) {
      if (!dateValue) return 'N/A'
      const date = new Date(dateValue)
      if (Number.isNaN(date.getTime())) return 'N/A'
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }
  }
}
</script>

<style scoped src="../assets/styles/view-entry.css"></style>
