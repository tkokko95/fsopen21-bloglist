import React, { useState, useEffect } from 'react'
//import Blog from './components/Blog'
//import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('mounted');
 
    return () => { 
        console.log('unmounted')
    }
 }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const response = await loginService.login({ username, password })
    setUser(response.token)
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
      logged in
    </div>
  )

}




export default App