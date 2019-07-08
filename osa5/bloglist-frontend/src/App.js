import React, { useState, useEffect } from 'react';
import Blog from'./components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

function App() {
  const [blogList, setBlogList] = useState([]) 
  const [errorMessage, setErrorMessage] = useState(null) 
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('wrong credentials')
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
      setError('wrong credentials')
    }
  }

  return (
    <div className="App">
    <h1>Blogs</h1>
    <Notification message={errorMessage} />
    {user === null ?
      <LoginForm 
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
      />
      :
      <div>
        <p>{user.name} logged in <button onClick={() => logout()}>logout</button></p>
        <BlogForm 
          submit={addBlog}
          title={newTitle}
          titleChange={({ target }) => setNewTitle(target.value)}
          author={newAuthor}
          authorChange={({ target }) => setNewAuthor(target.value)}
          url={newUrl}
          urlChange={({ target }) => setNewUrl(target.value)}
        />
        <h2>List of blogs</h2>
        {blogList.map(b => <Blog blog={b} key={b.url} />)}
      </div>
    }
    </div>
  )
}

export default App;