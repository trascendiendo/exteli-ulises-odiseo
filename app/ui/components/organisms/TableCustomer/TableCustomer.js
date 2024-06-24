import { Suspense, useEffect, useState } from "react"
import Apis from '@/app/libs/apis';
import SkeletonTableCustomer from "@/app/ui/components/skeletons/organisms/TableCustomer/TableCustomer"

const { TableCustomers } = require(".")

const Customer = ({
  uid
}) => {
  const [customer, setCustomer] = useState(null)
  const [error, setError] = useState(null)
}

const TableCustomer = ({ uid }) => {
  return (
    <Suspense fallback={<SkeletonTableCustomer />}>
      <Customer uid={uid} />
    </Suspense>
  )
}

export default TableCustomer
