import axios from 'axios'
const url = '/api/login'

const loginService = async (credentials) => {
    const response = await axios.post(url, credentials)
    return response.data
}


export default { loginService }