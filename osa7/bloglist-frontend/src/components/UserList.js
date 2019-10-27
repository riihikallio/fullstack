import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const UserList = (props) => {

  return (
    <>
      <h2>Users</h2>
      {console.log('Luodaan listaa', props)}

        <Table>
          <Table.Body>
            {props.users ? props.users
            //.sort((a, b) => (a.name > b.name))
              .map(u =>
                <Table.Row key={u.id}>
                  <Table.Cell><Link to={`/users/${u.id}`}>{u.name}</Link></Table.Cell>
                  <Table.Cell>{u.blogs.length}</Table.Cell>
                </Table.Row>)
              : null}
          </Table.Body>
        </Table>

    </>
  )
}

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log('UserList:', state)
  return {
    users: state.users,
  }
}

const ConnectedUserList = connect(mapStateToProps)(UserList)
export default ConnectedUserList