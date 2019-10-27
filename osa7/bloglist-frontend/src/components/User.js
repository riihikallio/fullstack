import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const User = (props) => {
  return (
    <>
      <h2>{props.user ? props.user.name : 'Loading...'}</h2>
      <h4>Added blogs:</h4>
      <ul>
        {props.user ? props.user.blogs.map(b => <ul key={b.id}>
          <Link to={`/blogs/${b.id}`}>{b.title}</Link>
        </ul>)
          : null}
      </ul>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  return {
    user: state.users ? state.users.filter(u => u.id === ownProps.userid)[0] : null,
  }
}

const ConnectedUser = connect(mapStateToProps)(User)
export default ConnectedUser
