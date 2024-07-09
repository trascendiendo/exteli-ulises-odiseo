import { addDoc, collection, doc, getDocs, setDoc, query, orderBy } from 'firebase/firestore'
import { db } from '@/app/libs/utils/firebase'

const lines = {
  GetLine: async (uid) => {
    try {
      const lineDocRef = collection(db, 'timelines', uid, 'lines')
      const q = query(lineDocRef, orderBy('createdAt', 'asc'))

      const querySnapshot = await getDocs(q)

      const lines = querySnapshot.docs.map(doc => {
        const data = doc.data()
        const createdAtFormatted = data.createdAt
          ? new Intl.DateTimeFormat('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }).format(data.createdAt.toDate())
          : null
        return {
          id: doc.id,
          ...data,
          createdAt: createdAtFormatted
        }
      })

      return lines
    } catch (error) {
      console.info(`GetLine: Error al obtener hitos o eventos: ${uid}`)
      console.error(error)
      throw error
    }
  },
  GetLines: async () => {
    try {
      const linesRef = collection(db, 'timelines')
      const querySnapshot = await getDocs(linesRef)

      const lines = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return lines
    } catch (error) {
      console.info(`GetLines: Error al obtener hitos o eventos`)
      console.error(error)
      throw error
    }
  },
  PostLine: async (uid, line) => {
    try {
      const lineDocRef = doc(collection(db, 'timelines', uid, 'lines'))
      await setDoc(lineDocRef, line)
      return {
        success: true,
        id: lineDocRef.id
      }
    } catch (error) {
      console.info(`PostLine: Error al crear hito o evento`)
      console.error(error)
      throw error
    }
  },
  PostTimeline: async (timeline) => {
    try {
      const timelineDocRef = doc(collection(db, 'timelines'))
      const timelineUid = timelineDocRef.id

      const linesDocRef = doc(collection(db, `timelines/${timelineUid}/lines`))
      const linesUid = linesDocRef.id

      await setDoc(linesDocRef, {...timeline, uid: linesUid})

      return timelineDocRef
    } catch (error) {
      console.info(`PostTimeline: Error al crear timeline`)
      console.error(error)
      throw error
    }
  }
}

export default lines