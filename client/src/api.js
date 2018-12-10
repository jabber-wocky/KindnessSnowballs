import axios from 'axios'
import store from '@/store'

export default () => {
  var options = {
    baseURL: process.env.NODE_ENV === 'production' ? '/api' : `http://localhost:8080/api`,
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if (store.getters.hasAuth) {
    options.auth = store.getters.auth
  }

  return axios.create(options)
}
