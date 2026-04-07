<template>
  <div class="ui container entries-page">
    <section class="entries-panel">
      <div class="entries-header">
        <div class="entries-header-text">
          <h2 class="section-title">
            <i class="clipboard list icon title-icon"></i>
            Knowledge Base
          </h2>
          <p class="section-subtitle">
            Browse support knowledge, search by issue code, or filter entries by category.
          </p>
        </div>
        <router-link class="ui primary button add-btn" to="/entries/new">
          <i class="plus icon"></i> Add New Entry
        </router-link>
      </div>

      <div class="toolbar-card">
        <form class="filter-row" @submit.prevent="applyFilter">
          <div class="filter-group">
            <i class="search icon filter-icon"></i>
            <input
              v-model.trim="searchCode"
              type="text"
              class="filter-input"
              placeholder="Search by issue code..."
            >
          </div>
          <div class="filter-group">
            <i class="filter icon filter-icon"></i>
            <select v-model="selectedCategory" class="filter-select">
              <option value="">All Categories</option>
              <option v-for="option in categoryOptions" :key="option" :value="option">
                {{ formatCategory(option) }}
              </option>
            </select>
          </div>
          <button type="submit" class="ui primary button apply-btn">Search</button>
          <button type="button" class="ui button reset-btn" @click="loadAllEntries">Reset</button>
        </form>
      </div>

      <div class="entries-meta">
        <span class="entries-count">
          <i class="database icon"></i>
          {{ entries.length }} {{ entries.length === 1 ? 'entry' : 'entries' }} found
        </span>
      </div>

      <div v-if="isLoading" class="loader-wrap">
        <div class="ui active inline centered loader"></div>
        <p class="loader-text">Loading entries...</p>
      </div>

      <div class="list-wrap" v-else>
        <EntryList :entries="entries" @delete="handleDelete" />
      </div>
    </section>
  </div>
</template>

<script>
import EntryList from '../components/EntryList.vue'
import { deleteEntry, getEntries } from '../helpers/entryService'

export default {
  name: 'EntriesView',
  components: {
    EntryList
  },
  data() {
    return {
      allEntries: [],
      entries: [],
      searchCode: '',
      selectedCategory: '',
      isLoading: false
    }
  },
  computed: {
    categoryOptions() {
      const fromData = this.allEntries.map(entry => entry.category).filter(Boolean)
      return Array.from(new Set(fromData)).sort((a, b) => a.localeCompare(b))
    }
  },
  created() {
    this.showPendingFlashMessage()
    this.loadEntries()
  },
  methods: {
    showPendingFlashMessage() {
      const rawMessage = window.sessionStorage.getItem('entriesFlashMessage')

      if (!rawMessage) {
        return
      }

      window.sessionStorage.removeItem('entriesFlashMessage')

      try {
        const flash = JSON.parse(rawMessage)
        const flashType = flash?.type
        const flashMessage = flash?.message
        const flashTime = flash?.time || 2500

        if (flashType && flashMessage && this.flashMessage?.[flashType]) {
          this.flashMessage[flashType]({ message: flashMessage, time: flashTime })
        }
      } catch (err) {
        window.sessionStorage.removeItem('entriesFlashMessage')
      }
    },
    async loadEntries() {
      this.isLoading = true
      try {
        const { data } = await getEntries()
        this.allEntries = Array.isArray(data) ? data : []
        this.entries = [...this.allEntries]
      } catch (err) {
        this.allEntries = []
        this.entries = []
        this.flashMessage.error({
          message: 'Failed to load entries. Please check your backend server.',
          time: 3500
        })
      } finally {
        this.isLoading = false
      }
    },
    applyFilter() {
      const code = this.searchCode.toLowerCase()
      const category = this.selectedCategory.toLowerCase()

      this.entries = this.allEntries.filter((entry) => {
        const byCode = !code || (entry.issueCode || '').toLowerCase().includes(code)
        const byCategory = !category || (entry.category || '').toLowerCase() === category
        return byCode && byCategory
      })
    },
    loadAllEntries() {
      this.searchCode = ''
      this.selectedCategory = ''
      this.entries = [...this.allEntries]
    },
    async handleDelete(entry) {
      const id = entry._id || entry.id
      if (!id) {
        return
      }

      const isConfirmed = window.confirm(`Delete entry ${entry.issueCode}?`)
      if (!isConfirmed) {
        return
      }

      try {
        await deleteEntry(id)
        this.allEntries = this.allEntries.filter(item => (item._id || item.id) !== id)
        this.entries = this.entries.filter(item => (item._id || item.id) !== id)
        this.flashMessage.success({ message: 'Entry deleted successfully.', time: 2500 })
      } catch (err) {
        this.flashMessage.error({ message: 'Unable to delete this entry.', time: 3000 })
      }
    },
    formatCategory(category) {
      if (!category) {
        return ''
      }

      return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }
}
</script>

<style scoped src="../assets/styles/entries.css"></style>
