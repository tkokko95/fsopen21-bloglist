import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import {Notification, ErrorMessage} from './components/Notifications'
import './App.css'


const App = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [blogInfo, setBlogInfo] = useState({
        title: '',
        author: '',
        url: ''
    })
    const [notification, setNotification] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
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

    const handleLoginFormChange = (event) => {
        const value = event.target.value
        setCredentials({
            ...credentials,
            [event.target.name]: value
        })
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
            const fetchedBlogs = await blogService.getAll()
            setBlogs(fetchedBlogs)
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

    const handleBlogFormChange = (event) => {
        const value = event.target.value
        setBlogInfo({
            ...blogInfo,
            [event.target.name]: value
        })
    }

    const handleBlogSubmit = async (event) => {
        event.preventDefault()
        const response = await blogService.submitBlog(blogInfo)
        setNotification(`Added: ${blogInfo.title} by ${blogInfo.author}`)
        setTimeout(() => {
            setNotification(null)
        }, 5000)
        setBlogInfo({
            title: '',
            author: '',
            url: ''
        })
        const fetchedBlogs = await blogService.getAll()
        setBlogs(fetchedBlogs)   
    }


    if (user === null) {
        return (
            <div>
                <ErrorMessage error={errorMessage} />
                <LoginForm handleLogin={handleLogin} handleLoginFormChange={handleLoginFormChange} credentials={credentials}/>
            </div>
        )
    }

    return (
        <div>
            <Notification message={notification} />
            Logged in as {user.name ? user.name : user.username}
            <br />
            <button onClick={handleLogout}>Logout</button>
            <ErrorMessage error={errorMessage} />
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
            <br />
            <BlogForm handleBlogSubmit={handleBlogSubmit} handleBlogFormChange={handleBlogFormChange} blogInfo={blogInfo}/>
        </div>
    )

}




export default App