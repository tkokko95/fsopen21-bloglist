import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const submitBlog = async (blogObj) => {
    const cfg = {
        headers: {
            Authorization: token
        }
    }
    const response = await axios.post(baseUrl, blogObj, cfg)
    return response.data
}

const likeBlog = async (blog) => {
    const newLikes = blog.likes + 1
    const newBlogData = {
        user: blog.user.id,
        likes: newLikes,
        author: blog.author,
        title: blog.title,
        url: blog.url
    }
    const response = await axios.put(`${baseUrl}/${blog.id}`, newBlogData)
    return response.data
}

const deleteBlog = async (blogId) => {
    const cfg = {
        headers: {
            Authorization: token
        }
    }
    const response = axios.delete(`${baseUrl}/${blogId}`, cfg)
    return response.data
}

export default { getAll, submitBlog, setToken, likeBlog, deleteBlog }