<template>
  <div class="ui container edit-page">
    <div class="ui segment">
      <h2 class="ui header page-title">Edit Entry</h2>
      <p class="page-subtitle">Update the response content and category details.</p>

      <div v-if="isLoading" class="ui active inline loader" style="display:block;margin:32px auto;"></div>

      <EntryForm
        v-else
        :value="form"
        submit-text="Update Entry"
        :disabled="isSaving"
        :loading="isSaving"
        @submit="handleUpdate"
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
      isSaving: false
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
      try {
        await updateEntry(this.id, formData)
        this.flashMessage.success({ message: 'Entry updated successfully.', time: 2500 })
        this.$router.push('/entries')
      } catch (err) {
        this.flashMessage.error({ message: 'Failed to update entry. Please try again.', time: 3500 })
      } finally {
        this.isSaving = false
      }
    }
  }
}
</script>

<style scoped src="../assets/styles/edit-entry.css"></style>
