'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { Eye } from '@phosphor-icons/react/dist/ssr';
import toast, { Toaster } from 'react-hot-toast'
<<<<<<< Updated upstream

import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';

import Apis from '@/app/libs/apis';
=======
import { Badge } from '@/app/ui/components/atoms';
import apis from '@/app/libs/apis';
>>>>>>> Stashed changes

const PageUsers = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState(null)
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [roles] = useState(['Administrador', 'Colaborador', 'Practicante', 'Super Administrador'])
  const [statuses] = useState(['Activo', 'Pendiente', 'Baja', 'Inhabilitado'])
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    role: { value: null, matchMode: FilterMatchMode.EQUALS },
    phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS }
  })
  const getRoles = (role) => {
    switch (role) {
      case 'Administrador':
        return 'success'
      case 'Colaborador':
        return 'warning'
      case 'Practicante':
        return 'info'
      case 'Super Administrador':
        return 'danger'
    }
  }
  const getSeverity = (status) => {
    switch (status) {
      case 'Activo':
        return 'success'
      case 'Pendiente':
        return 'warning'
      case 'Baja':
        return 'danger'
      case 'Inhabilitado':
        return 'info'
    }
  }

  const getUsers = async () => {
    const { data } = await apis.users.GetAllUsers()
    setUsers(data)
  }

  useEffect(() => {
<<<<<<< Updated upstream
    const fetchUsers = async () => {
      try {
        const res = await Apis.users.GetAllUsers()
        if ( res ) {
          const parseRes = (res) => {
            return res.map(item => ({
              name: `${item.firstName} ${item.lastName}`,
              ...item
            }))
          }
          const newRes = parseRes(res)
          setUsers(newRes)
        }
      } catch (error) {
        toast.error('Error al cargar la lista de usuarios.')
      }
    }
    fetchUsers()
    setIsLoading(false)
=======
    
    getUsers()
>>>>>>> Stashed changes
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
  const rolBodyTemplate = (rowData) => {
    return (
      <Tag 
        value={rowData.role}
        severity={getRoles(rowData.role)}
      />
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
  const rolItemTemplate = (option) => {
    return (
      <Tag 
        value={option}
        severity={getRoles(option)}
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
  const rolRowFilterTemplate = (options) => {
    return (
      <Dropdown 
        value={options.value}
        options={roles}
        onChange={(e) => options.filterApplyCallback(e.value)} 
        itemTemplate={rolItemTemplate} 
        placeholder="Filtrar por rol" 
        className="p-column-filter" 
        showClear 
        style={{ minWidth: '8rem' }} 
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
        className="btn btn-primary"
        href={`./users/${rowData.id}`}
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
          <ul className="breadcrumbs">
            <li>
              <Link href='/'>Home</Link>
            </li>
          </ul>
        </div>
        <div className="w-full">
          <h2 className="font-bold text-3xl">Usuarios</h2>
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
                  href='/extranjeria/users/add'
                >
                  Agregar usuario
                </Link>
              </div>
              <div className="table-responsive">
                <DataTable
                  value={users}
                  paginator
                  rows={14}
                  dataKey='id'
                  filters={filters}
                  filterDisplay='row'
                  globalFilterFields={[
                    'name',
                    'email',
                    'role',
                    'phone',
                    'status'
                  ]}
                  header={header}
                  rowsPerPageOptions={[
                    14, 21, 28, 35, 42, 49
                  ]}
                  emptyMessage="No se han encontrado usuarios"
                >
                  <Column
                    field='name'
                    header='Nombre'
                    filter
                    filterPlaceholder='Buscar por nombre'
                  />
                  <Column
                    field='email'
                    header='Correo electrónico'
                    filter
                    filterPlaceholder='Buscar por correo electrónico'
                  />
                  <Column
                    field='role'
                    header='Rol'
                    showFilterMenu={false}
                    body={rolBodyTemplate}
                    filter
                    filterElement={rolRowFilterTemplate}
                  />
                  <Column
                    field='phone'
                    header='Movil'
                    filter
                    filterPlaceholder='Buscar por móvil'
                  />
                  <Column
                    field='status'
                    header='Status'
                    showFilterMenu={false}
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
export default PageUsers
