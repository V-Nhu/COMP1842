const express = require('express')
const router = express.Router()
const controller = require('../controllers/entry.controller')

// Search must come BEFORE /:id routes to avoid conflicts
router.get('/search', controller.searchByIssueCode)

// CRUD routes
router.get('/', controller.getAllEntries)
router.get('/:id', controller.getEntryById)
router.post('/', controller.createEntry)
router.put('/:id', controller.updateEntry)
router.delete('/:id', controller.deleteEntry)

module.exports = router