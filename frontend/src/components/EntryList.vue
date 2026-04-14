<template>
  <div class="entry-list-wrap">
    <div v-if="!entries || !entries.length" class="empty-state">
      <div class="empty-icon">&#128203;</div>
      <p class="empty-text">No entries found.</p>
      <p class="empty-hint">Try adjusting your search or add a new entry.</p>
    </div>

    <table v-else class="entries-table">
      <thead>
        <tr>
          <th>Issue Code</th>
          <th>Category</th>
          <th>Response</th>
          <th>Updated</th>
          <th class="th-actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry._id || entry.id">
          <td data-label="Issue Code">
            <span class="code-badge">{{ entry.issueCode }}</span>
          </td>
          <td data-label="Category">
            <span class="category-pill">{{ formatCategory(entry.category) }}</span>
          </td>
          <td data-label="Response" class="response-cell">{{ truncate(entry.responseText, 80) }}</td>
          <td data-label="Updated" class="date-cell">{{ formatDate(entry.updatedAt) }}</td>
          <td class="actions-cell">
            <router-link
              class="ui mini button action-view"
              :to="`/entries/${entry._id || entry.id}`"
            >View</router-link>
            <router-link
              class="ui mini button action-edit"
              :to="`/entries/${entry._id || entry.id}/edit`"
            >Edit</router-link>
            <button
              class="ui mini button action-delete"
              type="button"
              @click="$emit('delete', entry)"
            >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'EntryListComponent',
  props: {
    entries: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatCategory(category) {
      if (!category) {
        return 'General'
      }

      return category.charAt(0).toUpperCase() + category.slice(1)
    },
    formatDate(dateValue) {
      if (!dateValue) {
        return 'N/A'
      }

      const date = new Date(dateValue)
      if (Number.isNaN(date.getTime())) {
        return 'N/A'
      }

      return date.toLocaleDateString()
    },
    truncate(text, maxLength) {
      if (!text) {
        return ''
      }

      if (text.length <= maxLength) {
        return text
      }

      return text.substring(0, maxLength) + '...'
    }
  }
}
</script>

<style scoped src="../assets/styles/entry-list.css"></style>
