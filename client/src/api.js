import axios from 'axios'

export default() => {
    return axios.create({
        baseURL: process.env.NODE_ENV === 'production' ?  '/api' : `http://localhost:8080/api`,
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}