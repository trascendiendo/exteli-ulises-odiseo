'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast'
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';

import Apis from '@/app/libs/apis';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const AddList = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [customers, setCustomers] = useState(null)
  const [selectedCustomers, setSelectedCustomers] = useState([])
  const [listName, setListName] = useState('')
  const [statuses] = useState(['Pendiente', 'Activo', 'Incompleto', 'Finalizado'])
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    nationality: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS }
  })

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
    const fetchCustomers = async () => {
      try {
        const res = await Apis.customers.GetAllCustomers()
        if ( res ) {
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
    fetchCustomers()
    setLoading(false)
  }, [])
  const handleSubmit = async () => {
    setLoading(true)
    const list = {
      nombre: listName,
      selectedCustomers
    }
    await Apis.rrss.PostLists(list)
      .then(() => {
        toast.success('Lista de Difusión registrada con éxito.')
      })
      .catch((error) => {
        toast.error('Error al registrar una Lista de Difusión.')
      })
      .finally(() => {
        setLoading(false)
        router.push('/extranjeria/rrss/lists')
      })
  }
  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = {...filters}
    _filters['global'].value = value
    setFilters(_filters)
    setGlobalFilterValue(value)
  }
  const handleCustomerSelection = (rowData) => {
    setSelectedCustomers(prevSelected => {
      const isAlreadySelected = prevSelected.some(customer => customer.id === rowData.id)
      if ( isAlreadySelected ) {
        return prevSelected.filter(customer => customer.id !== rowData.id)
      } else {
        return [...prevSelected, { nombre: rowData.name, numero: rowData.phone }]
      }
    })
  }
  const renderHeader = () => {
    return (
      <div className='flex gap-4 items-end justify-start'> 
        <div className='flex flex-col w-2/12'>
          <span className='font-bold pb-2'>Nombre de la Lista</span>
          <input 
            className='font-normal p-inputtext' 
            type='text'
            value={listName}
            onChange={e => setListName(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <button
            className='btn btn-success font-bold uppercase'
            style={{ padding: '0.75rem 1.25rem' }}
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
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
      <label className='cursor-pointer pb-2 pl-2 pt-2 pr-6' >
        <input
          id={rowData.id}
          type='checkbox'
          onChange={() => handleCustomerSelection(rowData)}
        />
      </label>
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
          <h2 className="font-bold text-3xl">Agregar Lista de Difusión</h2>
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
              </div>
              <div className="table-responsive">
                <DataTable
                  value={customers}
                  dataKey='id'
                  filters={filters}
                  filterDisplay='row'
                  globalFilterFields={[
                    'name',
                    'nationality.name',
                    'status'
                  ]}
                  header={header}
                  emptyMessage="No se han encontrado clientes"
                >
                  <Column
                    header='Agregar'
                    body={actionBodyTemplate} 
                    exportable={false}
                    style={{ minWidth: '1rem' }}
                  />
                  <Column
                    field='name'
                    header='Nombre'
                    filter
                    filterPlaceholder='Buscar nombre'
                    style={{ minWidth: '10rem' }}
                  />
                  <Column 
                    field='nationality'
                    header='Nacionalidad'
                    filter
                    filterPlaceholder='Buscar por nacionalidad'
                    style={{ minWidth: '5rem' }}
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
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddList
