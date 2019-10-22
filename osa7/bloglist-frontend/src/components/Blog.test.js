import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent } from '@testing-library/dom'
import { render, cleanup } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('BlogList Blog renders content', () => {
  const blog = {
    title: 'Joutavaa juorua',
    author: 'Joku vain',
    url: 'https://example.com',
    likes: 5,
    user: { username: 'Roope' }
  }
  const open = ''
  const setOpen = () => null
  const setList = () => null
  const user = { username: 'Roope' }
  const component = render(
    <Blog
      blog={blog}
      open={open}
      setOpen={setOpen}
      setList={setList}
      user={user}
    />
  )

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).not.toHaveTextContent('added by')
})

test('Clicking a blog shows added by', () => {
  const blog = {
    id: 'abcd',
    title: 'Joutavaa juorua',
    author: 'Joku vain',
    url: 'https://example.com',
    likes: 5,
    user: { username: 'Roope' }
  }
  let open = ''
  const setOpen = () => { open = blog.id; console.log('Osui') }
  const setList = () => null
  const user = { username: 'Roope' }

  const { getByTestId } = render(
    <Blog
      blog={blog}
      open={open}
      setOpen={setOpen}
      setList={setList}
      user={user}
    />
  )

  const blogEntry = getByTestId(blog.id)
  fireEvent.click(blogEntry)

  const { container } = render(
    <Blog
      blog={blog}
      open={open}
      setOpen={setOpen}
      setList={setList}
      user={user}
    />
  )
  expect(container).toHaveTextContent(blog.title)
  expect(container).toHaveTextContent('added by')
})