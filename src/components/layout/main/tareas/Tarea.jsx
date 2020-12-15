import React from 'react'

const Tarea = ({tarea}) => {

  const { nombre, estado} = tarea;

  return (  
    <li>
        {/* checkbox */}
        <div className="icheck-primary d-inline ml-2">
          <input
            type="checkbox"
            defaultValue
            name="todo1"
            id={1}
          />
          <label htmlFor={1} />
        </div>
        {/* todo text */}
        <span className="text">{nombre}</span>
        {/* Emphasis label */}
        <small className="badge badge-danger"></small>
        {/* General tools such as edit or delete*/}
        <div className="tools">
          <button className="btn btn-xs btn-success mr-2">Editar</button>
          <button className="btn btn-xs btn-danger">Eliminar</button>
        </div>
      </li>
  );
}
 
export default Tarea;