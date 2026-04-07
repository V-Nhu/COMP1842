<template>
  <div class="ui container form-page">
    <div class="form-card">
      <div class="form-header">
        <div class="form-header-icon">
          <i class="plus icon"></i>
        </div>
        <div>
          <h2 class="page-title">Add New Entry</h2>
          <p class="page-subtitle">Create a standard response template for recurring support issues.</p>
        </div>
      </div>

      <div class="form-divider"></div>

      <EntryForm
        :value="form"
        submit-text="Save Entry"
        :disabled="isSaving"
        :loading="isSaving"
        :error-message="submissionError"
        @submit="handleCreate"
        @clear-error="clearSubmissionError"
      />
    </div>
  </div>
</template>

<script>
import EntryForm from '../components/EntryForm.vue'
import { createEntry } from '../helpers/entryService'

export default {
  name: 'NewEntryView',
  components: {
    EntryForm
  },
  data() {
    return {
      form: {
        issueCode: '',
        category: '',
        responseText: ''
      },
      isSaving: false,
      submissionError: ''
    }
  },
  methods: {
    clearSubmissionError() {
      this.submissionError = ''
    },
    async handleCreate(formData) {
      this.isSaving = true
      this.submissionError = ''
      try {
        await createEntry(formData)
        window.sessionStorage.setItem('entriesFlashMessage', JSON.stringify({
          type: 'success',
          message: 'Entry created successfully.',
          time: 2500
        }))
        window.location.assign('/entries')
      } catch (err) {
        const message = err?.response?.data?.message || 'Failed to create entry. Please try again.'
        this.submissionError = message
        this.flashMessage.error({ message, time: 3500 })
      } finally {
        this.isSaving = false
      }
    }
  }
}
</script>

<style scoped src="../assets/styles/new-entry.css"></style>
