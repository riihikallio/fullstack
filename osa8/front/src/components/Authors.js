import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const allAuthors = gql`
{
  allAuthors  {
    name,
    born,
    bookCount
  }
}
`

const Authors = (props) => {
  const authors = useQuery(allAuthors)
  if (!props.show) {
    return null
  }
  if (authors.loading) {
    return <div>loading...</div>
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

    </div>
  )
}

export default Authors