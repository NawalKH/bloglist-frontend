import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [blogUrl, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>

      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        Title:
        <input
          id='blog-title'
          value={blogTitle}
          placeholder='blog title'
          onChange={({ target }) => setTitle(target.value)}
        />
        Author:
        <input
          id='blog-author'
          value={blogAuthor}
          placeholder='blog author'
          onChange={({ target }) => setAuthor(target.value)}
        />
        Url:
        <input
          id='blog-url'
          value={blogUrl}
          placeholder='blog url'
          onChange={({ target }) => setUrl(target.value)}
        />
        <button id='add-blog-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm