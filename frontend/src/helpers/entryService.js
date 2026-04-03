import apiClient from './api'

export function getEntries() {
  return apiClient.get('/entries')
}

export function getEntry(id) {
  return apiClient.get('/entries/' + id)
}

export function createEntry(data) {
  return apiClient.post('/entries', data)
}

export function updateEntry(id, data) {
  return apiClient.put('/entries/' + id, data)
}

export function deleteEntry(id) {
  return apiClient.delete('/entries/' + id)
}

export function searchEntries(code) {
  return apiClient.get('/entries/search', { params: { code } })
}
