import React from 'react'

const BlogForm = ({ handleBlogSubmit, handleBlogFormChange, blogInfo }) => {
    return (
        <div>
            <h3>Submit blog</h3>
            <form onSubmit={handleBlogSubmit}>
                Title: <input onChange={handleBlogFormChange} type='text' name='title' value={blogInfo.title} /> <br />
                Author: <input onChange={handleBlogFormChange} type='text' name='author' value={blogInfo.author}/> <br />
                Url: <input onChange={handleBlogFormChange} type='text' name='url' value={blogInfo.url}/>
                <br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )    
}

export default BlogForm