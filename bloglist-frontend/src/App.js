import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = event => {
    event.preventDefault()
    console.log('logging in')
  }

  const LoginForm = () => {
    return (
    <div>
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin} />
      <div> 
          name: <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
          password: <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type='submit'>Login</button>
    </div>
    )
  }


  return (
    <div>
      <LoginForm />
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}




export default App