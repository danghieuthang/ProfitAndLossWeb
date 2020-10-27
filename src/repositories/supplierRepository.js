import Repository from './Repository'
const resource = '/suppliers'
export default {
    get () {
        return Repository.get(`${resource}`)
    }
}
