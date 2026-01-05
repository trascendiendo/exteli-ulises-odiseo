'use client'

import { Eye } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Tooltip } from 'primereact/tooltip';

import Apis from '@/app/libs/apis';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const PageClients = () => {
  const [loading, setLoading] = useState(true)
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [customers, setCustomers] = useState(null)
  const [nationalities, setNationalities] = useState(null)
  const [agents, setAgents] = useState(null)
  const [statuses] = useState(['Pendiente', 'Activo', 'Incompleto', 'Finalizado'])
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    documentNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    nationality: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    enterDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    agent: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS }
  });
  const getSeverity = (status) => {
    switch (status) {
      case 'Pendiente':
        return 'warning'
      case 'Activo':
        return 'success'
      case 'Incompleto':
        return 'danger'
      case 'Finalizado':
        return 'info'
    }
  }
  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const res = await Apis.nationalities.GetAllNationalities()
        if (res) {
          const parseRes = (res) => {
            return res.map(item => ({
              name: item.nationality.country
            }))
          }
          const newRes = parseRes(res)
          setNationalities(newRes)
        }
      } catch (error) {
        toast.error('Error al cargar la lista de nacionalidades.')
      }
    }
    const fetchAgents = async () => {
      try {
        const res = await Apis.users.GetAllUsers()
        if (res) {
          const parseRes = (res) => {
            return res.map(item => ({
              name: `${item.firstName} ${item.lastName}`
            }))
          }
          const newRes = parseRes(res)
          setAgents(newRes)
        }
      } catch (error) {
        toast.error('Error al cargar la lista de agentes.')
      }
    }
    const fetchCustomers = async () => {
      try {
        const res = await Apis.customers.GetAllCustomers()
        if (res) {
          const parseRes = (res) => {
            return res.map(item => ({
              id: item.id,
              name: `${item.customer.firstName} ${item.customer.lastName}`,
              ...item.customer
            }))
          }
          const newRes = parseRes(res)
          setCustomers(newRes)
        }
      } catch (error) {
        toast.error('Error al cargar la lista de clientes.')
      }
    }
    fetchNationalities()
    fetchAgents()
    fetchCustomers()
    setLoading(false)
  }, [])
  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = { ...filters }
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
        severity={getSeverity(option)}
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
      <>
        <Tooltip target='.btn-primary' />
        <Link
          className="btn btn-primary no-ml"
          data-pr-tooltip="Ver cliente"
          data-pr-position='top'
          href={`./customers/${rowData.id}`}
        >
          <Eye size={28} />
        </Link>
      </>
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
          <h2 className="font-bold text-3xl">Clientes</h2>
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
                  href='/extranjeria/customers/add'
                >
                  Agregar cliente
                </Link>
              </div>
              <div className="table-responsive">
                <DataTable
                  value={customers}
                  paginator
                  rows={14}
                  dataKey='id'
                  filters={filters}
                  filterDisplay='row'
                  globalFilterFields={[
                    'name',
                    'documentNumber',
                    'nationality.name',
                    'agent.name',
                    'status'
                  ]}
                  header={header}
                  rowsPerPageOptions={[
                    14, 21, 28, 35, 42, 49
                  ]}
                  emptyMessage="No se han encontrado clientes"
                >
                  <Column
                    field='name'
                    header='Nombre'
                    filter
                    filterPlaceholder='Buscar nombre'
                  />
                  <Column
                    field='documentNumber'
                    header='Documentación'
                    filter
                    filterPlaceholder='Buscar por documentación'
                  />
                  <Column
                    field='phone'
                    header='Móvil'
                    filter
                    filterPlaceholder='Buscar móvil'
                  />
                  <Column
                    field='nationality'
                    header='Nacionalidad'
                    filter
                    filterPlaceholder='Buscar por nacionalidad'
                  />
                  <Column
                    field='enterDate'
                    header='Año de ingreso'
                    filter
                    filterPlaceholder='Buscar por año de ingreso'
                  />
                  <Column
                    field='agent'
                    header='Agente'
                    filter
                    filterPlaceholder='Buscar agente'
                  />
                  <Column
                    field='status'
                    header='Status'
                    showFilterMenu={false}
                    style={{ width: '8rem' }}
                    body={statusBodyTemplate}
                    filter
                    filterElement={statusRowFilterTemplate}
                  />
                  <Column
                    header='Acciones'
                    body={actionBodyTemplate}
                    exportable={false}
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

//export default WithAuth()
export default PageClients
