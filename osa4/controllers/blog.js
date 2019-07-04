const blogRouter = require('express').Router()
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

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const user = await User.findById('5d1ca8b1a5d96d3012f75b87')
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
})

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
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