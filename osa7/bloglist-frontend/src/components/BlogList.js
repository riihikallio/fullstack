import React from 'react'
import { connect } from 'react-redux'
//import Blog from './Blog'
import { Table } from 'semantic-ui-react'

const BlogList = (props) => (
    <>
        <h2>List of blogs</h2>
        <Table>
          <Table.Body>
            {props.blogs
              .sort((a, b) => b.likes - a.likes)
              .map(b =>
                <Table.Row key={b.id}>
                  <Table.Cell>{b.title}</Table.Cell>
                  <Table.Cell>{b.likes}</Table.Cell>
                  <Table.Cell>{b.author}</Table.Cell>
                </Table.Row>)}
          </Table.Body>
        </Table>
    </>
)

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log('BlogList:', state)
  return {
    blogs: state.blogs,
  }
}

const ConnectedBlogList = connect(mapStateToProps)(BlogList)
export default ConnectedBlogList