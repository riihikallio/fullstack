import React from 'react'
import { Link } from 'react-router-dom'

const NavLinks = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">Blogs</Link>
      <Link style={padding} to="/users">Users</Link>
    </div>
  )
}

export default NavLinks