const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogRouter = require('./controllers/blog')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app