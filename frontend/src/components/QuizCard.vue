<template>
  <div class="ui segment quiz-card-shell">
    <h3 class="ui header quiz-card-title">{{ title }}</h3>
    <p v-if="subtitle" class="muted quiz-card-subtitle">{{ subtitle }}</p>

    <div class="ui relaxed list">
      <button
        v-for="(option, index) in options"
        :key="`${index}-${option}`"
        class="ui fluid basic button option-btn"
        type="button"
        :disabled="disabled"
        @click="$emit('select', option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizCardComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped src="../assets/styles/quiz-card.css"></style>
