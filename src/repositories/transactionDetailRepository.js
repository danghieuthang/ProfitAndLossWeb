import Repository from './Repository'
const resource = '/transaction-details'
export default {
    create (data) {
        return Repository.post(`${resource}`, data)
    }
}
