const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .populate('user', {username: 1, name: 1, id: 1})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    if (!request.token) {
      return response.status(401).json({ error: 'token missing' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    blog.user = user._id
    if (blog.title && blog.url) {
      blog.likes = blog.likes || 0
      blog
        .save()
        .then(result => {
          response.status(201).json(result)
        })
      user.blogs = user.blogs.concat(blog._id)
      await user.save()
    } else return response.status(400).json({ 
      error: 'title or url missing' 
    })
  } catch (e){
    next(e)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    if (!req.token) {
      return res.status(401).json({ error: 'token missing' })
    }
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    const blog = await Blog.findById(req.params.id)
    if (decodedToken.id.toString() === blog.user.toString()) {
      await Blog.deleteOne(blog)
      res.status(204).end()
    } else {
      return res.status(401).json({ error: 'not blog creator' })
    }
  } catch (e) {
    next(e)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  }
  try {
    const result = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(result.toJSON())
  } catch (e) {
    next(e)
  }
})

module.exports = blogRouter