import { db } from '@/app/libs/utils/firebase'
import { addDoc, collection, getDoc, getDocs } from 'firebase/firestore'

const bills = {
  GetBill: async (uid) => {
    try {
      const billDocRef = doc(db, 'bills', uid)
      const billDocSnap = await getDoc(billDocRef)

      if ( billDocSnap.exists() ) {
        return billDocSnap.data()
      } else {
        return null
      }
    } catch (error) {
      console.info(`GetBill: Error al obtener factura: ${uid}`)
      console.error(error)
      throw error
    }
  },
  GetBills: async () => {
    try {
      const billsRef = collection(db, 'bills')
      const querySnapshot = await getDocs(billsRef)

      const bills = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => a.bill.createdAt - b.bill.createdAt)

      return bills
    } catch (error) {
      console.info(`GetBills: Error al obtener facturas`)
      console.error(error)
      throw error
    }
  },
  GetBillsByStatus: async (status) => {
    try {
      const billsRef = collection(db, 'bills')
      const q = query(billsRef, where('status', '==', status))
      const querySnapshot = await getDocs(q)

      const bills = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return bills
    } catch (error) {
      console.info(`GetBillsByStatus: Error al obtener facturas`)
      console.error(error)
      throw error
    }
  },
  GetBillsByAgent: async (agentUid) => {
    try {
      const billsRef = collection(db, 'bills')
      const q = query(billsRef, where('bill.agent', '==', agentUid))
      //const q = query(billsRef, where('agentUid', '==', agentUid))
      const querySnapshot = await getDocs(q)

      const bills = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return bills
    } catch (error) {
      console.info(`GetBillsByAgent: Error al obtener facturas del agente ${agentUid}`)
      console.error(error)
      throw error
    }
  },
  PostBill: async (bill) => {
    try {
      await addDoc(collection(db, 'bills'), {
        bill
      })
    } catch (error) {
      console.info(`PostBill: Error al crear factura`)
      console.error(error)
      throw error
    }
  },
  DeleteBill: async (uid, bill) => {
    
  }
}

export default bills
