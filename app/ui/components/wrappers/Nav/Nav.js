'use client'

import Link from "next/link"
import Image from "next/image";
import { useState } from "react";
import { 
  Speedometer, 
  FolderUser, 
  Folders, 
  FolderSimplePlus, 
  Stack, 
  StackSimple, 
  StackPlus, 
  FileDoc, 
  Users, 
  UserCircleGear, 
  UserCirclePlus,
  DotsThreeVertical
} from "@phosphor-icons/react/dist/ssr";

const Nav = () => {
  const [userAvatar, setUserAvatar] = useState('')

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
                  <Link href='/'>
                    <span className="pc-micon"><Speedometer size={24} /></span>
                    <span className="pc-mtext">Dashboard</span>
                  </Link>
                </li>
                <li className="pc-item pc-hasmenu">
                  <a href="#">
                    <span className="pc-micon"><FolderUser size={24} /></span>
                    <soan className='pc-mtext'>
                      Clientes
                    </soan>
                    <span className="pc-marrow"></span>
                    <span className="pc-badge"></span>
                  </a>
                  <ul className="pc-submenu">
                    <li className="pc-item">
                      <Link href='/'>
                        <span className="pc-micon"><Folders size={24} /></span>
                        <span className="pc-mtext">Administrar clientes</span>
                      </Link>
                    </li>
                    <li className="pc-item">
                      <Link href='/'>
                        <span className="pc-micon"><FolderSimplePlus size={24} /></span>
                        <span className="pc-mtext">Agregar clientes</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* solo para colaboradores */}
                <li className="pc-item active">
                  <Link href='/'>
                    <span className="pc-micon"><Stack size={24} /></span>
                    <span className="pc-mtext">Tareas</span>
                  </Link>
                </li>
                {/* solo para admin y superadmin */}
                <li className="pc-item pc-hasmenu">
                  <a href="#">
                    <span className="pc-micon"><Stack size={24} /></span>
                    <soan className='pc-mtext'>
                      Tareas
                    </soan>
                    <span className="pc-marrow"></span>
                    <span className="pc-badge"></span>
                  </a>
                  <ul className="pc-submenu">
                    <li className="pc-item">
                      <Link href='/'>
                        <span className="pc-micon"><StackSimple size={24} /></span>
                        <span className="pc-mtext">Administrar tareas</span>
                      </Link>
                    </li>
                    <li className="pc-item">
                      <Link href='/'>
                        <span className="pc-micon"><StackPlus size={24} /></span>
                        <span className="pc-mtext">Agregar tarea</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="pc-caption">
                  <label>Ajustes</label>
                </li>
                <li className="pc-item">
                  <Link href='/'>
                    <span className="pc-micon"><FileDoc size={24} /></span>
                    <span className="pc-mtext">Trámites</span>
                  </Link>
                </li>
                <li className="pc-item pc-hasmenu">
                  <a href="#">
                    <span className="pc-micon"><Users size={24} /></span>
                    <soan className='pc-mtext'>
                      Usuarios
                    </soan>
                    <span className="pc-marrow"></span>
                    <span className="pc-badge"></span>
                  </a>
                  <ul className="pc-submenu">
                    <li className="pc-item">
                      <Link href='/'>
                        <span className="pc-micon"><UserCircleGear size={24} /></span>
                        <span className="pc-mtext">Administrar usuarios</span>
                      </Link>
                    </li>
                    <li className="pc-item">
                      <Link href='/'>
                        <span className="pc-micon"><UserCirclePlus size={24} /></span>
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
