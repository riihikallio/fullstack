import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'
import { Container, Button } from 'semantic-ui-react'
import Notification from './components/Notification'
import { initList, addBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import store from './store'
import './App.css'
import BlogList from './components/BlogList'

function App(props) {
  //const [blogList, setBlogList] = useState([])
  const [addVisible, setAddVisible] = useState(false)
  const username = useField('text')
  const password = useField('text')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    props.initList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log(username.value + ' ' + password.value)
      const user = await loginService.login({
        username: username.value, password: password.value
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      if (exception.message.slice(-3) === '401') {
        store.dispatch(setNotification('Wrong credentials'))
      } else {
        store.dispatch(setNotification(exception.message))
      }
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const add = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }
      store.dispatch(addBlog(newBlog))
      store.dispatch(setNotification(`Added blog ${newTitle} by ${newAuthor}`))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      store.dispatch(setNotification(exception.errorMessage))
    }
  }

  const hideWhenVisible = { display: addVisible ? 'none' : '' }
  const showWhenVisible = { display: addVisible ? '' : 'none' }
  return (
    <Container className="App">
      <h1>Blogs</h1>
      <Notification />
      {user === null ?
        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          password={password}
        />
        :
        <>
          <p>{user.name} logged in <Button onClick={() => logout()}>logout</Button></p>
          <div style={hideWhenVisible}>
            <Button onClick={() => setAddVisible(true)}>Add new</Button>
          </div>
          <div style={showWhenVisible}>
            <BlogForm
              submit={add}
              title={newTitle}
              titleChange={({ target }) => setNewTitle(target.value)}
              author={newAuthor}
              authorChange={({ target }) => setNewAuthor(target.value)}
              url={newUrl}
              urlChange={({ target }) => setNewUrl(target.value)}
            />
            <br />
            <Button onClick={() => setAddVisible(false)}>cancel</Button>
          </div>
        <BlogList />
        </>
      }
    </Container>
  )
}

export default connect(
  null, { initList }
)(App)