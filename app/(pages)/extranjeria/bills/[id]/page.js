'use client'

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Apis from '@/app/libs/apis';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';
import { Breadcrumbs } from '@/app/ui/components/organisms';
import { Document } from "@/app/ui/components/wrappers";
import { PDFViewer } from "@react-pdf/renderer";

const PageBill = () => {
  const params = useParams()
  const uid = params.id
  const [isLoading, setIsLoading] = useState(false)
  const [bill, setBill] = useState({})
  const router = useRouter()

  useEffect(() => {
    const getBill = async () => {
      setIsLoading(true)
      try {
        const res = await Apis.bills.GetBill(uid)
        if ( res ) {
          setBill(res)
        }
      } catch (error) {
        toast.error('Error al cargar la factura.')
      } finally {
        setIsLoading(false)
      }
    }
    getBill()
  }, [])

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
            <div className="w-full">
              {/**
               * 
              <TitleCustomer 
                uid={uid}
              />
               */}
            </div>
          </div>
          <div
            className="flex gap-8 items-start justify-between w-full"
            style={{
              paddingTop: '24px'
            }}
          >
            <div className="w-full sm:w-6/12">
              <div className="card">
                <div className="card__body">
                  {Object.keys(bill).length > 0 && (
                   <PDFViewer style={{ height: '800px', width: '100%' }}>
                     <Document 
                       billSerial={bill.billSerial}
                       billNumber={bill.billNumber}
                       provider={bill.provider}
                       customerData={bill.customer}
                       createDate={bill.createDate}
                       paidDate={bill.paidDate}
                       rowsData={bill.description}
                       subtotal={bill.subtotal}
                       descuentos={bill.descuentos}
                       ivas={bill.ivas}
                       irpfs={bill.irpfs}
                       total={bill.total}
                       notes={bill.notes}
                     />
                   </PDFViewer>
                  )}
                  {/**
                   * 
                   */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default PageBill
