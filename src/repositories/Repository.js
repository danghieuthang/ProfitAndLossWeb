import axios from 'axios'

const baseDomain = 'https://localhost:44383'
// const baseDomain = 'https://pnl-swd.azurewebsites.net/'
const apiVersion = 'v1'
const baseURL = `${baseDomain}/api/${apiVersion}`
const TOKEN = 'vidu'

export default axios.create({
    baseURL: baseURL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + TOKEN
      }
})
