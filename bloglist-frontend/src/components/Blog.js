import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs, userId }) => {
    const [fullInfo, setFullInfo] = useState(false)

    const handleLikeButton = async () => {
        const response = await blogService.likeBlog(blog)
        const updatedBlogs = await blogService.getAll()
        setBlogs(updatedBlogs)
        return response
    }

    const handleDeleteButton = async () => {
        if (window.confirm(`Confirm deletion of: ${blog.title} by ${blog.author}`)) {
            setFullInfo(false)
            const response = await blogService.deleteBlog(blog.id)
            setTimeout(async () => {
                const updatedBlogs = await blogService.getAll()
                updatedBlogs.sort((a, b) => {
                    return b.likes - a.likes
                })
                console.log(updatedBlogs)
                setBlogs(updatedBlogs)
                return response
            }, 500)
        }

    }
    if (!fullInfo){
        return (
            <div className='titleAuthor'>
                {blog.title} {blog.author} &nbsp; <button onClick={() => setFullInfo(true)} className='infoButton'>Show</button>
            </div>
        )
    }
    return (
        <div className='blogInfoBox'>
            {blog.title} <br />
            {blog.author} <br />
            {blog.url} <br />
            Likes: {blog.likes} <button onClick={handleLikeButton}>Like</button> <br />
            {blog.user.name} <br />
            <button onClick={() => setFullInfo(false)}>Hide</button>
            {blog.user.id === userId ? <button onClick={handleDeleteButton}>Delete</button> : null}
        </div>
    )
}
Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired
}

export default Blog