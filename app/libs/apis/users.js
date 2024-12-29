import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from '@/app/libs/utils/firebase'

const users = {
  Login: async (email, password) => {
    const q = query(collection(db, 'users'), where('email', '==', email))
    const querySnapshot = await getDocs(q)

    if ( querySnapshot.empty ) {
      return null
    }

    const userDoc = querySnapshot.docs[0]
    const user = userDoc.data()

    const isPasswordValid = password = user.password
    if ( !isPasswordValid ) {
      return null
    }

    return {
      uid: userDoc.id,
      ...user
    }
  },
  GetUser: async (uid) => {
    if ( uid ) {
      try {
        return instance.get(`users/${uid}`)
      } catch (error) {
        console.info(`GetUser: Error al obtener usuario: ${uid}`)
        console.error(error)
        return false
      } 
    }
  },
  GetAllUsers: async () => {
    try {
      return instance.get(`users`)
    } catch (error) {
      console.info(`GetAllUsers: Error al obtener usuarios`)
      console.error(error)
      throw error
    }
  },
  GetAllUsersButMe: async (uid) => {
    try {
      const response = instance.get(`users`)
      const allUsers = response.data
      const users = allUsers.filter(user => user.uid !== uid)
      return users
    } catch (error) {
      console.info(`GetAllUsersButMe: Error al obtener usuarios`)
      console.error(error)
      throw error
    }
  },
  GetAllUsersByStatus: async (status) => {
    try {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('status', '==', status))
      const querySnapshot = await getDocs(q)

      const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      return users
    } catch (error) {
      console.info(`GetAllUsersByStatus: Error al obtener usuarios con el estado: ${status}`)
      console.error(error)
      throw error
    }
  },
  PostUser: async (uid, user) => {
    try {
      await setDoc(doc(db, 'users', uid), user)
    } catch (error) {
      console.info(`PostUser: Error al crear usuario: ${user}`)
      console.error(error)
      throw error
    }
  }
}

export default users