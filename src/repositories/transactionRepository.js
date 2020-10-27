import Repository from './Repository'
const resource = '/transactions'
export default {
    search (params) {
        return Repository.post(`${resource}/search`, params)
    },
    searchById (id) {
        return Repository.get(`${resource}/${id}`)
    },
    create (data) {
        return Repository.post(`${resource}`, data)
    },
    approval (id) {
        return Repository.put(`${resource}/approval`, id)
    },
    reject (id) {
        return Repository.put(`${resource}/reject`, id)
    }
}
