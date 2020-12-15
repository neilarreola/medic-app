import React from 'react'

const UserTeam = ({usuario}) => {







  return (
    <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
  <div className="card bg-light">
    <div className="card-header text-muted border-bottom-0">
    {usuario.especialidad}
    </div>
    <div className="card-body pt-0">
      <div className="row">
        <div className="col-7">
          <h2 className="lead"><b>{usuario.displayName}</b></h2>
          <p className="text-muted text-sm"><b>Rol: </b> <span className="badge bg-danger">Administrador</span> </p>
          <ul className="ml-4 mb-0 fa-ul text-muted">
            <li className="small"><span className="fa-li"><i className="fas fa-lg fa-building" /></span> Dirección: {usuario.direccion}</li>
            <li className="small"><span className="fa-li"><i className="fas fa-lg fa-phone" /></span> Teléfono: {usuario.telefono}</li>
          </ul>
        </div>
        <div className="col-5 text-center">
          <img src={usuario.photoURL} alt = "perfil-usuario" className="img-circle img-fluid" 
          style={{
                  width: 90,
                  height: 90
                }}/>
        </div>
      </div>
    </div>
    <div className="card-footer">
      <div className="text-right">
        <button className="btn btn-sm bg-teal mr-2">
          <i className="fas fa-comments" />
        </button>
        <button className="btn btn-sm btn-primary">
          <i className="fas fa-user" /> Ver perfil
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default UserTeam
