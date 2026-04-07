<template>
  <div class="ui container quiz-page">
    <div class="quiz-card-main">
      <div class="quiz-header">
        <div class="quiz-header-row">
          <div class="quiz-header-icon">
            <i class="graduation cap icon"></i>
          </div>
          <div>
            <h2 class="quiz-title">Learning Hub</h2>
            <p class="quiz-subtitle">Strengthen support readiness with interactive practice and response-based assessments.</p>
          </div>
        </div>
      </div>

      <div class="quiz-divider"></div>

      <!-- Loading -->
      <div v-if="isLoading" class="quiz-loader">
        <div class="ui active inline centered loader"></div>
        <p class="quiz-loader-text">Preparing your quiz...</p>
      </div>

      <!-- Not enough entries -->
      <div v-else-if="allEntries.length < 2" class="quiz-empty">
        <div class="quiz-empty-icon">
          <i class="exclamation triangle icon"></i>
        </div>
        <p class="quiz-empty-title">Not Enough Entries</p>
        <p class="quiz-empty-text">You need at least 2 helpdesk entries to start the quiz.</p>
        <router-link class="ui primary button" to="/entries/new">
          <i class="plus icon"></i> Add Entries Now
        </router-link>
      </div>

      <!-- Quiz finished -->
      <div v-else-if="quizFinished" class="quiz-result">
        <div class="result-card">
          <div class="result-emoji">{{ scorePercent >= 80 ? '🎉' : scorePercent >= 50 ? '👍' : '💪' }}</div>
          <div class="result-score">{{ score }} / {{ totalQuestions }}</div>
          <p class="result-label">Questions Answered Correctly</p>
          <div class="result-bar-track">
            <div class="result-bar-fill" :style="{ width: scorePercent + '%' }"></div>
          </div>
          <p class="result-percent">{{ scorePercent }}% Score</p>
          <div class="result-message">
            <span v-if="scorePercent >= 80">Excellent work! You really know your stuff.</span>
            <span v-else-if="scorePercent >= 50">Good job! Keep practising to improve.</span>
            <span v-else>Keep learning! Review the entries and try again.</span>
          </div>
          <div class="result-actions">
            <button class="ui primary button" @click="restartQuiz">
              <i class="redo icon"></i> Restart Quiz
            </button>
            <router-link class="ui button result-secondary-btn" to="/entries">
              <i class="list icon"></i> Go to Entries
            </router-link>
          </div>
        </div>
      </div>

      <!-- Active question -->
      <div v-else>
        <div class="quiz-progress">
          <div class="progress-header">
            <span class="progress-text">Question {{ currentIndex + 1 }} of {{ totalQuestions }}</span>
            <span class="progress-score">Score: {{ score }}</span>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
        </div>

        <QuizCard
          :title="currentQuestion.title"
          :subtitle="currentQuestion.subtitle"
          :options="currentQuestion.options"
          :disabled="answerLocked"
          @select="handleAnswer"
        />

        <div v-if="answerLocked" class="quiz-feedback" :class="lastCorrect ? 'feedback-correct' : 'feedback-wrong'">
          <div class="feedback-icon">{{ lastCorrect ? '✓' : '✗' }}</div>
          <div class="feedback-content">
            <strong>{{ lastCorrect ? 'Correct!' : 'Incorrect' }}</strong>
            <span v-if="!lastCorrect" class="feedback-detail">The correct answer was: {{ currentQuestion.correctAnswer }}</span>
          </div>
        </div>

        <div v-if="answerLocked" class="quiz-next">
          <button class="ui primary button" @click="nextQuestion">
            {{ currentIndex + 1 < totalQuestions ? 'Next Question' : 'See Results' }}
            <i class="arrow right icon"></i>
          </button>
        </div>
      </div>

      <div class="quiz-footer" v-if="!quizFinished && !isLoading && allEntries.length >= 2">
        <router-link class="ui button quiz-footer-btn" to="/entries">
          <i class="arrow left icon"></i> Back to Entries
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import QuizCard from '../components/QuizCard.vue'
import { getEntries } from '../helpers/entryService'

export default {
  name: 'QuizView',
  components: {
    QuizCard
  },
  data() {
    return {
      allEntries: [],
      questions: [],
      currentIndex: 0,
      score: 0,
      answerLocked: false,
      lastCorrect: false,
      quizFinished: false,
      isLoading: false,
      totalQuestions: 5
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] || { title: '', subtitle: '', options: [], correctAnswer: '' }
    },
    progressPercent() {
      return Math.round((this.currentIndex / this.totalQuestions) * 100)
    },
    scorePercent() {
      if (this.totalQuestions === 0) return 0
      return Math.round((this.score / this.totalQuestions) * 100)
    }
  },
  created() {
    this.loadQuiz()
  },
  methods: {
    async loadQuiz() {
      this.isLoading = true
      try {
        const { data } = await getEntries()
        this.allEntries = Array.isArray(data) ? data : []
        if (this.allEntries.length >= 2) {
          this.buildQuestions()
        }
      } catch (err) {
        this.flashMessage.error({ message: 'Failed to load quiz data.', time: 3500 })
      } finally {
        this.isLoading = false
      }
    },
    buildQuestions() {
      var shuffled = this.shuffleArray(this.allEntries.slice())
      var count = Math.min(this.totalQuestions, shuffled.length)
      this.totalQuestions = count
      this.questions = []

      for (var i = 0; i < count; i++) {
        var correct = shuffled[i]
        var wrongPool = this.allEntries.filter(function (e) {
          return (e._id || e.id) !== (correct._id || correct.id)
        })
        var wrongOptions = this.shuffleArray(wrongPool).slice(0, 3).map(function (e) {
          return e.responseText
        })

        var allOptions = this.shuffleArray(wrongOptions.concat([correct.responseText]))

        this.questions.push({
          title: 'What is the correct response for: ' + correct.issueCode + '?',
          subtitle: 'Category: ' + (correct.category || 'General'),
          options: allOptions,
          correctAnswer: correct.responseText
        })
      }
    },
    handleAnswer(selected) {
      if (this.answerLocked) return
      this.answerLocked = true
      this.lastCorrect = selected === this.currentQuestion.correctAnswer
      if (this.lastCorrect) {
        this.score++
      }
    },
    nextQuestion() {
      if (this.currentIndex + 1 >= this.totalQuestions) {
        this.quizFinished = true
      } else {
        this.currentIndex++
        this.answerLocked = false
        this.lastCorrect = false
      }
    },
    restartQuiz() {
      this.currentIndex = 0
      this.score = 0
      this.answerLocked = false
      this.lastCorrect = false
      this.quizFinished = false
      this.totalQuestions = 5
      this.buildQuestions()
    },
    shuffleArray(arr) {
      var array = arr.slice()
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    }
  }
}
</script>

<style scoped src="../assets/styles/quiz.css"></style>
