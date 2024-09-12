'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { serverTimestamp } from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'
import { PDFViewer } from '@react-pdf/renderer';
import { X } from '@phosphor-icons/react';
import Apis from '@/app/libs/apis'
import { parsePrice } from '@/app/libs/utils';
import { useAuth } from '@/app/libs/providers/AuthContext';
import { InputText } from '@/app/ui/components/atoms';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';
import { Breadcrumbs } from '@/app/ui/components/organisms';
import { Document } from '@/app/ui/components/wrappers'

const AddBill = () => {
  const { user } = useAuth()
  const [thisUser, setThisUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [provider, setProvider] = useState({})
  const [myCustomers, setMyCustomers] = useState({})
  const [customerData, setCustomerData] = useState({})
  const [createDate, setCreateDate] = useState(new Date().toISOString().split('T')[0])
  const [billSerial, setBillSerial] = useState('2024')
  const [billNumber, setBillNumber] = useState('0000000')
  const [dueDate, setDueDate] = useState('')
  const [paidDate, setPaidDate] = useState('')
  const [rows, setRows] = useState([{}])
  const [rowsData, setRowsdata] = useState([])
  const [notes, setNotes] = useState('')
  const [subtotal, setSubtotal] = useState(0.00)
  const [ivas, setIvas] = useState([])
  const [irpfs, setIrpfs] = useState([])
  const [descuentos, setDescuentos] = useState(0.00)
  const [total, setTotal] = useState(0.00)
  const [status, setStatus] = useState('pendiente')
  const router = useRouter()

  const [modal, setModal] = useState(false)

  const getCompanyData = async () => {
    try {
      const resCompanyData = await Apis.company.GetAllCompanies()
      setProvider(resCompanyData[0])
    } catch (error) {
      console.info('getCompanyData')
      console.error(`Error al obtener data`)
    }
  }

  const getCustomerData = async (customerUid) => {
    try {
      const resCustomerData = await Apis.customers.GetCustomer(customerUid)
      setCustomerData(resCustomerData)
    } catch (error) {
      console.info('getCustomerData')
      console.error(`Error al obtener data`)
    }
  }

  const validateFills = () => {
    const firstRow = rows[0]
    return (
      document.querySelector("input[name='concept-1']").value &&
      document.querySelector("input[name='base-1']").value &&
      document.querySelector("input[name='iva-1']").value
    )
  }

  const handleAddRow = () => {
    if ( !validateFills() ) {
      toast.error('Complete los campos de la primera fila antes de agregar más')
      return
    }

    setRows([...rows, {}])
  }

  const handleDeleteRow = (index) => {
    console.log(index)
    console.log(rows)
    setRows((prevRows) => {
      const newRows = [...prevRows]
      newRows.splice(index, 1)
      return newRows
    })
  }

  const calculatePaidDate = () => {
    if ( dueDate === 'manual' ) {
      setPaidDate('')
      setStatus('Pendiente')
      return
    }

    const daysToAdd = parseInt(dueDate)
    if ( !isNaN(daysToAdd) ) {
      const newPaidDate = new Date(createDate)
      newPaidDate.setDate(newPaidDate.getDate() + daysToAdd)
      setPaidDate(newPaidDate.toISOString().split('T')[0])
      setStatus('Pendiente')
    } else {
      setPaidDate(createDate)
      setStatus('Pagado')
    }
  }

  const calculateSubtotal = () => {
    const newTotal = rows.reduce((acc, _, index) => {
      const baseValue = parseFloat(document.querySelector(`input[name='base-${index + 1}']`).value) || 0
      const cantidad = parseFloat(document.querySelector(`input[name='cantidad-${index + 1}']`).value) || 1
      return acc + (baseValue * cantidad)
    }, 0)
    calculateIvas()
    calculateIrpfs()
    setSubtotal(newTotal)
  }

  const calculateDtos = () => {
    const totalDescuentos = rows.reduce((acc, _, index) => {
      const descuento = parseFloat(document.querySelector(`input[name='dto-${index + 1}']`).value) || 0
      return acc + descuento
    }, 0)

    setDescuentos(totalDescuentos)
  }

  const calculateIvas = () => {
    const ivaValues = rows.map((_, index) => parseFloat(document.querySelector(`input[name='iva-${index + 1}']`).value) || 0)
    const uniqueIvas = [...new Set(ivaValues)]
    setIvas(uniqueIvas.map(iva => ({
      iva,
      value: rows.reduce((acc, _, index) => {
        const baseValue = parseFloat(document.querySelector(`input[name='base-${index + 1}']`).value) || 0
        const cantidad = parseFloat(document.querySelector(`input[name='cantidad-${index + 1}']`).value) || 1
        const currentIva = parseFloat(document.querySelector(`input[name='iva-${index + 1}']`).value) || 0
        return currentIva === iva ? acc + ((baseValue * cantidad) * iva) / 100 : acc
      }, 0)
    })))
  }

  const calculateIrpfs = () => {
    const irpfValues = rows.map((_, index) => {
      const irpf = parseFloat(document.querySelector(`input[name='irpf-${index + 1}']`).value) || 0
      return { irpf, value: irpf }
    })

    setIrpfs(irpfValues)
  }

  const calculateTotal = () => {
    calculateDtos()
    const totalIva = ivas.reduce((acc, iva) => acc + iva.value, 0)
    const totalIrpf = irpfs.reduce((acc, irpf) => acc + irpf.value, 0)
    const newTotal = ((subtotal - descuentos) + totalIva) - totalIrpf
    setTotal(newTotal)
  }

  const settingRowsdata = () => {
    const data = rows.map((_, index) => {
      const concept = document.querySelector(`input[name='concept-${index + 1}']`).value
      const base = parseFloat(document.querySelector(`input[name='base-${index + 1}']`).value)
      const cantidad = parseFloat(document.querySelector(`input[name='cantidad-${index + 1}']`).value)
      const dto = parseFloat(document.querySelector(`input[name='dto-${index + 1}']`).value || 0)
      const iva = parseFloat(document.querySelector(`input[name='iva-${index + 1}']`).value || 0)
      const irpf = parseFloat(document.querySelector(`input[name='irpf-${index + 1}']`).value || 0)

      const ivaAmount = parseFloat((base * iva) / 100)
      const total = parsePrice((((base * cantidad) - dto) + ivaAmount) - irpf)
      
      return {
        concept,
        base,
        cantidad,
        dto,
        iva: parsePrice(ivaAmount),
        irpf,
        total
      }
    })
    setRowsdata(data)
  }

  const showDocument = () => {
    settingRowsdata()
    setModal(true)
  }

  const handleCloseModal = () => {
    setModal(false)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const description = rows.map((_, index) => {
        const concept = document.querySelector(`input[name='concept-${index + 1}']`).value
        const base = parseFloat(document.querySelector(`input[name='base-${index + 1}']`).value)
        const cantidad = parseFloat(document.querySelector(`input[name='cantidad-${index + 1}']`).value)
        const dto = parseFloat(document.querySelector(`input[name='dto-${index + 1}']`).value || 0)
        const iva = parseFloat(document.querySelector(`input[name='iva-${index + 1}']`).value || 0)
        const irpf = parseFloat(document.querySelector(`input[name='irpf-${index + 1}']`).value || 0)

        const ivaAmount = parseFloat((base * iva) / 100)
        const totalAmount = parseFloat((((base * cantidad) - dto) + ivaAmount) - irpf)
        return {
          concept,
          base,
          cantidad,
          dto,
          iva: parsePrice(ivaAmount),
          irpf,
          total: parsePrice(totalAmount)
        }
      })
  
      const bill = {
        billSerial,
        billNumber,
        provider,
        customer: customerData,
        createDate,
        paidDate,
        description,
        subtotal,
        descuentos,
        ivas,
        irpfs,
        total,
        notes: document.querySelector(`textarea[name='notes']`).value || '',
        status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
      await Apis.bills.PostBill(bill)
      toast.success('Factura registrada con éxito.')
    } catch (error) {
      toast.error('Error al registrar una factura.')
    } finally {
      setIsLoading(false)
      router.push('/extranjeria/bills')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        setThisUser(user)
      } catch (error) {
        console.error(`fetchData: Error al obtener data del usuario`)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [user])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        if ( user ) {
          const resCustomers = await Apis.customers.GetAllCustomersByAgent(`${user.firstName} ${user.lastName}`)
          await getCompanyData()
          setMyCustomers(resCustomers)
        }
      } catch (error) {
        console.info('fetchData')
        console.error(`Error al obtener data de clientes`)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [thisUser])

  useEffect(() => {
    calculatePaidDate()
  }, [createDate, dueDate])

  useEffect(() => {
    calculateSubtotal()
  }, [rows])

  useEffect(() => {
    calculateTotal()
  }, [subtotal, ivas])

  useEffect(() => {
    const getLastBill = async () => {
      setIsLoading(true)
      try {
        const res = await Apis.bills.GetLastBill()
        if ( res ) {
          const billNumber = (parseInt(res, 10) + 1).toString().padStart(7, '0')
          setBillNumber(billNumber)
        } else {
          setBillNumber('0000001')
        }
      } catch (error) {
        console.error(`getLastBill: Error al obtener data del usuario`)
      } finally {
        setIsLoading(false)
      }
    }
    getLastBill()
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
          <h2 className="font-bold text-3xl">Agregar factura</h2>
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
                <div className="w-10/12">

                  <div className="flex gap-4">
                    <div className="w-4/12">
                      <div className="mb-4">
                        <span className="block text-sm">Cliente (*)</span>
                        <select
                          name='customer'
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          required
                          onChange={(e) => {
                            const selectedId = e.target.value;
                            const selectedCustomer = myCustomers.find(customer => customer.id === selectedId);
                            getCustomerData(selectedCustomer.id)
                          }}
                        >
                          <option value="">Seleccionar cliente</option>
                          {myCustomers.length > 0 && (
                            myCustomers.map(customer => (
                              <option
                                key={customer.id}
                                value={customer.id}
                              >
                                {`${customer.customer.firstName} ${customer.customer.lastName}`}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="nouser-select w-4/12"></div>
                    <div className="nouser-select w-4/12"></div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-3/12">
                      <div className="mb-4">
                        <span className="block text-sm">Número (*)</span>
                        <InputText
                          name='billNumber'
                          type='text'
                          value={`${billSerial}-${billNumber}`}
                          onChange={(e) => setBillNumber(e.target.value)}
                          required
                          autoComplete='off'
                        />
                      </div>
                    </div>
                    <div className="w-3/12">
                      <div className="mb-4">
                        <span className="block text-sm">Fecha de creación (*)</span>
                        <InputText
                          name='createDate'
                          type='date'
                          min={new Date().toISOString().split('T')[0]}
                          value={createDate}
                          onChange={(e) => setCreateDate(e.target.value)}
                          required
                          autoComplete='off'
                        />
                      </div>
                    </div>
                    <div className="w-3/12">
                      <div className="mb-4">
                        <span className="block text-sm">Vencimiento (*)</span>
                        <select
                          name='dueDate'
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          required
                        >
                          <option value="">Seleccionar opción</option>
                          <option value="hoy">Hoy</option>
                          <option value="7">7 días</option>
                          <option value="15">15 días</option>
                          <option value="30">30 días</option>
                          <option value="45">45 días</option>
                          <option value="60">60 días</option>
                          <option value="manual">Elegir fecha</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-3/12">
                      <div className="mb-4">
                        <span className="block text-sm">Fecha de pago (*)</span>
                        <InputText
                          name='paidDate'
                          type='date'
                          value={paidDate}
                          onChange={(e) => setPaidDate(e.target.value)}
                          required={dueDate === 'manual'}
                          disabled={dueDate !== 'manual'}
                          autoComplete='off'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='rows__content'>
                    {rows.map((_, index) => (
                      <div className='row__item' key={index}>
                        <div className="flex gap-4">
                          <div className="w-7/12">
                            <div className="mb-4">
                              <span className="block text-sm">Concepto</span>
                              <InputText
                                name={`concept-${index + 1}`}
                                type='text'
                                
                                required
                                autoComplete='off'
                              />
                            </div>
                          </div>
                          <div className="w-1/12">
                            <div className="mb-4">
                              <span className="block text-sm">BASE</span>
                              <InputText
                                name={`base-${index + 1}`}
                                type='text'
                                placeholder='0'
                                required
                                autoComplete='off'
                                onChange={calculateSubtotal}
                              />
                            </div>
                          </div>
                          <div className="w-1/12">
                            <div className="mb-4">
                              <span className="block text-sm">CANT</span>
                              <InputText
                                name={`cantidad-${index + 1}`}
                                type='text'
                                defaultValue='1'
                                required
                                autoComplete='off'
                                onChange={calculateSubtotal}
                              />
                            </div>
                          </div>
                          <div className="w-1/12">
                            <div className="mb-4">
                              <span className="block text-sm">DTO</span>
                              <InputText
                                name={`dto-${index + 1}`}
                                type='text'
                                placeholder='0'
                                required
                                autoComplete='off'
                                onChange={calculateSubtotal}
                              />
                            </div>
                          </div>
                          <div className="w-1/12">
                            <div className="mb-4">
                              <span className="block text-sm">IVA %</span>
                              <InputText
                                name={`iva-${index + 1}`}
                                type='text'
                                defaultValue='21'
                                autoComplete='off'
                                onChange={calculateSubtotal}
                              />
                            </div>
                          </div>
                          <div className="w-1/12">
                            <div className="mb-4">
                              <span className="block text-sm">IRPF</span>
                              <InputText
                                name={`irpf-${index + 1}`}
                                type='text'
                                placeholder='0'
                                required
                                autoComplete='off'
                                onChange={calculateSubtotal}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <div className="mb-4 w-3/12">
                      <button
                        className='btn btn-primary'
                        type='button'
                        onClick={handleAddRow}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-7/12">
                      <div className="mb-4">
                        <span className="block text-sm">Notas para el receptor</span>
                        <textarea
                          name='notes'
                          className='block border mt-2 rounded-lg px-3 py-3.5 text-sm w-full'
                          style={{ resize: 'none' }}
                          rows='7'
                          onChange={e => setNotes(e.target.value)}
                        >
                        </textarea>
                      </div>
                    </div>
                    <div className="nouser-select w-1/12"></div>
                    <div className="nouser-select w-1/12"></div>
                    <div className="nouser-select w-1/12"></div>
                    <div className="nouser-select w-1/12"></div>
                    <div className="nouser-select w-1/12"></div>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <div className="nouser-select w-3/12"></div>
                    <div className="nouser-select w-3/12"></div>
                    <div className="nouser-select w-3/12"></div>
                    <div className="w-3/12">
                      <div className='bg-gray-200 rounded-xl px-4 py-3'>

                        {subtotal !== 0.00 && (
                          <>
                            <div className='flex gap-4 mb-1'>
                              <div className="w-6/12">
                                <span className="block font-extralight text-base">Base imponible</span>
                              </div>
                              <div className="text-right w-6/12">
                                <span className="block font-extralight text-base row__total-value">
                                  {parsePrice(subtotal)} €
                                </span>
                              </div>
                            </div>

                            <div className='row__iva'>
                              {ivas.length > 1
                                ? ivas.map((iva, index) => (
                                  iva.iva !== 0 && (
                                    <div className='flex gap-4 mb-1 row__iva-item' key={index}>
                                      <div className="w-6/12">
                                        <span className="block font-extralight text-base">IVA {iva.iva} %</span>
                                      </div>
                                      <div className="text-right w-6/12">
                                        <span className="block font-extralight text-base row__iva-value">
                                          {parsePrice(iva.value)} €
                                        </span>
                                      </div>
                                    </div>
                                  )
                                ))
                                : ivas[0]?.iva !== 0 && (
                                    <div className='flex gap-4 mb-1 row__iva-item'>
                                      <div className="w-6/12">
                                        <span className="block font-extralight text-base">IVA {ivas[0]?.iva} %</span>
                                      </div>
                                      <div className="text-right w-6/12">
                                        <span className="block font-extralight text-base row__iva-value">
                                          {parsePrice(ivas[0]?.value || 0)} €
                                        </span>
                                      </div>
                                    </div>
                                  )
                              }
                            </div>

                            <div className='mb-1 row__irpf'>
                              {irpfs.length > 1
                                ? irpfs.map((irpf, index) => (
                                  irpf.irpf !== 0 && (
                                    <div className='flex gap-4 mb-1 row__irpf-item' key={index}>
                                      <div className="w-6/12">
                                        <span className="block font-extralight text-base">IRPF</span>
                                      </div>
                                      <div className="text-right w-6/12">
                                        <span className="block font-extralight text-base row__iva-value">
                                          -{parsePrice(irpf.value)} €
                                        </span>
                                      </div>
                                    </div>
                                  )
                                ))
                                : irpfs[0]?.irpf !== 0 && (
                                    <div className='flex gap-4 mb-1 row__irpf-item'>
                                      <div className="w-6/12">
                                        <span className="block font-extralight text-base">IRPF {irpfs[0]?.irpf}</span>
                                      </div>
                                      <div className="text-right w-6/12">
                                        <span className="block font-extralight text-base row__irpf-value">
                                          -{parsePrice(irpfs[0]?.value || 0)} €
                                        </span>
                                      </div>
                                    </div>
                                  )
                              }
                            </div>
                          </>
                        )}

                        {descuentos !== 0.00 && (
                          <div className='flex gap-4 mb-1'>
                            <div className="w-6/12">
                              <span className="block font-extralight text-base">Descuentos</span>
                            </div>
                            <div className="text-right w-6/12">
                              <span className="block font-extralight text-base row__total-value">
                                {parsePrice(descuentos)} €
                              </span>
                            </div>
                          </div>
                        )}

                        <div className='flex gap-4'>
                          <div className="w-6/12">
                            <span className="block font-semibold text-base">Total</span>
                          </div>
                          <div className="text-right w-6/12">
                            <span className="block font-semibold text-base row__total-value">
                              {parsePrice(total)} €
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mb-4 w-2/12">
                      <button
                        className='btn btn-primary w-full'
                        //onClick={handleSubmit}
                        onClick={showDocument}
                        disabled={Object.keys(customerData).length === 0}
                      >
                        Previsualizar
                      </button>
                    </div>
                    <div className="mb-4 w-2/12">
                      <Link
                        className='btn btn-danger w-full'
                        href={`./`}
                      >
                        Cancelar
                      </Link>
                    </div>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
        {modal && (
          <div className={`modal`}>
            <div className='modal__content'>
              <div className='modal__close'>
                <button onClick={handleCloseModal}>
                  <X size={32} />
                </button>
              </div>
              <PDFViewer style={{ height: 'calc(100% - 43px - 39px)', width: '100%' }}>
                <Document
                  billSerial={billSerial}
                  billNumber={billNumber}
                  provider={provider}
                  customerData={customerData}
                  createDate={createDate}
                  paidDate={paidDate}
                  rowsData={rowsData}
                  subtotal={subtotal}
                  descuentos={descuentos}
                  ivas={ivas}
                  irpfs={irpfs}
                  total={total}
                  notes={notes}
                />
              </PDFViewer>
              <div className='flex justify-center mt-4'>
                <div className='flex justify-between w-3/12'>
                  <button
                    className='btn btn-danger w-full'
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </button>
                </div>
                <div className='w-1/12'></div>
                <div className='flex justify-between w-3/12'>
                  <button
                    className='btn btn-success w-full'
                    onClick={handleSubmit}
                  >
                    Registrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isLoading && <LoadingScreen />}
    </>
  )
}

export default AddBill
