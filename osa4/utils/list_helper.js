const lodash = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((total, blog) => total + blog.likes, 0)

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((max, blog) => (max.likes > blog.likes) ? max : blog, {})
  return {title: favorite.title, author: favorite.author, likes: favorite.likes}
}

const mostBlogs = (blogs) => {
  const byAuthor = lodash.groupBy(blogs, (blog) => blog.author)
  const authors = lodash.map(byAuthor, (auth) => ({author: auth[0].author, blogs: auth.length}))
  return authors.reduce((max, auth) => (max.blogs > auth.blogs) ? max : auth, {})
}

const mostLikes = (blogs) => {
  const byAuthor = lodash.groupBy(blogs, (blog) => blog.author)
  const authors = lodash.map(byAuthor, (auth) => {
    const likes = auth.reduce((total, blog) => total + blog.likes, 0)
    return ({author: auth[0].author, likes: likes})
  })
  return authors.reduce((max, auth) => (max.likes > auth.likes) ? max : auth, {})
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}