import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
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
  GetAllAccountingToday: async (today) => {
    try {
      const [year, month, day] = today.split('-').map(Number)
      const startDate = new Date(year, month - 1, day, 0, 0, 0, 0)
      const endDate = new Date(year, month -1, day, 23, 59, 59, 999)

      const accountingRef = collection(db, 'accounting')
      const q = query(accountingRef,
        where('accounting.createdAt', '>=', startDate),
        where('accounting.createdAt', '<=', endDate)
      )

      const querySnapshot = await getDocs(q)

      const accounting = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      return accounting
    } catch (error) {
      console.info(`GetAllAccountingToday: Error al obtener ingresos/egresos del día`)
      console.error(error)
      throw error
    }
  },
  GetAllAccountingByMonth: async (month) => {
    try {
      // month = YYYY-MM
      const [year, monthNum] = month.split('-').map(Number)
      const startDate = new Date(year, monthNum -1, 1)
      const endDate = new Date(year, monthNum, 0, 23, 59, 59, 999)

      const accountingRef = collection(db, 'accounting')
      const q = query(accountingRef,
        where('accounting.createdAt', '>=', startDate),
        where('accounting.createdAt', '<=', endDate)
      )

      const querySnapshot = await getDocs(q)

      const accounting = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return accounting
    } catch (error) {
      console.info(`GetAllAccountingByMonth: Error al obtener ingresos/egresos para el mes: ${month}`)
      console.error(error)
      throw error
    }
  },
  GetAllAccountingByMonths: async (months) => {
    try {
      
    } catch (error) {
      console.info(`GetAllAccountingByMonths: Error al obtener ingresos/egresos para el mes: ${month}`)
      console.error(error)
      throw error
    }
  },
  GetAllAccountingBySemester: async (endDateStr) => {
    try {
      const [year, month, day] = endDateStr.split('-').map(Number)
      const endDate = new Date(year, month - 1, day, 23, 59, 59, 999)

      const startDate = new Date (endDate)
      startDate.setMonth(startDate.getMonth() - 6)

      const accountingRef = collection(db, 'accounting')
      const q = query(accountingRef,
        where('accounting.createdAt', '>=', startDate),
        where('accounting.createdAt', '<=', endDate)
      )

      const querySnapshot = await getDocs(q)

      const accounting = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return accounting
    } catch (error) {
      console.info(`GetAllAccountingBySemester: Error al obtener ingresos/egresos para el semestre actual`)
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
  },
  PatchAcconting: async (uid, account, type) => {
    try {
      const accountingDocRef = doc(db, 'accounting', uid)
      await updateDoc(accountingDocRef, account)
    } catch (error) {
      console.info(`PatchAcconting: Error al actualizar ${type}: ${uid}`)
      console.error(error)
      throw error
    }
  }
}

export default accounting