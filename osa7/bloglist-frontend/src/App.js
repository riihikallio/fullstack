import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Button } from 'semantic-ui-react'
import NavLinks from './components/NavLinks'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'
import { initList, addBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { getUsers } from './reducers/userReducer'
import store from './store'
import './App.css'

function App(props) {
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
    props.getUsers()
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
        store.dispatch(setNotification(exception.message || 'Error in login'))
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
        url: newUrl,
        user: {
          id: user.id,
          name: user.name
        }
      }
      store.dispatch(addBlog(newBlog))
      store.dispatch(setNotification(`Added blog ${newTitle} by ${newAuthor}`))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setAddVisible(false)
    } catch (exception) {
      store.dispatch(setNotification(exception.errorMessage || 'Error while saving'))
    }
  }

  const hideWhenVisible = { display: addVisible ? 'none' : '' }
  const showWhenVisible = { display: addVisible ? '' : 'none' }
  return (
    <Container className="App">
      <Router>
        <NavLinks />
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
            <Route exact path="/" render={() => <BlogList />} />
            <Route exact path="/blogs" render={() => <BlogList />} />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog blog={match.params.id} user={user} />
            } />
            <Route exact path="/users" render={() => <UserList />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User userid={match.params.id} />
            } />
          </>
        }
      </Router>
    </Container>
  )
}

export default connect(
  null, { initList, getUsers }
)(App)