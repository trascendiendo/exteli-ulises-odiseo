'use client'

import { Suspense, useEffect, useState } from 'react';
import Apis from '@/app/libs/apis';
import SkeletonTitleCustomer from '@/app/ui/components/skeletons/organisms/TitleCustomer/TitleCustomer';

const Customer = ({
  uid
}) => {
  const [customer, setCustomer] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCustomer = await Apis.customers.GetCustomer(uid)
        setCustomer(resCustomer.customer)
      } catch (error) {
        console.info('organisms/TitleCustomer/TitleCustomer.js/fetchData()')
        console.error('Error al cargar la data.')
        setError(error)
      }
    }
    fetchData()
  }, [uid ])

  if ( error ) {
    return <SkeletonTitleCustomer />
  }

  if ( !customer ) {
    return null
  }

  return (
    <h2 className="font-bold text-3xl">
      {customer.firstName} {customer.lastName}
    </h2>
  )
}

const TitleCustomer = ({ uid }) => {
  return (
    <Suspense fallback={<SkeletonTitleCustomer />}>
      <Customer uid={uid } />
    </Suspense>
  )
}

export default TitleCustomer
