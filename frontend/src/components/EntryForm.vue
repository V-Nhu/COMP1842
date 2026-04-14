<template>
  <form class="ui form entry-form" @submit.prevent="onSubmit">
    <div v-if="showValidationSummary" class="form-message form-message--warning">
      Please fix the highlighted fields before saving.
    </div>

    <div v-if="errorMessage" class="form-message form-message--error">
      {{ errorMessage }}
    </div>

    <div class="field" :class="{ error: Boolean(fieldErrors.issueCode) }">
      <label>Issue Code</label>
      <input
        v-model.trim="localForm.issueCode"
        type="text"
        placeholder="e.g. NET-404"
        :disabled="disabled"
      >
      <p v-if="fieldErrors.issueCode" class="field-message">{{ fieldErrors.issueCode }}</p>
    </div>

    <div class="field" :class="{ error: Boolean(fieldErrors.category) }">
      <label>Category</label>
      <select v-model="localForm.category" :disabled="disabled">
        <option value="" disabled>Select a category</option>
        <option v-for="option in categoryOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <p v-if="fieldErrors.category" class="field-message">{{ fieldErrors.category }}</p>
    </div>

    <div class="field" :class="{ error: Boolean(fieldErrors.responseText) }">
      <label>Response Text</label>
      <textarea
        v-model.trim="localForm.responseText"
        rows="5"
        placeholder="Enter a response template..."
        :disabled="disabled"
      ></textarea>
      <p v-if="fieldErrors.responseText" class="field-message">{{ fieldErrors.responseText }}</p>
    </div>

    <div class="form-actions">
      <button class="ui primary button" type="submit" :disabled="disabled || loading">
        {{ submitText }}
      </button>
      <router-link to="/entries" class="ui button cancel-btn" :class="{ disabled: loading }">Cancel</router-link>
    </div>
  </form>
</template>

<script>
export default {
  name: 'EntryFormComponent',
  props: {
    value: {
      type: Object,
      default: () => ({
        issueCode: '',
        category: '',
        responseText: ''
      })
    },
    submitText: {
      type: String,
      default: 'Save Entry'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localForm: {
        issueCode: '',
        category: '',
        responseText: ''
      },
      categoryOptions: [
        { value: 'billing', label: 'Billing' },
        { value: 'technical', label: 'Technical' },
        { value: 'account', label: 'Account' },
        { value: 'security', label: 'Security' },
        { value: 'notification', label: 'Notification' }
      ],
      submitted: false
    }
  },
  computed: {
    fieldErrors() {
      if (!this.submitted) {
        return {
          issueCode: '',
          category: '',
          responseText: ''
        }
      }

      return {
        issueCode: this.localForm.issueCode ? '' : 'Issue Code is required and must be unique.',
        category: this.localForm.category ? '' : 'Please choose a category.',
        responseText: this.localForm.responseText ? '' : 'Response Text cannot be empty.'
      }
    },
    hasValidationErrors() {
      return Object.values(this.fieldErrors).some(Boolean)
    },
    showValidationSummary() {
      return this.submitted && this.hasValidationErrors
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.localForm = {
          issueCode: newValue.issueCode || '',
          category: newValue.category || '',
          responseText: newValue.responseText || ''
        }
      }
    },
    localForm: {
      deep: true,
      handler() {
        if (this.errorMessage) {
          this.$emit('clear-error')
        }
      }
    }
  },
  methods: {
    onSubmit() {
      this.submitted = true

      if (this.hasValidationErrors) {
        return
      }

      this.$emit('submit', { ...this.localForm })
    }
  }
}
</script>

<style scoped src="../assets/styles/entry-form.css"></style>
