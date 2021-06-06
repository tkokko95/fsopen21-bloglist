import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, setBlogs, userId}) => {
    const [fullInfo, setFullInfo] = useState(false)

    const handleLikeButton = async () => {
        const response = await blogService.likeBlog(blog)
        const updatedBlogs = await blogService.getAll()
        setBlogs(updatedBlogs) 
    }

    const handleDeleteButton = async () => {
        if (window.confirm(`Confirm deletion of: ${blog.title} by ${blog.author}`)) {
            const response = await blogService.deleteBlog(blog.id)
            window.location.reload()
        }
        

    }

    if (!fullInfo){
        return (
            <div>
                {blog.title} {blog.author} &nbsp;
                <button onClick={() => setFullInfo(true)}>Show</button>
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

export default Blog