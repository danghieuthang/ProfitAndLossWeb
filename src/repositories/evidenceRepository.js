import Repository from './Repository'
const resource = '/evidences'
export default {
    addEvidence (formData) {
        return Repository.post(`${resource}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    add (data) {
        return Repository.post(`${resource}`, data)
    }
}
