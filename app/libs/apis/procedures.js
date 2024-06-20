import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/app/libs/utils/firebase'

const procedures = {
  GetAllProcedures: async () => {
    try {
      const proceduresRef = collection(db, 'procedures')
      const querySnapshot = await getDocs(proceduresRef)

      const procedures = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return procedures
    } catch (error) {
      console.info(`GetAllProcedures: Error al obtener trámites`)
      console.error(error)
      throw error
    }
  }
}

export default procedures
