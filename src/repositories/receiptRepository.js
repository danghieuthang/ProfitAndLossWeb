import Repository from './Repository'
const resource = '/receipts'
export default {
    get (params) {
        return Repository.get(`${resource}`, { params: params })
    },
    createReceipt (data) {
        return Repository.post(`${resource}`, data)
    },
    getEvidenceByTransactionId (id) {
        return Repository.get(`${resource}/search/${id}`)
    }
}
