import React, { useState} from 'react'
import ListadoTareas from './ListadoTareas'

const Tareas = () => {

  //
  const [tarea, setTarea] = useState({
    nombre : '',
    estado : false,
  });
  const {nombre} = tarea;

  const [tareas, setTareas] = useState([]);
  //Error
  const [error, setError] = useState(false);

  const onChange = e => {
    setTarea({
      ...tarea,
      [e.target.name] : e.target.value
    })
  }

  const submitTarea = e =>{
    e.preventDefault();
    //Validar
    if(nombre.trim()===''){
      setError(true);
      return; //para que no siga ejecutando
    }
    //Eliminar
    setError(false);
    //Asignar ID

    //Crear tarea
    setTareas([
      ...tareas,
      tarea
    ]);
    //Reiniciar form
    setTarea({
      nombre: '',
      estado: false
    })
  }

  return ( <div className="card">
  <div className="card-header bg-primary">
    <h3 className="card-title">
      <i className="ion ion-clipboard mr-1" />
      Lista de tareas
    </h3>
    
  </div>
  {/* /.card-header */}
  <div className="card-body bg-primary">
    <ListadoTareas 
      tareas={tareas}
    />
  </div>
  {/* /.card-body */}
  <form 
    onSubmit={submitTarea}
  >

    <div className="card-footer clearfix">
      <div className="input-group">
        <input
          id="new-event"
          type="text"
          className="form-control"
          placeholder="Titulo"
          name="nombre"
          value={nombre}
          onChange={onChange}
          />
        <div className="input-group-append">
          <button id="add-new-event" type="submit" className="btn btn-info float-right">
            <i className="fas fa-plus mr-2"></i>
              Agregar
          </button>
        </div>
        {/* /btn-group */}
      </div>
        {error ? <p className="text-danger">No se aceptan campos vacíos</p> : null}
    </div>
  </form>
</div> );
}
 
export default Tareas;