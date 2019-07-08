import React from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, open, setOpen, list, setList }) => {

  const like = async () => {
    const updated = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await blogService.update(blog.id, updated)
    const newList = await blogService.getAll()
    setList(newList)
  }

  let details = ''
  if (blog.id === open) {
    details = <>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>{blog.likes} likes <button onClick={ () => like() }>Like</button></div>
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
  )
}

export default Blog