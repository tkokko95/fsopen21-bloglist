import React, { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { ErrorMessage, Notification } from './components/Notifications'
import './App.css'


const App = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [notification, setNotification] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        updateBlogs()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const parsedUser = JSON.parse(loggedUserJSON)
            setUser(parsedUser)
            blogService.setToken(parsedUser.token)
        }
    }, [])

    const handleLoginFormChange = (event) => {
        const value = event.target.value
        setCredentials({
            ...credentials,
            [event.target.name]: value
        })
    }

    const updateBlogs = async () => {
        const updatedBlogs = await blogService.getAll()
        updatedBlogs.sort((a, b) => {
            return b.likes - a.likes
        })
        setBlogs(updatedBlogs)

    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const response = await loginService.login(credentials)
            setUser(response)
            setCredentials({
                username: '',
                password: ''
            })
            window.localStorage.setItem('loggedUser', JSON.stringify(response))
            blogService.setToken(response.token)
            updateBlogs()
        } catch (error) {
            setErrorMessage('Incorrect username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
        setBlogs([])
    }

    if (user === null) {
        return (
            <div>
                <ErrorMessage error={errorMessage}/>
                <Togglable buttonLabel='Log in' className='loginButton'>
                    <LoginForm
                        handleLogin={handleLogin}
                        handleLoginFormChange={handleLoginFormChange}
                        credentials={credentials}
                    />
                </Togglable>
            </div>
        )
    }

    return (
        <div>
            <div><Notification message={notification} />
                Logged in as {user.name ? user.name : user.username}
                <br />
                <button onClick={handleLogout}>Logout</button>
                <ErrorMessage error={errorMessage} />
            </div>
            <div>
                <h2>Blogs</h2>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} userId={user.id} setBlogs={setBlogs}/>
                )}
            </div>
            <br />
            <div>
                <Togglable ref={blogFormRef} buttonLabel='Submit blog'>
                    <BlogForm
                        setBlogs={setBlogs}
                        blogFormRef={blogFormRef}
                        setNotification={setNotification}/>
                </Togglable>
            </div>
        </div>
    )

}

export default App