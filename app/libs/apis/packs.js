import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/app/libs/utils/firebase'

const packs = {
  GetPack: async (uid) => {
    try {
      
    } catch (error) {
      console.info(`GetPack: Error al obtener pack: ${uid}`)
      console.error(error)
      throw error
    }
  },
  GetPacks: async () => {
    try {
      const packsRef = collection(db, 'packs')
      const querySnapshot = await getDocs(packsRef)

      const packs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return packs
    } catch (error) {
      console.info(`GetPacks: Error al obtener packs`)
      console.error(error)
      throw error
    }
  },
  PostPack: async ( packs ) => {
    try {
      await addDoc(collection(db, 'packs'), {
        packs
      })
      
    } catch (error) {
      console.info(`PostPack: Error al crear pack`)
      console.error(error)
      throw error
    }
  }
}

export default packs
