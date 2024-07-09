'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { useParams } from 'next/navigation';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';
import { DataProcedure } from '@/app/ui/components/organisms';

const PageProcedure = () => {
  const params = useParams()
  const uid = params.id
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div
            className="page-header bg-transparent"
            style={{
              borderRadius: '8px',
              minHeight: '55px',
              padding: '13px 0px'
            }}
          >
            <div className="w-full">
              <ul className="breadcrumbs">
                <li>
                  <Link href='/'>Home</Link>
                </li>
              </ul>
            </div>
            <div className="w-full">
              Title
            </div>
          </div>
          <DataProcedure uid={uid} />
        </>
      )}
    </>
  )
}

//export default WithAuth()
export default PageProcedure
