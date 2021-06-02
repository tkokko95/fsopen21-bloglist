import React, { useState, useEffect } from 'react'
//import Blog from './components/Blog'
//import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    console.log('mounted');
 
    return () => { 
        console.log('unmounted')
    }
 }, [])

  const handleLogin = event => {
    event.preventDefault()
    const credentials = {
      username: username,
      password: password
    }
    loginService.login(credentials)
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


  return (
    <div>
      <LoginForm />
    </div>
  )
}




export default App