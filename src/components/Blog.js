import { useState } from 'react'

const Blog = ({ blog, user, addLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')

  const showDetails = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    visible ? setButtonLabel('view') : setButtonLabel('hide')
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{buttonLabel}</button>

      <div style={showDetails} className="togglableContent">
        <p>{blog.url}</p>
        <p>likes {blog.likes}
          <button onClick={() => addLike(blog)}>like</button></p>
        <p>{blog.user.name}</p>
        {user.username === blog.user.username &&
          <button onClick={() => deleteBlog(blog)}>remove</button>}

      </div>
    </div>
  )
}

export default Blog