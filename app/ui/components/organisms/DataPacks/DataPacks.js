'use client'

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { serverTimestamp } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'universal-cookie';
import Apis from '@/app/libs/apis';
import { InputText } from '@/app/ui/components/atoms';
import SkeletonDataPacks from '@/app/ui/components/skeletons/organisms/DataPacks/DataPacks';

const Packs = ({
  uid
}) => {
  const cookies = new Cookies
  const [isLoading, setIsLoading] = useState(false)
  const [pack, setPack] = useState(null)
  const [error, setError] = useState(null)
  const [thisUser, setThisUser] = useState({})
  const router = useRouter()

  useEffect(() => {
    const getUser = () => {
      const user = cookies.get('user')
      if ( user ) setThisUser(user)
    }
    getUser()
    const fetchData = async () => {
      try {
        const res = await Apis.packs.GetPack(uid)
        setPack(res.packs)
        setPa
      } catch (error) {
        console.info('organisms/DataPacks/DataPacks.js/fetchData()')
        console.error('Error al cargar la data.')
        setError(error)
      }
    }
  }, [uid])

  const handleUpdate = async (e) => {

  }

  if ( error ) {
    return <SkeletonDataPacks />
  }

  if ( !pack ) {
    return null
  }
  
  return (
    <>
    </>
  )
}

const DataPacks = ({ uid }) => {
  return (
    <Suspense fallback={<SkeletonDataPacks />}>
      <Packs uid={uid} />
    </Suspense>
  )
}

export default DataPacks
