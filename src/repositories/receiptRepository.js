import Repository from './Repository'
const resource = '/receipts'
export default {
    get () {
        return Repository.get(`${resource}`)
    },
    createReceipt () {
        return Repository.post(`${resource}`)
    }
}
