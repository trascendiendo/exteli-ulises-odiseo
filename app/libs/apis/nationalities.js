import { addDoc, collection, getDoc, getDocs } from 'firebase/firestore'
import { db } from '@/app/libs/utils/firebase'

const nationalities = {
  GetNationality: async (uid) => {
    try {
      const nationalityRef = doc(db, 'nationalities', uid)
      const nationalitySnapshot = await getDoc(nationalityRef)

      if ( nationalitySnapshot.exists() ) {
        return nationalitySnapshot.data()
      } else {
        return null
      }
    } catch (error) {
      console.info(`GetNationality: Error al obtener nacionalidad: ${uid}`)
      console.error(error)
      throw error
    }
  },
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
  },
  PostNationality: async ( nationality ) => {
    try {
      await addDoc(collection(db, 'nationalities'), {
        nationality
      })
      
    } catch (error) {
      console.info(`PostNationality: Error al crear nacionalidad`)
      console.error(error)
      throw error
    }
  }
}

export default nationalities
