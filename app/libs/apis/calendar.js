import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore'
import { db } from '@/app/libs/utils/firebase'
import { callback } from 'chart.js/dist/helpers/helpers.core'

const calendar = {
  GetEvent: async (uid) => {
    try {
      const eventDocRef = doc(db, 'calendar', uid)
      const eventDocSnap = await getDoc(eventDocRef)

      if ( eventDocSnap.exists() ) {
        return eventDocSnap.data()
      } else {
        return null
      }
    } catch (error) {
      console.info(`GGetEventtBill: Error al obtener evento: ${uid}`)
      console.error(error)
      throw error
    }
  },
  GetEvents: async () => {
    try {
      const eventRef = collection(db, 'calendar')
      const q = query(eventRef, orderBy('createdAt', 'desc'))

      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        const events = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        callback(events)
      })

      return unsubscribe
    } catch (error) {
      console.info(`GetEvents: Error al obtener eventos`)
      console.error(error)
      throw error
    }
  },
  PostEvent: async (event) => {
    try {
      await addDoc(collection(db, 'calendar'), event)
    } catch (error) {
      console.info(`PostEvent: Error al crear evento`)
      console.error(error)
      throw error
    }
  },
  PatchEvent: async (uid) => {

  },
  DeleteEvent: async (uid) => {
    try {
      const eventDocRef = doc(db, 'calendar', uid)
      await deleteDoc(eventDocRef)
    } catch (error) {
      console.info(`DeleteEvent: Error al cancelar el evento ${uid}`)
      console.error(error)
      throw error
    }
  }
}

export default calendar
