import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'


describe('Togglable', () => {

  const blog = {
    title: 'blog title',
    author: 'Nawal',
    url:'url',
    likes: 12,
    user: { name: 'Nawal', username: 'NawalKH' }
  }

  const user = { name: 'Nawal', username: 'NawalKH' }

  let container

  beforeEach(() => {
    container = render( <Blog blog={blog} user= {user} /> ).container
  })

  test('renders its children', async () => {

    const element = screen.getByText('blog title Nawal', { exact: false })
    expect(element).toBeDefined()
    const nonVisible = screen.queryByText('url 12')
    expect(nonVisible).toBeNull()

  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const closeButton = screen.getByText('hide')
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})


test('clicking the button twice calls event handler twice', async () => {

  const blog = {
    title: 'blog title',
    author: 'Nawal',
    user: { name: 'Nawal', username: 'NawalKH' }
  }

  const bloguser = { name: 'Nawal', username: 'NawalKH' }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} user={bloguser} addLike={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})


test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const blogTitle = screen.getByPlaceholderText('blog title')
  const blogAuthor = screen.getByPlaceholderText('blog author')
  const blogURL = screen.getByPlaceholderText('blog url')

  const sendButton = screen.getByText('create')

  await user.type(blogTitle, 'blog title')
  await user.type(blogAuthor, 'author')
  await user.type(blogURL, 'url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('blog title')
  expect(createBlog.mock.calls[0][0].author).toBe('author')
  expect(createBlog.mock.calls[0][0].url).toBe('url')
})
