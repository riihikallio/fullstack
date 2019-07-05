const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
  response.json(users.map(u => u.toJSON()))
})

userRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    if (body.username.length > 2 && body.password.length > 2) {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)
      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash,
        blogs: []
      })
      const savedUser = await user.save()
      response.json(savedUser)
    } else return response.status(400).json({ 
      error: 'username or password too short' 
    })
  } catch (exception) {
    next(exception)
  }
})

module.exports = userRouter