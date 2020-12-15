import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'
import { actualizarUsuarioAccion, actualizarFotoAccion } from '../../../redux/userDucks'
import Spinner from '../../Spinner'
import { sweetAlert } from "../../alerts/SweetAlert";
import Swal from 'sweetalert2'
const Profile = () => {

  //REDUX
  const dispatch = useDispatch()


  const user = useSelector(store => store.user.user)
  const loading = useSelector(store => store.user.loading)

  const [nombreUsuario, setNombreUsuario] = useState('')
  const [especialidadUsuario, setEspecialidadUsuario] = useState('')
  const [telefonoUsuario , setTelefonoUsuario ] = useState('')
  const [direccionUsuario, setDireccionUsuario] = useState('')

  const actualizarUsuario = () => {
    if(nombreUsuario.trim() === '' || especialidadUsuario.trim() ==='' || telefonoUsuario.trim()==='' || direccionUsuario.trim()===''){
      Swal.fire(
        'Campos vacíos!',
        'Nada que cambiar',
        'warning'
      )
      return;
    }
    dispatch(actualizarUsuarioAccion(nombreUsuario, especialidadUsuario, telefonoUsuario,direccionUsuario))
    setNombreUsuario('');
    setEspecialidadUsuario('');
    setTelefonoUsuario('');
    setDireccionUsuario('');
  }

  const seleccionarArchivo = imagen =>{
    const imagenCliente = imagen.target.files[0]
    //Validar
    if(imagenCliente === undefined){
      //Mandar un sweetAlert
      sweetAlert('warning', 'No se seleccionó una imagen')
      return;
    }

    if(imagenCliente.type === "image/png" || imagenCliente.type === "image/jpg" || imagenCliente.type === "image/jpeg"){
      dispatch(actualizarFotoAccion(imagenCliente))
    }else{
      sweetAlert('error','Sólo archivos .png .jpg .jpeg')
      console.log(imagenCliente)
    }
  }
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Perfil</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={"/dashboard"}>Home</Link>
                </li>
                <li className="breadcrumb-item active">Perfil</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>

      <div className="content">
        <div className="container-fluid">
          <div className="card card-widget widget-user">
            <div className="widget-user-header bg-primary">
              <h3 className="widget-user-username">
                {user.displayName}
              </h3>
              <h5 className="widget-user-desc">Cirujano</h5>
            </div>
            <div className="widget-user-image">
              <img
                src={user.photoURL}
                alt="user"
                className="img-circle elevation-2"
                style={{
                  width: 90,
                  height: 90
                }}
              />
              
                <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" style={{display:'none'}}
                onChange= {e => seleccionarArchivo(e)} disabled={loading}/>
                <label className="btn btn-dark" htmlFor="inputGroupFile01" style={{borderRadius:'50px'}}>
                  <i className="fas fa-folder-plus"></i>
                </label>
              
            </div>
            <div className="card-footer">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <div className="card card-primary">
                      <div className="card-header">
                        <h3 className="card-title">Perfil</h3>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body">
                        <strong>
                          <i className="fas fa-book mr-1" />Formación
                        </strong>
                        <p className="text-muted">
                          {user.especialidad}
                        </p>
                        <hr />
                        <strong>
                          <i className="fas fa-map-marker-alt mr-1" /> Dirección
                        </strong>
                        <p className="text-muted">{user.direccion}</p>
                        <hr />
                        <strong>
                          <i className="fas fa-map-marker-alt mr-1" /> Teléfono
                        </strong>
                        <p className="text-muted">{user.telefono}</p>
                        <hr />
                        <strong>
                          <i className="fas fa-at" /> Correo
                        </strong>
                        <p className="text-muted">
                          {user.email}
                        </p>
                        <hr />
                        <strong>
                          <i className="fas fa-calendar-day" /> Fecha creación
                        </strong>
                        <p className="text-muted">
                          {user.creationTime}
                        </p>
                        <hr />
                        <strong>
                          <i className="far fa-file-alt mr-1" /> Privilegios
                        </strong>
                        <br />
                        <span className="badge badge-danger">Administrador</span>
                      </div>
                      {/* /.card-body */}
                    </div>
                  </div>


                  <div className="col-md-9">
                    <div className="card">
                      <div className="card-header p-2">
                        <ul className="nav nav-pills">
                          <li className="nav-item"><a className="nav-link active" href="#activity" data-toggle="tab">Ajustes de cuenta</a></li>
                          <li className="nav-item"><a className="nav-link" href="#settings" data-toggle="tab">Cambiar contraseña</a></li>
                        </ul>
                      </div>

                      <div className="card-body">
                        <div className="tab-content">
                          {loading ? 
                                <div className="card-body">
                                  <div className="d-flex justify-content-center">
                                  <div className="spinner-border align-items-center" role="status">
                                    <span className="sr-only">Cargando</span>
                                  </div>
                                  </div>
                                </div> 
                            :
                            <> 
                            <div className="active tab-pane" id="activity">
                              <form className="form-horizontal">
                                <div className="form-group row">
                                  <label htmlFor="inputName" className="col-sm-2 col-form-label">Nombre</label>
                                  <div className="col-sm-10">
                                    <input type="email" className="form-control" id="inputName" placeholder="Nombre" 
                                      value={nombreUsuario}
                                      onChange={e => setNombreUsuario(e.target.value)}
                                    />
                                  </div>
                                </div>
                                
                                <div className="form-group row">
                                  <label htmlFor="inputName2" className="col-sm-2 col-form-label">Formación</label>
                                  <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputName2" placeholder="Formación" 
                                      value={especialidadUsuario}
                                      onChange={e => setEspecialidadUsuario(e.target.value)}
                                    />
                                  </div>
                                </div>

                                <div className="form-group row">
                                  <label htmlFor="inputName2" className="col-sm-2 col-form-label">Dirección</label>
                                  <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputName2" placeholder="Ubicación" 
                                      value={direccionUsuario}
                                      onChange={e => setDireccionUsuario(e.target.value)}
                                    />
                                  </div>
                                </div>
                                
                                <div className="form-group row">
                                  <label htmlFor="inputName2" className="col-sm-2 col-form-label">Teléfono</label>
                                  <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputName2" placeholder="Numero de contacto" 
                                    value={telefonoUsuario}
                                    onChange={e => setTelefonoUsuario(e.target.value)}
                                    />
                                  </div>
                                </div>

                               
                                
                                <div className="form-group row">
                                  <div className="offset-sm-2 col-sm-10">
                                    <button type="button" className="btn btn-success"
                                    onClick={actualizarUsuario}
                                    >Guardar cambios</button>
                                  </div>
                                </div>
                              </form>
                            </div>

                            <div className="tab-pane" id="settings">
                            <form className="form-horizontal"
                              
                            >
                                <div className="form-group row">
                                  <label htmlFor="inputEmail" className="col-sm-3 col-form-label">Nueva contraseña</label>
                                  <div className="col-sm-9">
                                    <input type="password" className="form-control" id="inputEmail" placeholder="Ingresa tu nueva contraseña" />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="inputName2" className="col-sm-3 col-form-label">Confirmar contraseña</label>
                                  <div className="col-sm-9">
                                    <input type="password" className="form-control" id="inputName2" placeholder="Repite la contraseña" />
                                  </div>
                                </div>

                                <div className="form-group row">
                                  <div className="offset-sm-2 col-sm-10">
                                    <button type="button" 
                                    className="btn btn-success"
                                    
                                    >Guardar cambios</button>
                                  </div>
                                </div>
                              </form>
                            </div>
                            </>
                          }
                          
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
