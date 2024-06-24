import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from '@/app/libs/utils/firebase'

const users = {
  GetUser: async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid)
      const userDocSnap = await getDoc(userDocRef)

      if ( userDocSnap.exists() ) {
        return userDocSnap.data()
      } else {
        return null
      }
      
    } catch (error) {
      console.info(`GetUser: Error al obtener usuario: ${uid}`)
      console.error(error)
      throw error
    }
  },
  GetAllUsers: async () => {
    try {
      const usersRef = collection(db, 'users')
      const querySnapshot = await getDocs(usersRef)

      const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return users
    } catch (error) {
      console.info(`GetAllUsers: Error al obtener usuarios`)
      console.error(error)
      throw error
    }
  },
  GetAllUsersButMe: async (uid) => {
    try {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('uid', '!=', uid))
      const querySnapshot = await getDocs(q)

      const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      return users
    } catch (error) {
      console.info(`GetAllUsersButMe: Error al obtener usuarios`)
      console.error(error)
      throw error
    }
  },
  PostUser: async (user) => {
    try {
      await setDoc(doc(db, 'users'), {
        user
      })
    } catch (error) {
      console.info(`PostUser: Error al crear usuario: ${user}`)
      console.error(error)
      throw error
    }
  }
}

export default users