<template>
  <div class="ui container edit-page">
    <div class="form-card">
      <div class="form-header">
        <div class="form-header-icon form-header-icon--edit">
          <i class="pencil icon"></i>
        </div>
        <div>
          <h2 class="page-title">Edit Entry</h2>
          <p class="page-subtitle">Update the response content and category details.</p>
        </div>
      </div>

      <div class="form-divider"></div>

      <div v-if="isLoading" class="form-loader">
        <div class="ui active inline centered loader"></div>
        <p class="loader-text">Loading entry data...</p>
      </div>

      <EntryForm
        v-else
        :value="form"
        submit-text="Update Entry"
        :disabled="isSaving"
        :loading="isSaving"
        :error-message="submissionError"
        @submit="handleUpdate"
        @clear-error="clearSubmissionError"
      />
    </div>
  </div>
</template>

<script>
import EntryForm from '../components/EntryForm.vue'
import { getEntry, updateEntry } from '../helpers/entryService'

export default {
  name: 'EditEntryView',
  components: {
    EntryForm
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: {
        issueCode: '',
        category: '',
        responseText: ''
      },
      isLoading: false,
      isSaving: false,
      submissionError: ''
    }
  },
  created() {
    this.loadEntry()
  },
  methods: {
    clearSubmissionError() {
      this.submissionError = ''
    },
    async loadEntry() {
      this.isLoading = true
      try {
        const { data } = await getEntry(this.id)
        this.form = {
          issueCode: data.issueCode || '',
          category: data.category || '',
          responseText: data.responseText || ''
        }
      } catch (err) {
        this.flashMessage.error({ message: 'Failed to load entry.', time: 3500 })
      } finally {
        this.isLoading = false
      }
    },
    async handleUpdate(formData) {
      this.isSaving = true
      this.submissionError = ''
      try {
        await updateEntry(this.id, formData)
        window.sessionStorage.setItem('entriesFlashMessage', JSON.stringify({
          type: 'success',
          message: 'Entry updated successfully.',
          time: 2500
        }))
        window.location.assign('/entries')
      } catch (err) {
        const message = err?.response?.data?.message || 'Failed to update entry. Please try again.'
        this.submissionError = message
        this.flashMessage.error({ message, time: 3500 })
      } finally {
        this.isSaving = false
      }
    }
  }
}
</script>

<style scoped src="../assets/styles/edit-entry.css"></style>
