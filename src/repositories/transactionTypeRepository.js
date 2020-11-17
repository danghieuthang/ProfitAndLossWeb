import Repository from './Repository'
const resource = '/receipt-types'
export default {
    get () {
        return Repository.get(`${resource}`)
    }
}
