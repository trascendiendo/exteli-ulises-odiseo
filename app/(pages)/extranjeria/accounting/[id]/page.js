'use client'

import { useState } from 'react';
import { useParams } from 'next/navigation';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';
import { DataAccounting } from '@/app/ui/components/organisms';

const PageAccount = () => {
  const params = useParams()
  const uid = params.id
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <DataAccounting uid={uid} />
        </>
      )}
    </>
  )
}

export default PageAccount