import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // cambia esto si tu API está en otro lado
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export default api