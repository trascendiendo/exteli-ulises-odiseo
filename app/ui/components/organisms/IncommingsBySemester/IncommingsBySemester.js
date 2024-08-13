import { Suspense, useEffect, useState } from 'react'
import { 
  ArrowFatLinesDown, 
  ArrowFatLinesUp } 
from '@phosphor-icons/react/dist/ssr'
import Apis from '@/app/libs/apis';
import SkeletonIncommingsCard from '@/app/ui/components/skeletons/organisms/SkeletonIncommingsCard/SkeletonIncommingsCard'

const Card = () => {
  const [prevIncomming, setPrevIncomming] = useState(null)
  const [incommings, setIncommings] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getSemester = () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    const getPrevSemester = () => {
      const now = new Date()
      now.setMonth(now.getMonth() - 6)
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    const prevSemester = getPrevSemester()
    const semester = getSemester()
    let incommingPrevMonth = 0
    let incommingMonth = 0
    const fetchData = async () => {
      try {
        const res = await Apis.accounting.GetAllAccountingByMonth(semester)
        if (res) {
          res.forEach(item => {
            const amount = parseFloat(item.accounting.amount)
            incommingMonth += amount
          })
        }
        const prevRes = await Apis.accounting.GetAllAccountingByMonth(prevSemester)
        if (prevRes) {
          prevRes.forEach(item => {
            const amount = parseFloat(item.accounting.amount)
            incommingPrevMonth += amount
          })
        }
        setIncommings(incommingMonth)
        setPrevIncomming(incommingPrevMonth)
      } catch (error) {
        console.info('organisms/IncommingsByMonth/IncommingsByMonth.js/fetchData()')
        console.error(`Error al cargar la data`)
        setError(error)
      }
    }
    fetchData()
  }, [])

  if ( error ) {
    return <SkeletonIncommingsCard />
  }

  if ( !incommings ) {
    return null
  }

  return (
    <div className="card">
      <div className="card__body">
        <div className={`absolute right-4 top-4 accountingBlug ${incommings > prevIncomming ? 'up' : 'down'}`}>
          {incommings > prevIncomming ? (
            <ArrowFatLinesUp size={42} />
          ) : (
            <ArrowFatLinesDown size={42} />  
          )}
        </div>
        <h5 className='font-semibold mb-3'>Ingresos semestrales</h5>
        <div className='flex items-center mt-3'>
          <h3 className='flex items-center font-normal mb-0 text-2xl'>{incommings}€</h3>
          {incommings > prevIncomming ? (
            <span className='badge badge__success ml-2'>
              {parseFloat((incommings - prevIncomming) * 100 / incommings).toFixed(2)}%
            </span>
          ) : (
            <span className='badge badge__danger ml-2'>
              {parseFloat((prevIncomming - incommings) * 100 / incommings).toFixed(2)}%
            </span>
          )}
        </div>
        <p className='mt-3 text-xs'>
          {incommings > prevIncomming ? (
            <>
              Hay {incommings - prevIncomming}€ de ingresos más que el semestre anterior
            </>
          ) : (
            <>
              Hay {incommings - prevIncomming}€ de ingresos menos que el semestre anterior
            </>
          )}
          
        </p>
      </div>
    </div>
  )
}

const IncommingsBySemester = () => {
  return (
    <Suspense fallback={<SkeletonIncommingsCard />}>
      <Card />
    </Suspense>
  )
}

export default IncommingsBySemester
