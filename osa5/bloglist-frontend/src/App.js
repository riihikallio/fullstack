import React, { useState, useEffect } from 'react';
import Blog from'./components/Blog'
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
    <h2>Add a blog</h2>
      Title:
      <input
        type="text"
        value={newTitle}
        name="Title"
        onChange={({target}) => setNewTitle(target.value)}
      /><br />
      Author:
        <input
        type="text"
        value={newAuthor}
        name="Author"
        onChange={({target}) => setNewAuthor(target.value)}
      /><br />
      URL:
        <input
        type="text"
        value={newUrl}
        name="Url"
        onChange={({target}) => setNewUrl(target.value)}
      /><br />
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div className="App">
    <h1>Blogs</h1>
    <Notification message={errorMessage} />
    {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in <button onClick={() => logout()}>logout</button></p>
        {blogForm()}
        <h2>List of blogs</h2>
        {blogList.map(b => <Blog blog={b} key={b.url} />)}
      </div>
    }
    </div>
  )
}

export default App;