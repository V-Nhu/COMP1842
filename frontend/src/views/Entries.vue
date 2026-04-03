<template>
  <div class="ui container entries-page">
    <section class="ui segment entries-panel">
      <div class="entries-header">
        <div>
          <h2 class="ui header section-title">Helpdesk Entries</h2>
          <p class="section-subtitle">
            Browse all support responses, search by issue code, or filter by category.
          </p>
        </div>
        <router-link class="ui right floated primary button add-btn" to="/entries/new">
          Add New Entry
        </router-link>
      </div>

      <form class="filter-row" @submit.prevent="applyFilter">
        <input
          v-model.trim="searchCode"
          type="text"
          class="filter-input"
          placeholder="Search by issue code"
        >
        <select v-model="selectedCategory" class="filter-select">
          <option value="">All Categories</option>
          <option v-for="option in categoryOptions" :key="option" :value="option">
            {{ formatCategory(option) }}
          </option>
        </select>
        <button type="submit" class="ui button apply-btn">Apply Search / Filter</button>
      </form>

      <div class="actions-row">
        <button class="ui button load-all-btn" type="button" @click="loadAllEntries">
          Load All Entries
        </button>
      </div>

      <div v-if="isLoading" class="ui active inline loader list-loader"></div>

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
    this.loadEntries()
  },
  methods: {
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
