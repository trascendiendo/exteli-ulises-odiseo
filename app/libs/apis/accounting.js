import { addDoc, collection, getDoc, getDocs } from 'firebase/firestore'
import { db } from '@/app/libs/utils/firebase'

const accounting = {
  GetAccounting: async (uid) => {
    try {
      const accountingRef = doc(db, 'accounting', uid)
      const accountingSnapshot = await getDoc(accountingRef)

      if ( accountingSnapshot.exists() ) {
        return accountingSnapshot.data()
      } else {
        return null
      }
    } catch (error) {
      console.info(`GetAccount: Error al obtener ingreso/egreso: ${uid}`)
      console.error(error)
      throw error
    }
  },
  GetAllAccounting: async () => {
    try {
      const accountingRef = collection(db, 'accounting')
      const querySnapshot = await getDocs(accountingRef)

      const accounting = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return accounting
    } catch (error) {
      console.info(`GetAllAccounting: Error al obtener ingresos/egresos`)
      console.error(error)
      throw error
    }
  },
  PostAccounting: async ( accounting ) => {
    try {
      await addDoc(collection(db, 'accounting'), {
        accounting
      })

    } catch (error) {
      console.info(`PostAccounting: Error al registrar ingreso/egreso`)
      console.error(error)
      throw error
    }
  }
}

export default accounting