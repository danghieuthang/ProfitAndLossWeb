import Repository from './Repository'
import axios from 'axios'
const resource = '/dashboards'
const baseDomain = 'https://pnl-retail.azurewebsites.net/'
// const baseDomain = 'https://localhost:44383'
const apiVersion = 'V1'
const baseURL = `${baseDomain}/api/${apiVersion}`
const request = axios.create({
    baseURL: baseURL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json'
      },
      timeout: 6000
  })
export default {
    getExpensePie (params) {
        return Repository.get(`${resource}/pie/expense`, { params: params })
    },
    getRevenuesPie (params) {
        return Repository.get(`${resource}/pie/revenues`, { params: params })
    },
    getRevenueExpense (params) {
        return Repository.get(`${resource}/revenue-expenses`, { params: params })
    },
    getProfitAndLoss (params) {
        return Repository.get(`${resource}/profit-and-loss`, { params: params })
    },
    export (params) {
        return request.get(`${resource}/profit-and-loss/export`, { params: params, responseType: 'blob' })
    }

}
