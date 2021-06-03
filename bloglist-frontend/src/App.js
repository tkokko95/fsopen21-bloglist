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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const response = await loginService.login({ username, password })
    setUser(response)
    setUsername('')
    setPassword('')
    window.localStorage.setItem('loggedUser', JSON.stringify(response))
    const fetchedBlogs = await blogService.getAll()
    setBlogs(fetchedBlogs)
  }
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setBlogs([])
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
      <br />
      <button onClick={handleLogout}>Logout</button>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}




export default App