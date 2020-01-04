import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommend from './components/Recommend'
import NewBook from './components/NewBook'
import Login from './components/Login'

const App = (props) => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  return (
    <div>
      <div>
        &nbsp; <button onClick={() => setPage('authors')}>authors</button>
        &nbsp; <button onClick={() => setPage('books')}>books</button>
        {token && <span>
          &nbsp; <button onClick={() => setPage('recommend')}>recommended</button>
          &nbsp; <button onClick={() => setPage('add')}>add book</button>
          &nbsp;  <button onClick={() => { setToken(null); localStorage.clear(); props.client.resetStore() }}>log out</button>
        </span>}
        {!token && <span>
          &nbsp; <button onClick={() => setPage('login')}>log in</button>
        </span>
        }
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />
      <Books
        show={page === 'books'}
      />
      <Recommend
        show={page === 'recommend'}
        token={token}
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