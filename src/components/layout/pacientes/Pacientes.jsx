import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import ModalDefault from "../../modals/ModalDefault";
import FormularioPaciente from "./FormularioPaciente"

import { useDispatch, useSelector} from 'react-redux'
import {fetchPacientes} from '../../../redux/pacienteDucks'
import {db} from '../../../firebase/firebase'
import Swal from 'sweetalert2'
const Pacientes = () => {

  
  //State global de pacientes
  //REDUX
  const dispatch = useDispatch()
  const pacientes = useSelector(store => store.pacientes.pacientes)
  const user = useSelector(store => store.user.user)


  //useEffect para los eventos
  useEffect(() => {
    dispatch(fetchPacientes())
  }, [])


  const verPaciente = () =>{
    alert('Ver paciente')
  }
  const eliminarPaciente = async (id) =>{
    try {
      Swal.fire({
        title: 'Estás seguro?',
        text: "No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

          db.collection('usuarios').doc(user.email).collection('pacientes').doc(id).delete();
          dispatch(fetchPacientes())
          Swal.fire(
            'Eliminado!',
            'El paciente ha sido eliminado.',
            'success'
          )
        }
      })

      //dispatch(fetchPacientes())
    } catch (error) {
      console.log(error)
    }
  }
  const editarPaciente = () =>{

  }

  //config de table material
  const columnas = [
    {
      title: "ID",
      field: "id"
    },
    {
      title: "Nombre",
      field: "nombre",
    },
    {
      title: "Sexo",
      field: "sexo"
    },
    {
      title: "Numero",
      field: "numero",
    },
    {
      title: "Edad",
      field: "edad",
      type: "numeric",
    },
  ];


  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Pacientes</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={"/dashboard"}>Home</Link>
                </li>
                <li className="breadcrumb-item active">Pacientes</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Botones */}

            <div className="col-md-3">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Opciones paciente</h3>
                </div>
                <div className="card-body">
                  <button className="btn btn-block btn-lg btn-primary"
                    id="add-new-pacient"
                    type="button"
                    data-target="#modal-default"
                    data-toggle="modal"
                  >
                    <i className="fas fa-user-plus"></i> Nuevo paciente
                  </button>
                </div>
              </div>
            </div>

            <ModalDefault titulo={"Nuevo paciente"} contenido={<FormularioPaciente/>} clase='modal-dialog'/>
            {/* Tabla */}
            <div className="col-md-9">
              <MaterialTable
                columns={columnas}
                data={pacientes}
                title="Pacientes"
                actions={[
                  {
                    icon: 'visibility',
                    tooltip: 'Ver paciente',
                    onClick: (event, rowData)=>verPaciente(rowData.id)
                  },
                  {
                    icon: 'edit',
                    tooltip: 'Editar paciente',
                    onClick: (event, rowData)=>editarPaciente(rowData.id)
                  },
                  {
                    icon: 'delete',
                    tooltip: 'Eliminar paciente',
                    onClick: (event, rowData)=>eliminarPaciente(rowData.id)
                  },
                ]}
                options={{
                  actionsColumnIndex: -1
                }}
                localization={{
                  header:{
                    actions: 'Acciones'
                  }
                }}
                
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pacientes;
