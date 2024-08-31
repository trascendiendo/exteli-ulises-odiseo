'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link'
import { Eye } from '@phosphor-icons/react/dist/ssr';
import toast, { Toaster } from 'react-hot-toast'

import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';

import Apis from '@/app/libs/apis';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const PageClients = () => {
  const [loading, setLoading] = useState(true)
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [bills, setBills] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [statuses] = useState(['Pagado', 'Pendiente', 'Vencido', 'Cancelado'])
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    number: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    customer: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    total: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    status: { value: null, matchMode: FilterMatchMode.EQUALS }
  })
  const getSeverity = (status) => {
    switch (status) {
      case 'Pagado':
        return 'success'
      case 'Pendiente':
        return 'warning'
      case 'Vencido':
        return 'info'
      case 'Cancelado':
        return 'danger'
    }
  }
  useEffect(() => {

  }, [])
  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = {...filters}
    _filters['global'].value = value
    setFilters(_filters)
    setGlobalFilterValue(value)
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
      <Link
        className='btn btn-primary'
        href={`./bills/${rowData.id}`}
      >
        Ver más <Eye size={28} />
      </Link>
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
                    field='total'
                    header='Total'
                    filter
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
      </div>
    </>
  )
}

export default PageClients
