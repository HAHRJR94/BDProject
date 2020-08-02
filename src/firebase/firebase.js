import app from 'firebase/app'
import FirebaseConfig from './config'
import 'firebase/firestore'

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(FirebaseConfig)
    }

    this.db = app.firestore()
  }

}

const firebase = new Firebase()

export default firebase
