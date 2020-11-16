import firebase from '@/config/firebase.config'

const db = firebase.database().ref('/news/link')

class FirebaseService {
  getNews () {
    return db
  }
}
export default new FirebaseService()
