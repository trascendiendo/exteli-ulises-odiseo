'use client'

import { useState } from 'react';
import Link from 'next/link'
import { useParams } from "next/navigation"
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const PagePacks = () => {
  const params = useParams()
  const uid = params.uid
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
              <Breadcrumbs />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default PagePacks
