import { Suspense, useEffect, useState } from "react"
import { serverTimestamp } from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'universal-cookie';
import Apis from '@/app/libs/apis';
import SkeletonTimeline from "@/app/ui/components/skeletons/organisms/Timeline/Timeline";

const Customer = ({
  uid,
  sesionUser
}) => {
  const cookies = new Cookies
  const [user, setUser] = useState({})
  const [agent, setAgent] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [timeline, setTimeline] = useState(null)
  const [comment, setComment] = useState('')
  const [error, setError] = useState(null)

  const handleLineSubmit = async () => {
    const line = {
      registerdBy: user,
      comment: comment,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    await Apis.timelines.PostLine(customer, line)
      .then(() => {
        toast.success('Comentario registrado con éxito.')
      })
      .catch((error) => {
        toast.error('Error al registrar un comentario.')
        console.error(error)
      })
      .finally(() => {
         window.location.reload()
      })
  }

  useEffect(() => {
    const getUser = () => {
      const userRes = cookies.get('user')
      if ( userRes ) setUser(userRes)
    }
    getUser()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCustomer = await Apis.customers.GetCustomer(uid)
        setCustomer(resCustomer.customer.timeline)
        setAgent(resCustomer.customer.agent)
        const resTimeline = await Apis.timelines.GetLine(resCustomer.customer.timeline)
        setTimeline(resTimeline)
      } catch (error) {
        console.info('organisms/Timeline/Timleline.js/fetchData()')
        console.error(`Error al cargar la data`)
        setError(error)
      }
    }
    fetchData()
  }, [uid])

  if ( error ) {
    return <SkeletonTimeline />
  }

  if ( !timeline ) {
    return null
  }

  return (
    <>
      <div className='timeline flex flex-col items-center justify-start'>
        <div className='timeline__content md:w-10/12'>
          {Object.keys(timeline).length && (
            timeline.map(line => (
              <div 
                className='timeline__item'
                key={line.id}
              >
                <div className='item__content'>
                  <span>
                    {line.createdAt}
                  </span>
                  <p>
                    {line.comment}
                  </p>
                  <div className='timeline__author'>
                    <span>
                      {line.registerdBy.firstName} {line.registerdBy.lastName}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {sesionUser == agent && (
          <div className='timeline__line mt-6 md:w-10/12'>
            <span className="block text-sm">Dejar un comentario</span>
            <textarea
              className={`block border mt-2 rounded-lg px-3 py-3.5 text-sm w-full`}
              style={{ resize: 'none'}}
              placeholder='Comentario...'
              rows='7'
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
            >
            </textarea>
            <button
              className="btn btn-primary mt-4 w-full md:w-5/12"
              onClick={handleLineSubmit}
            >
              Registrar
            </button>
          </div>
        )}
      </div>
      <Toaster />
    </>
  )
}

const Timeline = ({ uid, sesionUser }) => {
  return (
    <Suspense fallback={<SkeletonTimeline />}>
      <Customer uid={uid} sesionUser={sesionUser} />
    </Suspense>
  )
}

export default Timeline
