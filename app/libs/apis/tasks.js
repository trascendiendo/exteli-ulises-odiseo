import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/app/libs/utils/firebase'

const tasks = {
  GetTask: async (uid) => {
    try {
      const taskDocRef = doc(db, 'tasks', uid)
      const taskDocSnap = await getDoc(taskDocRef)

      if ( taskDocSnap.exists() ) {
        return taskDocSnap.data()
      } else {
        return null
      }
      
    } catch (error) {
      console.info(`GetTask: Error al obtener tarea: ${uid}`)
      console.error(error)
      throw error
    }
  },
  GetTasks: async () => {
    try {
      const tasksRef = collection(db, 'tasks')
      const querySnapshot = await getDocs(tasksRef)

      const tasks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return tasks
    } catch (error) {
      console.info(`GetTasks: Error al obtener tareas`)
      console.error(error)
      throw error
    }
  },
  PostTask: async (task) => {
    try {
      await addDoc(collection(db, 'tasks'), {
        task
      })
    } catch (error) {
      console.info(`PostTask: Error al crear tarea`)
      console.error(error)
      throw error
    }
  }
}

export default tasks
