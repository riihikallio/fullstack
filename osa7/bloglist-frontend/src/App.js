import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'
import { Container, Table, Button } from 'semantic-ui-react'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import store from './store'
import './App.css'

function App(props) {
  const [blogList, setBlogList] = useState([])
  const [addVisible, setAddVisible] = useState(false)
  const username = useField('text')
  const password = useField('text')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [open, setOpen] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(initial => setBlogList(initial))
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

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }
      const created = await blogService.create(newBlog)
      setBlogList(blogList.concat(created))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      store.dispatch(setNotification(`Added blog ${created.title} by ${created.author}`))
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
              submit={addBlog}
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
          <h2>List of blogs</h2>
          <Table>
            <Table.Body>
              {blogList
                .sort((a, b) => b.likes - a.likes)
                .map(b => <Blog
                  blog={b}
                  key={b.id}
                  open={open}
                  setOpen={setOpen}
                  setList={setBlogList}
                  user={user}
                />)}
            </Table.Body>
          </Table>
        </>
      }
    </Container>
  )
}

export default App