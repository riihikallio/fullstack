import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'

const Blog = (props) => {
  if(!props.blog) return <h2>Loading...</h2>

  const refresh = async () => {
    const newList = await blogService.getAll()
    props.setList(newList)
  }

  const like = async () => {
    const updated = {
      user: props.blog.user.id,
      likes: props.blog.likes + 1,
      author: props.blog.author,
      title: props.blog.title,
      url: props.blog.url
    }
    await blogService.update(props.blog.id, updated)
    refresh()
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove ${props.blog.title} (by ${props.blog.author})?`)) {
      await blogService.remove(props.blog.id)
      refresh()
    }
  }

  let del = ''
  if (props.blog.user && props.blog.user.username === props.user.username) {
    del = <button onClick={() => deleteBlog()}>Delete</button>
  }

  return (
    <>
      <h2>{props.blog.title}</h2>
      <div><a href={props.blog.url}>{props.blog.url}</a></div>
      <div>by {props.blog.author}</div>
      <div>{props.blog.likes} likes <button onClick={() => like()}>Like</button></div>
      <div>added by <Link to={`/users/${props.blog.user.id}`}>{props.blog.user.name}</Link> {del}</div>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs ? state.blogs.filter(b => b.id === ownProps.blog)[0] : null,
  }
}

const ConnectedBlog = connect(mapStateToProps)(Blog)

export default ConnectedBlog