  import React from 'react'
  
  const BlogForm = ({
      submit,
      title,
      titleChange,
      author,
      authorChange,
      url,
      urlChange
  }) => (
    <form onSubmit={submit}>
    <h2>Add a blog</h2>
      Title:
      <input
        type="text"
        value={title}
        name="Title"
        onChange={titleChange}
      /><br />
      Author:
        <input
        type="text"
        value={author}
        name="Author"
        onChange={authorChange}
      /><br />
      URL:
        <input
        type="text"
        value={url}
        name="Url"
        onChange={urlChange}
      /><br />
      <button type="submit">save</button>
    </form>  
  )

export default BlogForm