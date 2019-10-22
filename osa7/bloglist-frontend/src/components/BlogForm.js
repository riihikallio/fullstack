import React from 'react'
import PropTypes from 'prop-types'

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

BlogForm.propTypes = {
  submit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  titleChange: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  authorChange: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  urlChange: PropTypes.func.isRequired
}

export default BlogForm