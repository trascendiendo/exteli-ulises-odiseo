import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '@/app/libs/utils/firebase'

const procedures = {
  GetProcedure: async (uid) => {
    try {
      const procedureDocRef = doc(db, 'procedures', uid)
      const procedureDocSnap = await getDoc(procedureDocRef)

      if ( procedureDocSnap.exists() ) {
        return procedureDocSnap.data()
      } else {
        return null
      }

    } catch (error) {
      console.info(`GetProcedure: Error al obtener trámite: ${uid}`)
      console.error(error)
      throw error
    }
  },
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
  },
  PostProcedure: async ( procedure ) => {
    try {
      await addDoc(collection(db, 'procedures'), {
        procedure
      })
    } catch (error) {
      console.info(`PostProcedure: Error al crear trámite`)
      console.error(error)
      throw error
    }
  },
  PatchProcedure: async (uid, procedure) => {
    try {
      const procedureDocRef = doc(db, 'procedures', uid)
      await updateDoc(procedureDocRef, procedure)
    } catch (error) {
      console.info(`PatchProcedure: Error al actualizar trámite: ${uid}`)
      console.error(error)
      throw error
    }
  },
  DeleteProcedure: async (uid) => {
    try {
      const procedureRef = doc(db, 'procedures', uid)
      await deleteDoc(procedureRef)
    } catch (error) {
      console.info(`GetProcedure: Error al eliminar trámite: ${uid}`)
      console.error(error)
      throw error
    }
  }
}

export default procedures
