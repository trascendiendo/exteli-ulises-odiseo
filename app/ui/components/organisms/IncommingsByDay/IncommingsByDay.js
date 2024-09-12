import { Suspense, useEffect, useState } from "react"
import { 
  ArrowFatLinesDown, 
  ArrowFatLinesUp } 
from '@phosphor-icons/react/dist/ssr'
import Apis from '@/app/libs/apis';
import SkeletonIncommingsCard from "@/app/ui/components/skeletons/organisms/SkeletonIncommingsCard/SkeletonIncommingsCard"

const Card = () => {
  const [prevIncomming, setPrevIncomming] = useState(null)
  const [incommings, setIncommings] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getToday = () => {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')

      return `${year}-${month}-${day}`
    }
    const getYesterday = () => {
      const today = new Date()
      today.setDate(today.getDate() - 1)
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')

      return `${year}-${month}-${day}`
    }
    const today = getToday()
    const yesterday = getYesterday()
    let incommingToday = 0
    let incommingYesterday = 0
    const fetchData = async () => {
      try {
        const res = await Apis.accounting.GetAllAccountingToday(today)
        if (res) {
          res.forEach(item => {
            const amount = parseFloat(item.accounting.amount)
            incommingToday += amount
          })
        }
        const prevRes = await Apis.accounting.GetAllAccountingToday(yesterday)
        if (prevRes) {
          prevRes.forEach(item => {
            const amount = parseFloat(item.accounting.amount)
            incommingYesterday += amount
          })
        }
        setIncommings(incommingToday)
        setPrevIncomming(incommingYesterday)
      } catch (error) {
        console.info('organisms/IncommingsByDay/IncommingsByDay.js/fetchData()')
        console.error(`Error al cargar la data`)
        setError(error)
      }
    }
    fetchData()
  }, [])

  if ( error ) {
    return <SkeletonIncommingsCard />
  }

  if ( !incommings && incommings != 0 ) {
    return null
  }

  return (
    <div className="card">
      <div className="card__body relative">
        <div className={`absolute right-4 top-4 accountingBlug ${incommings > prevIncomming ? 'up' : 'down'}`}>
          {incommings > prevIncomming ? (
            <ArrowFatLinesUp size={42} />
          ) : (
            <ArrowFatLinesDown size={42} />  
          )}
        </div>
        <h5 className='font-semibold mb-3'>Ingresos del mes</h5>
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
              Hay {incommings - prevIncomming}€ de ingresos más que el mes anterior
            </>
          ) : (
            <>
              Hay {incommings - prevIncomming}€ de ingresos menos que el mes anterior
            </>
          )}
          
        </p>
      </div>
    </div>
  )
}

const IncommingsByMonth = () => {
  return (
    <Suspense fallback={<SkeletonIncommingsCard />}>
      <Card />
    </Suspense>
  )
}

export default IncommingsByMonth
