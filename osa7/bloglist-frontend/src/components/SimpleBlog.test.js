import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent } from '@testing-library/dom'
import { render, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Joutavaa juorua',
    author: 'Joku vain',
    url: 'https://example.com',
    likes: 5
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(blog.title)
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Joutavaa juorua',
    author: 'Joku vain',
    url: 'https://example.com',
    likes: 5
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})