<template>
  <div class="ui container form-page">
    <div class="ui segment">
      <h2 class="ui header page-title">Add New Entry</h2>
      <p class="page-subtitle">Create a standard response template for recurring support issues.</p>

      <EntryForm
        :value="form"
        submit-text="Save Entry"
        :disabled="isSaving"
        :loading="isSaving"
        @submit="handleCreate"
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
      isSaving: false
    }
  },
  methods: {
    async handleCreate(formData) {
      this.isSaving = true
      try {
        await createEntry(formData)
        this.flashMessage.success({ message: 'Entry created successfully.', time: 2500 })
        this.$router.push('/entries')
      } catch (err) {
        this.flashMessage.error({ message: 'Failed to create entry. Please try again.', time: 3500 })
      } finally {
        this.isSaving = false
      }
    }
  }
}
</script>

<style scoped src="../assets/styles/new-entry.css"></style>
