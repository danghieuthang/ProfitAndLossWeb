import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// const baseDomain = 'https://localhost:44383'
const baseDomain = 'https://pnl-retail.azurewebsites.net/'
const apiVersion = 'v1'
const baseURL = `${baseDomain}/api/${apiVersion}`
const request = axios.create({
  baseURL: baseURL,
  headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    },
    timeout: 6000
})
const token = storage.get(ACCESS_TOKEN)

const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    if (data['status-code'] === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (data['status-code'] === 500) {
      notification.error({
        message: 'Internal Server Error',
        description: data.results
      })
    }
    if (data['status-code'] === 400) {
      notification.error({
        message: 'Bad request',
        description: data.results
      })
    }
    if (data['status-code'] === 401) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// xử lí request
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  if (token) {
    config.headers.common['Authorization'] = 'Bearer ' + token
  }
  return config
}, errorHandler)

// xử lí response
request.interceptors.response.use((response) => {
  var res = response.data
  if (res['status-code'] === 401) {
    notification.error({
      message: 'Unauthorized',
      description: 'Authorization verification failed'
    })
      store.dispatch('Logout').then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      })
  } else { return res }
}, errorHandler)

export default request
