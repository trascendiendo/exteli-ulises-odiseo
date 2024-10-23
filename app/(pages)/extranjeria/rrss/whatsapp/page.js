'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Breadcrumbs } from '@/app/ui/components/organisms'

const PageWhatsapp = () => {

  return (
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
        <div className="w-full">
          <h2 className="font-bold text-3xl">
            Whatsapp
          </h2>
        </div>
      </div>
      <div
        className="flex gap-8 items-start justify-between w-full"
        style={{
          paddingTop: '24px'
        }}
      >
        <div className="w-full">
          <div className="card">
            <div className="card__body">
              <div className="w-full flex justify-between mb-5">
                <div className="w-4/12"></div>
                <Link
                  className="btn btn-success"
                  href='/extranjeria/rrss/whatsapp/add'
                >
                  Crear envío
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageWhatsapp
