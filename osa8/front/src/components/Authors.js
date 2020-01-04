import React, { useState } from 'react'
import Select from 'react-select';
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

const allAuthors = gql`
{
  allAuthors  {
    name,
    born,
    bookCount
  }
}
`
const update = gql`
mutation editAuthor($name: String!, $year: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $year,
  ) {
    name
    born
  }
}
`

const Authors = (props) => {
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const authors = useQuery(allAuthors)

  const [updateYear] = useMutation(update, {
    refetchQueries: [{ query: allAuthors }]
  })

  if (!props.show) {
    return null
  }
  if (authors.loading) {
    return <div>loading...</div>
  }
  const options = []
  if (authors.data) {
    authors.data.allAuthors.forEach(a => options.push({ value: a.name, label: a.name }))
  }

  const submit = async (e) => {
    e.preventDefault()
    await updateYear({
      variables: { name: author.value, year: parseInt(year) }
    })

    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            value={author}
            onChange={setAuthor}
            options={options}
          />
        </div>
        <div>
          year
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>set</button>
      </form>
    </div>
  )
}

export default Authors