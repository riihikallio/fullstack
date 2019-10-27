import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const User = (props) => {
  console.log('UserRender', props)
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
  console.log('User:', state)
  console.log('OwnProps:', ownProps)
  return {
    user: state.users ? state.users.filter(u => u.id === ownProps.userid)[0] : null,
  }
}

const ConnectedUser = connect(mapStateToProps)(User)
export default ConnectedUser
