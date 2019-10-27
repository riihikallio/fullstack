import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { delBlog, likeBlog } from '../reducers/blogReducer'
import store from '../store'
import { getUsers } from '../reducers/userReducer'

const Blog = (props) => {
  let history = useHistory()
  if(!props.blog) return <h2>Loading...</h2>

  const like = () => {
    console.log('Like:', props.blog)
    store.dispatch(likeBlog(props.blog))
  }

  const del = () => {
    if (window.confirm(`Remove ${props.blog.title} (by ${props.blog.author})?`)) {
      store.dispatch(delBlog(props.blog.id))
      store.dispatch(getUsers())
      history.push('/')
    }
  }

  let delButton = ''
  if (props.blog.user && props.blog.user.username === props.user.username) {
    delButton = <Button onClick={() => del()}>Delete</Button>
  }

  return (
    <>
      <h2>{props.blog.title}</h2>
      <div><a href={props.blog.url}>{props.blog.url}</a></div>
      <div>by {props.blog.author}</div>
      <div>{props.blog.likes} likes <button onClick={() => like()}>Like</button></div>
      <div>added by <Link to={`/users/${props.blog.user.id}`}>{props.blog.user.name}</Link> {delButton}</div>
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