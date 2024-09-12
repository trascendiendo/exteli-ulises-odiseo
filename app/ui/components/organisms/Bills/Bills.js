'use client'

import Link from 'next/link';
import { InputText } from '@/app/ui/components/atoms';

const BillForm = ({

}) => {

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

  const getCustomerData = async (customerUid) => {
    try {
      const resCustomerData = await Apis.customers.GetCustomer(customerUid)
      setCustomerData(resCustomerData)
    } catch (error) {
      console.info('getCustomerData')
      console.error(`Error al obtener data`)
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

  const showDocument = () => {
    settingRowsdata()
    setModal(true)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const description = rows.map((_, index) => {
        return {
          concept: document.querySelector(`input[name='concept-${index + 1}']`).value,
          base: document.querySelector(`input[name='base-${index + 1}']`).value,
          cantidad: document.querySelector(`input[name='cantidad-${index + 1}']`).value,
          dto: document.querySelector(`input[name='dto-${index + 1}']`).value,
          iva: document.querySelector(`input[name='iva-${index + 1}']`).value,
          irpf: document.querySelector(`input[name='irpf-${index + 1}']`).value
        }
      })

      const bill = {
        provider, // TODO: datos fiscales de la empresa que factura
        customer: document.querySelector(`select[name='customer']`).value,
        billSerial: document.querySelector(`select[name='billSerial']`).value,
        billNumber: document.querySelector(`input[name='billNumber']`).value,
        createDate,
        dueDate,
        paidDate,
        description,
        subtotal,
        total,
        notes: document.querySelector(`input[name='notes']`).value,
        status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
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
        console.info('fetchData')
        console.error(`Error al obtener data del usuario`)
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

  return (
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
              className='btn btn-success w-full'
              //onClick={handleSubmit}
              onClick={showDocument}
              disabled={Object.keys(customerData).length === 0}
            >
              Crear
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
  )
}

export default BillForm
