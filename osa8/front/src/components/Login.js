import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
const NewBook = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useMutation(LOGIN)

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    const result = await login({
      variables: { username, password }
    })
    const token = result.data.login.value
    props.setToken(token)
    localStorage.setItem('user-token', token)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>log in</h2>
      <form onSubmit={submit}>
        <div>
          user &nbsp;
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password &nbsp;
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default NewBook