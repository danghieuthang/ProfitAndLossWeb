import Repository from './Repository'
const resource = '/stores'
export default {
    get () {
        return Repository.get(`${resource}`)
    }
}
