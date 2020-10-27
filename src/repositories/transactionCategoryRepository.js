import Repository from './Repository'
const resource = '/transaction-categories'
export default {
    get () {
        return Repository.get(`${resource}`)
    },
    getByTypeId (id) {
        return Repository.get(`${resource}/${id}`)
    }
}
