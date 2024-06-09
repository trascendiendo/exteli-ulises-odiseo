'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import toast, { Toaster } from 'react-hot-toast'
import { auth, db } from "@/app/libs/utils/firebase"
import { InputText } from "@/app/ui/components/atoms";
import LoadingScreen from "@/app/ui/components/molecules/LoadingScreen";
import Link from "next/link";

const AddProcedure = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('Inhabilitado')
  const router = useRouter()

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await setDoc(doc(db, 'procedures'), {
        name,
        description,
        status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      toast.success('Trámite registrado con éxito.')
      setTimeout(() => {
        setIsLoading(false)
        router.push('/extranjeria/procedures')
      }, 5000);
    } catch (error) {
      setIsLoading(false)
      toast.error('Error al crear un trámite.')
    }
  }

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
          <ul className="breadcrumbs">
            <li>
              <Link href='/'>Home</Link>
            </li>
          </ul>
        </div>
        <div className="w-full">
          <h2 className="font-bold text-3xl">Agregar trámite</h2>
        </div>
      </div>
      <div
        className="row"
        style={{
          paddingTop: '24px'
        }}
      >
        <div className="w-full">
          <div className="card">
            <div className="card__body">
              <div className="form flex justify-center">
                <div className="w-6/12">
                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Nombre</span>
                        <InputText
                          type='text'
                          value={name}
                          onChange={e => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Descripción</span>
                        <InputText
                          type='text'
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Estado</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={status}
                          onChange={e => setStatus(e.target.value)}
                          required
                        >
                          <option value="Activo">Activo</option>
                          <option value="Inhabilitado">Inhabilitado</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12"></div>
                  </div>

                  <div className="flex gap-6 mt-5">
                    <div className="w-full sm:w-6/12">
                      <button
                        className="btn btn-primary w-full"
                        onClick={handleSubmit}
                        disabled={!name && !description}
                      >
                        Registrar
                      </button>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <button
                        className="btn btn-danger w-full"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
      {isLoading && <LoadingScreen />}
    </>
  )
}

//export default WithAuth()
export default AddProcedure
