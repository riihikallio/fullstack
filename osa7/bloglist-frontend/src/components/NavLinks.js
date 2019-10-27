import React from 'react'
import { Link } from 'react-router-dom'

const NavLinks = ({ username, logout }) => {
  const padding = {
    paddingRight: 15
  }
  if(username){
    return (
      <div>
        <Link style={padding} to="/">Blogs</Link>
        <Link style={padding} to="/users">Users</Link>
        {username} logged in <button onClick={() => logout()}>logout</button>
      </div>
    )
  } else {
    return (
      <div>
        <Link style={padding} to="/">Blogs</Link>
        <Link style={padding} to="/users">Users</Link>
      </div>
    )
  }
}

export default NavLinks