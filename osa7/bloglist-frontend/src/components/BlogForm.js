import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Label } from 'semantic-ui-react'

const BlogForm = ({
  submit,
  title,
  titleChange,
  author,
  authorChange,
  url,
  urlChange
}) => (
  <Form onSubmit={submit}>
    <h2>Add a blog</h2>
    <Form.Field>
      <Label>Title:</Label>
      <input
        type="text"
        value={title}
        name="Title"
        onChange={titleChange}
      />
    </Form.Field>
    <Form.Field>
      <Label>Author:</Label>
      <input
        type="text"
        value={author}
        name="Author"
        onChange={authorChange}
      />
    </Form.Field>
    <Form.Field>
      <Label>URL:</Label>
      <input
        type="text"
        value={url}
        name="Url"
        onChange={urlChange}
      />
    </Form.Field>
    <Button type="submit">save</Button>
  </Form>
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