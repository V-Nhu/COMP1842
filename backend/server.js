const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const entryRoutes = require('./api/routes/entry.routes')
const Entry = require('./api/models/Entry')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Entry.syncIndexes()
    console.log('MongoDB connected')
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err)
  })

// Routes
app.use('/api/entries', entryRoutes)

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Helpdesk API is running' })
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})