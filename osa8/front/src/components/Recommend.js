import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const allBooks = gql`
{
  allBooks  {
    title,
    author { name, born },
    published,
    genres
  }
}
`
const me = gql`
{
  me  {
    username
    favoriteGenre
  }
}
`
const Books = (props) => {
  const books = useQuery(allBooks)
  const user = useQuery(me)

  if (!props.show) {
    return null
  }
  if (books.loading || user.loading) {
    return <div>loading...</div>
  }
  if (!user) return null

  let filter = user.data.me.favoriteGenre
  let filtered = books.data.allBooks
  if (filter) {
    filtered = filtered.filter(b => b.genres.includes(filter))
  }

  return (
    <div>
      <h2>recommended for {user.data.me.username}</h2>
      <p>books in your favorite genre: <b>{user.data.me.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filtered.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books