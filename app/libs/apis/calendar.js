import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, orderBy, query } from 'firebase/firestore'
import { db } from '@/app/libs/utils/firebase'
import calendarDayformat from '../utils/calendarDayformat'

const calendar = {
  GetEvent: async (uid) => {
    try {
      const eventDocRef = doc(db, 'calendar', uid)
      const eventDocSnap = await getDoc(eventDocRef)

      if ( eventDocSnap.exists() ) {
        return eventDocSnap.data()
      } else {
        return null
      }
    } catch (error) {
      console.info(`GGetEventtBill: Error al obtener evento: ${uid}`)
      console.error(error)
      throw error
    }
  },
  GetTodayHours: async (date) => {
    try {
      const [year, month, day] = date.split('-').map(Number)

      const eventRef = collection(db, 'calendar')
      const querySnapshot = await getDocs(eventRef)

      const takenHours = []
      querySnapshot.forEach((doc) => {
        const eventData = doc.data()
        const { start, end } = eventData
        const eventStart = new Date(start.seconds * 1000)
        const eventEnd = new Date(end.seconds * 1000)

        if (
          eventStart.getFullYear() === year &&
          eventStart.getMonth() === month - 1 &&
          eventStart.getDate() === day
        ) {
          let current = new Date(eventStart)
          while ( current < eventEnd ) {
            takenHours.push(current.getHours() * 60 + current.getMinutes())
            current.setMinutes(current.getMinutes() + 10)
          }
        }
      })

      const availableHours = []
      for (let hour = 10; hour <= 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const totalMinutes = hour * 60 + minute
          if ( !takenHours.includes(totalMinutes) ) {
            const formattedHour = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            availableHours.push(formattedHour)
          }
        }
      }
      return availableHours
    } catch (error) {
      console.info(`GetTodayHours: Error al obtener horas disponibles`)
      console.error(error)
      throw error
    }
  },
  GetEvents: async (uid) => {
    try {
      const eventRef = collection(db, 'calendar', uid, 'events')
      const querySnapshot = await getDocs(eventRef)

      const events = querySnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          start: calendarDayformat(data.start),
          end: calendarDayformat(data.end)
        }
      })
      return events
    } catch (error) {
      console.info(`GetEvents: Error al obtener eventos`)
      console.error(error)
      throw error
    }
  },
  PostEvent: async (uid, event) => {
    try {
      const eventRef = collection(db, 'calendar', uid, 'events')
      await addDoc(eventRef, event)
    } catch (error) {
      console.info(`PostEvent: Error al crear evento ${event} para el usuario ${uid}`)
      console.error(error)
      throw error
    }
  },
  PatchEvent: async (uid) => {

  },
  DeleteEvent: async (uid) => {
    try {
      const eventDocRef = doc(db, 'calendar', uid)
      await deleteDoc(eventDocRef)
    } catch (error) {
      console.info(`DeleteEvent: Error al cancelar el evento ${uid}`)
      console.error(error)
      throw error
    }
  }
}

export default calendar
