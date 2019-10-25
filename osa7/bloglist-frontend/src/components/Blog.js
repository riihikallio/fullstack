import React from 'react'
import { connect } from 'react-redux'
import store from '../store'
import blogService from '../services/blogs'
import { Table } from 'semantic-ui-react'

const Blog = ({ blog, open, setOpen, setList, user }) => {

  const refresh = async () => {
    const newList = await blogService.getAll()
    setList(newList)
  }

  const like = async () => {
    const updated = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await blogService.update(blog.id, updated)
    refresh()
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove ${blog.title} (by ${blog.author})?`)) {
      await blogService.remove(blog.id)
      refresh()
    }
  }

  let del = ''
  if (blog.user.username === user.username) {
    del = <button onClick={() => deleteBlog()}>Delete</button>
  }

  let details = ''
  if (blog.id === open) {
    details = <>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={() => like()}>Like</button></div>
      <div>added by {blog.user.name}</div>
      {del}
    </>
  }

  return (
    <Table.Row
      className="blog"
      key={blog.id}
      data-testid={blog.id}
      onClick={() => { (blog.id !== open) ? setOpen(blog.id) : setOpen('') }}
    >
      <Table.Cell>{blog.title} { details }</Table.Cell><Table.Cell>by {blog.author}</Table.Cell>
    </Table.Row>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const ConnectedBlog = connect(mapStateToProps)(Blog)

export default ConnectedBlog