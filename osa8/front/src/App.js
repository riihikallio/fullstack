import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

const App = (props) => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <span>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => { setToken(null); localStorage.clear(); props.client.resetStore() }}>log out</button>
        </span>}
        {!token &&
          <button onClick={() => setPage('login')}>log in</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />
      <Books
        show={page === 'books'}
      />
      <NewBook
        show={page === 'add'}
        token={token}
      />
      <Login
        show={page === 'login'}
        token={token}
        setToken={setToken}
      />
    </div>
  )
}

export default App