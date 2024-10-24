'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link'
import { FilePdf, FileX } from '@phosphor-icons/react/dist/ssr';
import toast, { Toaster } from 'react-hot-toast'

import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';

import { parsePrice } from '@/app/libs/utils';
import { Warning, X } from '@phosphor-icons/react';
import Apis from '@/app/libs/apis';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const PageClients = () => {
  const [loading, setLoading] = useState(true)
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [bills, setBills] = useState(null)
  const [statuses] = useState(['Pagado', 'Cancelado'])
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    number: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    customer: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    createDate: {value: null, matchMode: FilterMatchMode.DATE_IS},
    total: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    status: { value: null, matchMode: FilterMatchMode.EQUALS }
  })

  const [modal, setModal] = useState(false)
  const [billId, setBillId] = useState(undefined)

  const handleCancelBill = async (id) => {
    setLoading(true)
    try {
      await Apis.bills.CancelBill(id)
    } catch (error) {
      toast.error('Error al cancelar una factura.')
    } finally {
      setLoading(false)
      window.location.reload()
    }
  }
  const openModal = (id) => {
    setBillId(id)
    setModal(true)
  }
  const handleCloseModal = () => {
    setModal(false)
  }
  const getSeverity = (status) => {
    switch (status) {
      case 'Pagado':
        return 'success'
      case 'Cancelado':
        return 'danger'
    }
  }
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await Apis.bills.GetBills()
        if ( res ) {
          const parseRes = (res) => {
            return res.map(item => ({
              id: item.id,
              number: `${item.billSerial}-${item.billNumber}`,
              customer: `${item.customer.customer.firstName} ${item.customer.customer.lastName}`,
              createDate: item.createDate,
              total: parsePrice(item.total),
              status: item.status
            }))
          }
          const newRes = parseRes(res)
          setBills(newRes)
        }
      } catch (error) {
        toast.error('Error al cargar la lista de facturas.')
        console.error(error)
      }
    }
    fetchBills()
  }, [])
  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = {...filters}
    _filters['global'].value = value
    setFilters(_filters)
    setGlobalFilterValue(value)
  }
  const formatCurrency = (value) => {
    return value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR'})
  }
  const renderHeader = () => {
    return (
      <div className='flex justify-end'>
        <IconField iconPosition='left'>
          <InputIcon className='pi pi-search' />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='Búsqueda' />
        </IconField>
      </div>
    )
  }
  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.total)
  }
  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status}
        severity={getSeverity(rowData.status)}
      />
    )
  }
  const statusItemTemplate = (option) => {
    return (
      <Tag
        value={option}
        security={getSeverity(option)}
      />
    )
  }
  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)} 
        itemTemplate={statusItemTemplate} 
        placeholder="Filtrar por estado" 
        className="p-column-filter" 
        showClear 
        style={{ minWidth: '8rem' }} 
      />
    )
  }
  const actionBodyTemplate = (rowData) => {
    return (
      <div className='flex gap-3'>
        <button
          className='btn btn-danger uppercase'
          onClick={() => openModal(rowData.id)}
        >
          Cancelar <FileX size={28} />
        </button>
        <Link
          className='btn btn-primary uppercase'
          href={`./bills/${rowData.id}`}
        >
          Ver <FilePdf size={28} />
        </Link>
      </div>
    )
  }
  const header = renderHeader()

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
          <h2 className="font-bold text-3xl">Facturas</h2>
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
              <div className="w-full flex justify-between mb-5">
                <div className="w-4/12"></div>
                <Link
                  className="btn btn-success"
                  href='/extranjeria/bills/add'
                >
                  Agregar factura
                </Link>
              </div>
              <div className="table-responsive">
                <DataTable
                  value={bills}
                  paginator
                  rows={14}
                  dataKey='id'
                  filters={filters}
                  filterDisplay='row'
                  globalFilterFields={[
                    'number',
                    'customer',
                    'createDate',
                    'total',
                    'status'
                  ]}
                  header={header}
                  rowsPerPageOptions={[
                    14, 21, 28, 35, 42, 49
                  ]}
                  emptyMessage="No se han encontrado facturas"
                >
                  <Column 
                    field='number'
                    header='Número'
                    filter
                    filterPlaceholder='Filtrar por número de factura'
                    style={{ minWidth: '10rem' }}
                  />
                  <Column 
                    field='customer'
                    header='Cliente'
                    filter
                    filterPlaceholder='Filtrar por cliente'
                    style={{ minWidth: '10rem' }}
                  />
                  <Column
                    field='createDate'
                    header='Creado el'
                    filter
                    filterPlaceholder='Filtrar por fecha de creación'
                    style={{ minWidth: '10rem' }}
                  />
                  <Column 
                    field='total'
                    header='Total'
                    filter
                    body={priceBodyTemplate}
                    filterPlaceholder='Buscar por Total'
                    style={{ minWidth: '10rem' }}
                  />
                  <Column 
                    field='status' 
                    header='Status' 
                    showFilterMenu={false}
                    filterMenuStyle={{ width: '8rem' }}
                    style={{ minWidth: '8rem' }}
                    body={statusBodyTemplate}
                    filter
                    filterElement={statusRowFilterTemplate}
                  />
                  <Column 
                    header='Acciones'
                    body={actionBodyTemplate} 
                    exportable={false}
                    style={{ minWidth: '10rem' }}
                  />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
        {modal && (
          <div className={`modal`}>
            <div className='modal__content' style={{ height: '350px' }}>
              <div className='modal__close'>
                <button onClick={handleCloseModal}>
                  <X size={32} />
                </button>
              </div>
              <div className='flex justify-center mt-4'>
                <div className='flex justify-between w-7/12'>
                  <div className='rounded-2xl px-4 py-3 text-center w-full' style={{ backgroundColor: '#FFCDD2' }}>
                    <div className='flex justify-center mb-3'>
                      <Warning size={42} />
                    </div>
                    <strong>
                      IMPORTANTE
                    </strong>
                    <p>
                      Cancelar la factura es un proceso <strong>irreversible</strong>.
                    </p>
                    <p>
                      ¿Está seguro que desea continuar?
                    </p>
                  </div>
                </div>
              </div>
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
                    onClick={() => handleCancelBill(billId)}
                  >
                    Proceder
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default PageClients
