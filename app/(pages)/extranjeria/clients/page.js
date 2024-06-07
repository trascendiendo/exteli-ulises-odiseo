import { 
  Eye,
  PencilSimple
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

export default function PageClients () {
  return (
    <>
      <div
        className="page-header bg-transparent flex items-center"
        style={{
          borderRadius: '8px',
          minHeight: '55px',
          padding: '13px 0px'
        }}
      >
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
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Pasaporte</th>
                      <th>Status</th>
                      <th>Tramite</th>
                      <th>Agente</th>
                      <th>Pago</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="flex items-center">
                          <div className="ml-4">
                            <Image
                              src='/images/avatarCustomer.jpg'
                              height={40}
                              width={40}
                              alt="Rickon Stark"
                              quality={80}
                              loading="lazy"
                            />
                          </div>
                          <div className="mx-3">
                            <h5 className="mb-0">Rickon Stark</h5>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-center">
                          120091599
                        </div>
                      </td>
                      <td>
                        <div className="text-center">
                          <span>En curso</span>
                        </div>
                      </td>
                      <td>
                        <div className="text-center">
                          Asilo
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center">
                          <div className="ml-4">
                            <Image
                              src='/images/avatarCustomer.jpg'
                              height={40}
                              width={40}
                              alt="Flor"
                              quality={80}
                              loading="lazy"
                            />
                          </div>
                          <div className="mx-3">
                            <h5 className="mb-0">Flor</h5>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-center">
                          <span>1 de 2</span>
                        </div>
                      </td>
                      <td>
                        <div className="text-center">
                          <button className="btn btn-primary">
                            Ver más <Eye size={28} />
                          </button>
                          <button className="btn btn-secondary">
                            Editar <PencilSimple size={28} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}