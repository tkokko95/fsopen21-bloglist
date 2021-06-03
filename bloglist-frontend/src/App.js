import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const response = await loginService.login({ username, password })
    setUser(response)
    setUsername('')
    setPassword('')
  }


  const LoginForm = () => {
    return (
    <div>
      <h2>LOGIN</h2>
      <br />
      <form onSubmit={handleLogin}>
        <div> 
            name: <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
            <br />
            password: <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <LoginForm />
      </div>
    )
    }

  return (
    <div>
      Logged in as {user.name ? user.name : user.username}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}




export default App