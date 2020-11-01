import Repository from './Repository'
const resource = '/accounting-periods'
export default {
    search (params) {
        return Repository.get(`${resource}/search`, { params: params })
    },
    getAll () {
        return Repository.get(`${resource}`)
    },
    searchById (id) {
        return Repository.get(`${resource}/${id}`)
    },
    create (data) {
        return Repository.post(`${resource}`, data)
    },
    update (data) {
        return Repository.put(`${resource}`, data)
    },
    delete (id) {
        return Repository.put(`${resource}/delete`, id)
    }
}
