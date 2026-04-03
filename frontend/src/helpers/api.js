import axios from 'axios'

const baseURL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api'

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient