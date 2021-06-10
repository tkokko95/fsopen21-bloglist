import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, blogFormRef, setNotification }) => {
    const [blogInfo, setBlogInfo] = useState({
        title: '',
        author: '',
        url: ''
    })

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
        blogFormRef.current.toggleVisibility()
        return response
    }

    return (
        <div>
            <h3>Submit blog</h3>
            <form onSubmit={handleBlogSubmit} className='blogForm'>
                Title: <input onChange={handleBlogFormChange} type='text' name='title' value={blogInfo.title} className='titleField'/> <br />
                Author: <input onChange={handleBlogFormChange} type='text' name='author' value={blogInfo.author} className='authorField'/> <br />
                Url: <input onChange={handleBlogFormChange} type='text' name='url' value={blogInfo.url} className='urlField'/>
                <br />
                <button type='submit' className='blogSubmitButton'>Submit</button>
            </form>
        </div>
    )
}

export default BlogForm