import React, { useState, useEffect } from 'react'
import Blog from'./components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'
import './App.css'

function App() {
  const [blogList, setBlogList] = useState([])
  const [addVisible, setAddVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  //const [username, setUsername] = useState('')
  const username = useField('text')
  //const [password, setPassword] = useState('')
  const password = useField('text')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [open, setOpen] = useState('')

  useEffect( () => {
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

  const setError = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const Notification = ({ message }) => {
    if (message) {
      return <div className="error">
        {message}
      </div>
    } else {
      return null
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log(username.value + ' '+ password.value)
      const user = await loginService.login({
        username: username.value, password: password.value
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      //setUsername('')
      username.reset()
      //setPassword('')
      password.reset()
    } catch (exception) {
      if (exception.message.slice(-3) === '401') {
        setError('Wrong credentials')
      } else {
        setError(exception.message)
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
      setError(`Added blog ${created.title} by ${created.author}`)
    } catch (exception) {
      setError(exception.errorMessage)
    }
  }

  const hideWhenVisible = { display: addVisible ? 'none' : '' }
  const showWhenVisible = { display: addVisible ? '' : 'none' }
  return (
    <div className="App">
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {user === null ?
        <LoginForm
          handleSubmit={handleLogin}
          // handleUsernameChange={({ target }) => setUsername(target.value)}
          // handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
        :
      <>
        <p>{user.name} logged in <button onClick={() => logout()}>logout</button></p>
        <div style={hideWhenVisible}>
          <button onClick={() => setAddVisible(true)}>Add new</button>
        </div>
        <div  style={showWhenVisible}>
          <BlogForm
            submit={addBlog}
            title={newTitle}
            titleChange={({ target }) => setNewTitle(target.value)}
            author={newAuthor}
            authorChange={({ target }) => setNewAuthor(target.value)}
            url={newUrl}
            urlChange={({ target }) => setNewUrl(target.value)}
          />
          <button onClick={() => setAddVisible(false)}>Cancel</button>
        </div>
        <h2>List of blogs</h2>
        {blogList
          .sort((a,b) => b.likes - a.likes)
          .map(b => <Blog
            blog={b}
            key={b.id}
            open={open}
            setOpen={setOpen}
            setList={setBlogList}
            user={user}
          />)}
      </>
      }
    </div>
  )
}

export default App