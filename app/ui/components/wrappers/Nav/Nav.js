'use client'

import Link from "next/link"
import Image from "next/image";
import { useState } from "react";
import { 
  Speedometer, 
  FolderUser, 
  Stack, 
  FileDoc, 
  Users, 
  DotsThreeVertical
} from "@phosphor-icons/react/dist/ssr";

const Nav = () => {
  const [userAvatar, setUserAvatar] = useState('/images/avatarUserMale.png')

  const handleSubmenu = (e) => {
    let thisElement = e.target
    let thisParentElement = thisElement.parentElement
    let thisSiblingElement = thisElement.nextElementSibling
    let allHasmenu = document.querySelectorAll('.pc-item.pc-hasmenu')
    let allSubmenu = document.querySelectorAll('.pc-submenu')
    allHasmenu.forEach(item => {
      item.classList.remove('pc-trigger')
    })
    allSubmenu.forEach(item => {
      item.style.display = 'none'
      item.style.boxSizing = ''
    })
    thisParentElement.classList.add('pc-trigger')
    thisSiblingElement.style.display = 'block'
    thisSiblingElement.style.boxSizing = 'border-box'
  }

  return (
    <nav
      className="pc-sidebar bottom-0 fixed overflow-hidden top-0"
      style={{
        background: '#fff',
        borderRight: 'none',
        boxShadow: '0px 0px 24px rgba(27, 46, 94, 0.05)',
        width: '280px',
        zIndex: '1026'
      }}
    >
      <div
        className="navbar-wrapper"
        style={{
          display: 'block'
        }}
      >
        <div
          className="m-header flex items-center"
          style={{
            height: '74px',
            padding: '16px 24px'
          }}
        >
          <Link
            className="flex items-center justify-start"
            href='/pages/extranjeria'
          >
            <Image 
              src='/images/logo.png'
              height={24}
              width={108}
              alt="Extranjería ELI"
              quality={100}
              loading="lazy"
            />
            <span
              style={{
                background: 'linear-gradient(206.48deg, #A389D4 11.14%, #899ED4 104.6%)',
                borderRadius: '50rem',
                color: '#fff',
                display: 'inline-block',
                fontSize: '.75rem',
                fontWeight: '500',
                lineHeight: '1',
                marginLeft: '.5rem',
                padding: '.45rem .8rem',
                verticalAlign: 'baseline',
                whiteSpace: 'nowrap'
              }}
            >
              v1.0
            </span>
          </Link>
        </div>
        <div
          className="navbar-content relative"
          style={{
            height: 'calc(100vh - 149px)',
            padding: '10px 0'
          }}
        >
          <div
            className="overflow-hidden"
            style={{
              height: 'inhereit',
              margin: '-10px 0px',
              maxHeight: 'inhereit',
              maxWidth: 'inhereit',
              width: 'inhereit'
            }}
          >
            <div>
              <ul>
                <li className="pc-caption">
                  <label>Extranjería</label>
                </li>
                <li className="pc-item">
                  <Link href='/extranjeria'>
                    <span className="pc-micon"><Speedometer size={24} /></span>
                    <span className="pc-mtext">Dashboard</span>
                  </Link>
                </li>
                <li className="pc-item pc-hasmenu">
                  <a href="#" onClick={e => handleSubmenu(e)}>
                    <span className="pc-micon"><FolderUser size={24} /></span>
                    <span className='pc-mtext'>
                      Clientes
                    </span>
                    <span className="pc-arrow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </span>
                    <span className="pc-badge"></span>
                  </a>
                  <ul className="pc-submenu" style={{ display: 'none' }}>
                    <li className="pc-item">
                      <Link href='/extranjeria/customers'>
                        <span className="pc-mtext">Administrar clientes</span>
                      </Link>
                    </li>
                    <li className="pc-item">
                      <Link href='/extranjeria/customers/add'>
                        <span className="pc-mtext">Agregar clientes</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* solo para colaboradores */}
                <li className="pc-item">
                  <Link href='/extrajeria/tasks'>
                    <span className="pc-micon"><Stack size={24} /></span>
                    <span className="pc-mtext">Tareas</span>
                  </Link>
                </li>
                {/* solo para admin y superadmin */}
                <li className="pc-item pc-hasmenu">
                  <a href="#" onClick={e => handleSubmenu(e)}>
                    <span className="pc-micon"><Stack size={24} /></span>
                    <span className='pc-mtext'>
                      Tareas
                    </span>
                    <span className="pc-arrow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </span>
                    <span className="pc-badge"></span>
                  </a>
                  <ul className="pc-submenu" style={{ display: 'none' }}>
                    <li className="pc-item">
                      <Link href='/extranjeria/tasks'>
                        <span className="pc-mtext">Administrar tareas</span>
                      </Link>
                    </li>
                    <li className="pc-item">
                      <Link href='/extranjeria/tasks/add'>
                        <span className="pc-mtext">Agregar tarea</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="pc-caption">
                  <label>Ajustes</label>
                </li>
                <li className="pc-item">
                  <Link href='/extranjeria/procedures'>
                    <span className="pc-micon"><FileDoc size={24} /></span>
                    <span className="pc-mtext">Trámites</span>
                  </Link>
                </li>
                <li className="pc-item pc-hasmenu">
                  <a href="#" onClick={e => handleSubmenu(e)}>
                    <span className="pc-micon"><Users size={24} /></span>
                    <span className='pc-mtext'>
                      Usuarios
                    </span>
                    <span className="pc-arrow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </span>
                    <span className="pc-badge"></span>
                  </a>
                  <ul className="pc-submenu" style={{ display: 'none' }}>
                    <li className="pc-item">
                      <Link href='/extranjeria/users'>
                        <span className="pc-mtext">Administrar usuarios</span>
                      </Link>
                    </li>
                    <li className="pc-item">
                      <Link href='/extranjeria/users/add'>
                        <span className="pc-mtext">Agregar usuario</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="pc-user-card"
          style={{
            borderTop: '1px solid #DBE0E5',
            boxShadow: 'none',
            margin: '0'
          }}
        >
          <div
            style={{
              padding: '15px'
            }}
          >
            <div
              className="flex items-center"
            >
              <div className="flex-shrink">
                <Image
                  src={userAvatar}
                  height={45}
                  width={45}
                  alt="User"
                  quality={80}
                  style={{ borderRadius: '45px', objectFit: 'cover' }}
                  loading="lazy"

                />
              </div>
              <div
                className="flex-grow ml-4"
              >
                <div className="dropdown">
                  <a href="#">
                    <div className="flex items-center">
                      <div className="flex-grow mr-2">
                        <h6 className="mb-0 text-sm">
                          John Doe
                        </h6>
                        <small
                          style={{
                            opacity: '0.6'
                          }}
                        >
                          Colaborador
                        </small>
                      </div>
                      <div className="flex-shrink-0">
                        <div
                          className="btn"
                        >
                          <DotsThreeVertical size={28} />
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className="dropdown-menu">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
