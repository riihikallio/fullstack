const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blogs = require('./testcontent')

const api = supertest(app)

beforeEach(async () => {
  await Blog.remove({})
  
  const blogObjects = blogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('API bloglist is returned as json and the count is right', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body.length).toBe(blogs.length)
})

test('API blogs contain an ID field', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
  expect(response.body[0].id).toBeDefined()
})

test('API adding a blog with POST works', async () => {
  const newBlog = {
    title: 'Metis Oy',
    author: 'Petri Riihikallio',
    url: 'https://metis.fi',
    likes: 3
  }
      
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(blogs.length + 1)
  if (!response.body.find(b => b.title.includes('Metis'))) {
    throw new Error('New blog was not added')
  }

})

test('API adding a blog without likes works', async () => {
  const newBlog = {
    title: 'Hesari',
    author: 'Sanoma Oy',
    url: 'https://hs.fi',
  }
        
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
  
  const response = await api.get('/api/blogs')
  const readBlog = response.body.find(b => b.title.includes('Hesari'))
  expect(readBlog.likes).toBe(0)
})

test('API adding a blog without url or title fails', async () => {
  const badBlog = {
    title: 'Hessun seikkailut',
    author: 'Hessu Hopo',
    likes: 666
  }
        
  await api
    .post('/api/blogs')
    .send(badBlog)
    .expect(400)
})

describe('API deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const beforelist = await api
      .get('/api/blogs')
      .expect(200)

    await api
      .delete(`/api/blogs/${beforelist.body[0].id}`)
      .expect(204)

    const afterlist = await api
      .get('/api/blogs')
      .expect(200)

    expect(afterlist.body.length).toBe(
      beforelist.body.length - 1
    )

    const contents = afterlist.body.map(r => r.title)
    expect(contents).not.toContain(beforelist.body[0].title)
  })
})

describe('API updating a blog', () => {
  test('Try to change likes to 666', async () => {
    const beforelist = await api
      .get('/api/blogs')
      .expect(200)
    
    const edited = beforelist.body[0]
    edited.likes = 666
  
    await api
      .put(`/api/blogs/${edited.id}`)
      .send(edited)
      .expect(200)
  
    const afterlist = await api
      .get('/api/blogs')
      .expect(200)
  
    const contents = afterlist.body.map(r => r.likes)
    expect(contents).toContain(666)
  })
})

afterAll(() => {
  mongoose.connection.close()
})