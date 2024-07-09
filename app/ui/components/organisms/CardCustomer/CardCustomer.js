'use client'

import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Apis from '@/app/libs/apis';
import { Badge } from '@/app/ui/components/atoms';
import SkeletonCardCustomer from '@/app/ui/components/skeletons/organisms/CardCustomer/CardCustomer';

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
        console.info('organisms/CardCustomer/CardCustomer.js/fetchData()')
        console.error('Error al cargar la data.')
        setError(error)
      }
    }
    fetchData()
  }, [uid])

  if ( error ) {
    return <SkeletonCardCustomer />
  }

  if ( !customer ) {
    return null
  }

  return (
    <div className="userUI__content flex justify-center">
      <div className="userUI__details md:w-8/12">
        <div className="userUI__avatar flex justify-center">
          <Image
            className="border-4 border-solid rounded-full"
            style={{ borderColor: `${customer.status == 'Activo' ? '#8BC34A' : `${customer.status == 'Incompleto' ? '#263238' : `${customer.status == 'Pendiente' ? '#E0E0E0' : '#FFD54F'}`}`}`}}
            src={customer.gender == 'Masculino' 
              ? '/images/avatarCustomerMale.png' 
              : '/images/avatarCustomerFem.png'}
            height={140}
            width={140}
            alt={`${customer.firstName} ${customer.lastName}`}
            quality={100}
            priority
          />
        </div>
        <div className="mt-4 userUI__profile text-center">
          <h4 className="capitalize font-semibold mb-1 text-lg">
            {customer.firstName} {customer.lastName}
          </h4>
          <Badge 
            className={`badge ${customer.status == 'Activo' ? 'badge__success' : `${customer.status == 'Incompleto' ? 'badge__dark' : `${customer.status == 'Pendiente' ? 'badge__light' : 'badge__secondary'}`}`}`}
            text={customer.status} 
          />
        </div>
        <div className="userUI__summary flex items-center justify-center mt-4">
        </div>
      </div>
    </div>
  )
}

const CardCustomer = ({ uid }) => {
  return (
    <Suspense fallback={<SkeletonCardCustomer />}>
      <Customer uid={uid} />
    </Suspense>
  )
}

export default CardCustomer
