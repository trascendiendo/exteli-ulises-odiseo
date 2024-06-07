'use client'

import { useRouter } from "next/navigation";
import React from 'react';

import { isBrowser } from '@/app/libs/utils'

export default function withConditionalRedirect({
  WrappedComponent,
  clientCondition,
  location
}) {
  const WithConditionalRedirectWrapper = props => {
    const router = useRouter()
    const redirect = clientCondition()

    if ( isBrowser() && redirect ) {
      router.push(location)
      return (
        <>
          <p>Redirigiendo</p>
        </>
      )
    }

    return <WrappedComponent {...props} />
  }

  return WithConditionalRedirectWrapper
}
