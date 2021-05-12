
require('dotenv/config')
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
// Set App Variable
const app = express()

// Use Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    const now = new Date().toString()
    console.log(`Requested ${req.url} at ${now}`)
    next()
})

// Database Setup
require('./config/db-setup.js')

// Routes
const router = require('./controllers/index.js')
app.use(router)

app.get('/', (req, res) => {
  res.redirect("https://xscoopy.github.io/AnimePI")
})

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AnimePI listening on port ${PORT}!`)
})

module.exports = app