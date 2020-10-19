import http from '../http-common'

class UserService {
  async userLogin (data) {
    return http.post('https://localhost:44364/api/users/login', data)
  }
  logout () {
    localStorage.removeItem('user')
  }
}
export default new UserService()
