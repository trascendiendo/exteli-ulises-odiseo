import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/app/libs/utils/firebase'

const nationalities = {
  GetAllNationalities: async () => {
    try {
      const nationalitiesRef = collection(db, 'nationalities')
      const querySnapshot = await getDocs(nationalitiesRef)

      const nationalities = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return nationalities
    } catch (error) {
      console.info(`GetAllNationalities: Error al obtener nacionalidades`)
      console.error(error)
      throw error
    }
  }
}

export default nationalities
