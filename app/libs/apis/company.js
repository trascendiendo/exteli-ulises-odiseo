import { addDoc, collection, doc, getDocs, query, updateDoc } from "firebase/firestore"
import { db } from '@/app/libs/utils/firebase'

const companies = {
  GetCompany: async (uid) => {
    try {
      
    } catch (error) {
      console.info(`GetCompany: Error al obtener compañias`)
      console.error(error)
      throw error
    }
  },
  GetAllCompanies: async () => {
    try {
      const companiesRef = collection(db, 'companies')
      const querySnapshot = await getDocs(companiesRef)

      const companies = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      return companies
    } catch (error) {
      console.info(`GetAllCompanies: Error al obtener compañias`)
      console.error(error)
      throw error
    }
  },
  GetAllCompaniesByAgent: async (agentUid) => {
    try {
      const companyRef = collection(db, 'companies')
      const q = query(companyRef, where('agent', '===', agentUid))
      const querySnapshot = await getDocs(q)

      const companies = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return companies
    } catch (error) {
      console.info(`GetAllCompaniesByAgent: Error al obtener compañias`)
      console.error(error)
      throw error
    }
  },
  PostCompany: async (company) => {
    try {
      await addDoc(collection(db, 'companies'), company)
    } catch (error) {
      console.info(`PostCompany: Error al crear empresa`)
      console.error(error)
      throw error
    }
  },
  PatchCompany: async (uid, company) => {
    try {
      const companyDocRef = doc(db, 'companies', uid)
      await updateDoc(companyDocRef, company)
    } catch (error) {
      console.info(`PatchCompany: Error al actualizar empresa`)
      console.error(error)
      throw error
    }
  },
  DisableCompany: async (uid) => {
    try {
      const companyDocRef = doc(db, 'companies', uid)
      await updateDoc(companyDocRef, { status: 'inactivo'})
    } catch (error) {
      console.info(`PatchCompany: Error al actualizar empresa`)
      console.error(error)
      throw error
    }
  }
}

export default companies
