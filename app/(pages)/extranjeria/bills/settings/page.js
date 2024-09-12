'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { serverTimestamp } from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'
import Apis from '@/app/libs/apis'
import { useAuth } from '@/app/libs/providers/AuthContext';
import { InputText } from '@/app/ui/components/atoms';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const SettingsPage = () => {
  const { user } = useAuth()
  const [thisUser, setThisUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const [company, setCompany] = useState(null)
  const [name, setName] = useState('')
  const [documentType, setDocumentType] = useState('NIF')
  const [document, setDocument] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('España')
  const router = useRouter()

  const handleUpdate = async () => {
    setIsLoading(true)
    try {
      const companyUpdated = {
        id: company.id,
        agentUid: company.agentUid,
        name,
        documentType,
        document,
        email,
        address,
        zipcode,
        city,
        country,
        createdAt: company.createdAt,
        updatedAt: serverTimestamp()
      }
      await Apis.company.PatchCompany(company.id, companyUpdated)
      toast.success('Datos de empresa registrados con éxito.')
    } catch (error) {
      toast.error(`handleUpdate: Error al actualizar los datos de empresa.`)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const company = {
        name,
        document,
        email,
        address,
        zipcode,
        city,
        country,
        agentUid: thisUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
      await Apis.company.PostCompany(company)
      toast.success('Datos fiscales registrados con éxito.')
    } catch (error) {
      toast.error('Error al registrar un cliente.')
      console.error(error)
    } finally {
      setIsLoading(false)
      //router.push('/extranjeria/bills')
    }
  }

  useEffect(() => {
    setThisUser(user)
  }, [])

  useEffect(() => {
    const GetCompany = async () => {
      setIsLoading(true)
      try {
        const res = await Apis.company.GetAllCompanies()
        if ( res && res.length > 0 ) {
          const company = res[0]
          setName(company.name)
          setDocumentType(company.documentType)
          setDocument(company.document)
          setEmail(company.email)
          setAddress(company.address)
          setZipcode(company.zipcode)
          setCity(company.city)
          setCountry(company.country)
          setCompany(company)
        }
      } catch (error) {
        toast.error(`GetCompany: Error al cargar los datos de empresa.`)
      } finally {
        setIsLoading(false)
      }
    }
    GetCompany()
  }, [])

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
          <h2 className="font-bold text-3xl">Ajustes</h2>
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
                <div className="w-8/12">

                  <h3 className='mb-4 font-semibold text-xl'>Datos fiscales</h3>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-4/12">
                      <div className="mb-4">
                        <span className="block text-sm">Nombre (*)</span>
                        <InputText
                          type='text'
                          value={name}
                          onChange={e => setName(e.target.value)}
                          required
                          autoComplete='none'
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-4/12">
                      <div className="mb-4">
                        <span className="block text-sm">Tipo de documento (*)</span>
                        <select 
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={documentType}
                          onChange={e => setDocumentType(e.target.value)}
                        >
                          <option value='NIF'>NIF</option>
                          <option value='CIF'>CIF</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full sm:w-4/12">
                      <div className="mb-4">
                        <span className="block text-sm">NIF/CIF (*)</span>
                        <InputText
                          type='text'
                          value={document}
                          onChange={e => setDocument(e.target.value)}
                          required
                          autoComplete='none'
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-4/12">
                      <div className="mb-4">
                        <span className="block text-sm">Email (*)</span>
                        <InputText
                          type='email'
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                          autoComplete='none'
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-4/12">
                      <div className="mb-4">
                        <span className="block text-sm">Direccion (*)</span>
                        <InputText
                          type='text'
                          value={address}
                          onChange={e => setAddress(e.target.value)}
                          required
                          autoComplete='none'
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-4/12">
                      <div className="mb-4">
                        <span className="block text-sm">Código Postal (*)</span>
                        <InputText
                          type='text'
                          value={zipcode}
                          onChange={e => setZipcode(e.target.value)}
                          required
                          autoComplete='none'
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-4/12">
                      <div className="mb-4">
                        <span className="block text-sm">Ciudad (*)</span>
                        <InputText
                          type='email'
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          required
                          autoComplete='none'
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-4/12">
                      <div className="mb-4">
                        <span className="block text-sm">País (*)</span>
                        <select 
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          disabled
                          value={country}
                          onChange={e => setCountry(e.target.value)}
                        >
                          <option value='España'>España</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full sm:w-4/12">
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex justify-end w-full sm:w-6/12">
                      <Link
                        className="btn btn-danger w-6/12"
                        href='/extranjeria/bills'
                      >
                        Cancelar
                      </Link>
                    </div>
                    <div className="flex justify-start w-full sm:w-6/12">
                      {company ? (
                        <>
                          <button
                            className="btn btn-primary w-6/12"
                            onClick={handleUpdate}
                          >
                            Actualizar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-success w-6/12"
                            onClick={handleSubmit}
                          >
                            Guardar
                          </button>
                        </>
                      )}
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

export default SettingsPage
