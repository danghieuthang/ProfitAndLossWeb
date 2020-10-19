import Repository from './Repository'
const resource = '/users'
export default {
    get () {
        return Repository.get(`${resource}`)
    },
    login (data) {
        return Repository.post(`${resource}/login`, data)
    },
    createReceipt (data) {
        return Repository.post(`${resource}`, data)
    }
}
