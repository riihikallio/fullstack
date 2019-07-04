const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

mongoose.connect(config.MONGODB_URI, { 
  useNewUrlParser: true, 
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app