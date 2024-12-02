import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '@/app/libs/utils/firebase'

const rrss = {
  GetList: async (uid) => {
    try {
      const RRSSListRef = doc(db, 'rrss', uid)
      const RRSSListSnapshot = await getDoc(RRSSListRef)

      if ( RRSSListSnapshot.exists() ) {
        return RRSSListSnapshot.data()
      } else {
        return null
      }
    } catch (error) {
      console.info(`GetList: Error al obtener lista de difusión: ${uid}`)
      console.error(error)
      throw error
    }
  },
  GetLists: async () => {
    try {
      const RRSSListRef = collection(db, 'rrss')
      const querySnapshot = await getDocs(RRSSListRef)

      const RRSSLists = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return RRSSLists
    } catch (error) {
      console.info(`GetLists: Error al obtener listas de difusión`)
      console.error(error)
      throw error
    }
  },
  GetListsByStatus: async (status) => {

  },
  PostLists: async (list) => {
    try {
      await addDoc(collection(db, 'rrss'), list)
      
    } catch (error) {
      console.info(`PostLists: Error al crear lista de difusión`)
      console.error(error)
      throw error
    }
  }
}

export default rrss
