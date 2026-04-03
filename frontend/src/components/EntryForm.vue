<template>
  <form class="ui form entry-form" @submit.prevent="onSubmit">
    <div class="field" :class="{ error: submitted && !localForm.issueCode }">
      <label>Issue Code</label>
      <input
        v-model.trim="localForm.issueCode"
        type="text"
        placeholder="e.g. NET-404"
        :disabled="disabled"
      >
    </div>

    <div class="field" :class="{ error: submitted && !localForm.category }">
      <label>Category</label>
      <input
        v-model.trim="localForm.category"
        type="text"
        placeholder="e.g. Network"
        :disabled="disabled"
      >
    </div>

    <div class="field" :class="{ error: submitted && !localForm.responseText }">
      <label>Response Text</label>
      <textarea
        v-model.trim="localForm.responseText"
        rows="5"
        placeholder="Enter a response template..."
        :disabled="disabled"
      ></textarea>
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
    }
  },
  data() {
    return {
      localForm: {
        issueCode: '',
        category: '',
        responseText: ''
      },
      submitted: false
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
    }
  },
  methods: {
    onSubmit() {
      this.submitted = true

      if (!this.localForm.issueCode || !this.localForm.category || !this.localForm.responseText) {
        return
      }

      this.$emit('submit', { ...this.localForm })
    }
  }
}
</script>

<style scoped src="../assets/styles/entry-form.css"></style>
