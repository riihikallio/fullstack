import React from 'react'

const Blog = ({ blog, open, setOpen }) => {
  let details = ''
  if (blog.id === open) {
    details = <>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>{blog.likes} likes <button>Like</button></div>
        <div>added by {blog.user.name}</div>
    </>
  }
return (
  <div className="blog" >
    <div onClick={() => {(blog.id !== open) ? setOpen(blog.id) : setOpen('') }}>
      {blog.title} (by {blog.author})
    </div>
    {details}
  </div>
)}

export default Blog