import axios from 'axios'

const baseDomain = 'https://localhost:44364'
const baseURL = `${baseDomain}/api`
const TOKEN = 'vidu'

export default axios.create({
    baseURL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + TOKEN
      }
})
