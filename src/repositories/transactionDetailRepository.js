import Repository from './Repository'
const resource = '/transactions'
export default {
    create (data) {
        return Repository.post(`${resource}`, data)
    },
    update (data) {
        return Repository.put(`${resource}`, data)
    },
    searchByTransactionId (id) {
        return Repository.get(`${resource}/receipt/${id}`)
    }
}
