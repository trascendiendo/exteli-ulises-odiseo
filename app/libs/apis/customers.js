import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '@/app/libs/utils/firebase'

const customers = {
  GetCustomer: async (uid) => {
    try {
      const customerDocRef = doc(db, 'customers', uid)
      const customerDocSnap = await getDoc(customerDocRef)

      if ( customerDocSnap.exists() ) {
        return customerDocSnap.data()
      } else {
        return null
      }
    } catch (error) {
      console.info(`GetCustomer: Error al obtener cliente: ${uid}`)
      console.error(error)
      throw error
    }
  },
  GetAllCustomers: async () => {
    try {
      const customersRef = collection(db, 'customers')
      const querySnapshot = await getDocs(customersRef)
      

      const customers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => a.customer.createdAt - b.customer.createdAt)

      return customers
    } catch (error) {
      console.info(`GetAllCustomers: Error al obtener clientes`)
      console.error(error)
      throw error
    }
  },
  GetCustomersByStatus: async (status) => {
    try {
      const customersRef = collection(db, 'customers')
      const q = query(customersRef, where('status', '==', status))
      const querySnapshot = await getDocs(q)

      const customers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return customers
    } catch (error) {
      console.info(`GetCustomersByStatus: Error al obtener usuarios`)
      console.error(error)
      throw error
    }
  },
  PostCustomer: async (customer) => {
    try {
      await addDoc(collection(db, 'customers'), {
        customer
      })
    } catch (error) {
      console.info(`PostCustomer: Error al crear usuario`)
      console.error(error)
      throw error
    }
  },
  PatchCustomer: async (uid, customer) => {
    try {
      const customerDocRef = doc(db, 'customers', uid)
      await updateDoc(customerDocRef, customer)
    } catch (error) {
      console.info(`PatchCustomer: Error al actualizar usuario: ${uid}`)
      console.error(error)
      throw error
    }
  }
}

export default customers
