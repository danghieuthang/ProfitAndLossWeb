import Repository from './Repository'
const resource = '/transaction-types'
export default {
    get () {
        return Repository.get(`${resource}`)
    }
}
