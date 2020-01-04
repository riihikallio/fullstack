import React, {useState} from 'react'
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
const Books = (props) => {
  const [filter, setFilter] = useState('all')
  const books = useQuery(allBooks)
  if (!props.show) {
    return null
  }
  if (books.loading) {
    return <div>loading...</div>
  }

  let genres = new Set()
  books.data.allBooks.forEach(b => b.genres.forEach(g => genres.add(g)))
  genres.add("all")

  let filtered = books.data.allBooks
  if (filter !== 'all') {
    filtered = filtered.filter(b => b.genres.includes(filter))
  }
  console.log("filter", filter, filtered)

  return (
    <div>
      <h2>books</h2>
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
      <div>
        {[...genres].map(g => <span><button key={g} onClick={() => setFilter(g)}>{g}</button>&nbsp;</span> )}
      </div>
    </div>
  )
}

export default Books