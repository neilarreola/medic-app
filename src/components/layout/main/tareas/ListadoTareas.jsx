import React from 'react'
import Tarea from './Tarea';

const ListadoTareas = ({tareas}) => {



  return (
    <>  
      <ul className="todo-list" data-widget="todo-list">
        {
          tareas.length === 0 ? (
            <div className="card bg-warning">
              <div className="card-body">
              <h3 className=" text-center">No hay tareas</h3>
              </div>
            </div>
          )
          : tareas.map(tarea => (
            <Tarea 
              tarea = {tarea}
            />
          ))
        }
      </ul>
    </>
  );
}
 
export default ListadoTareas;