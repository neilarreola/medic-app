import React,{useState} from 'react'
import {db} from '../../../firebase/firebase'
import {fetchPacientes} from '../../../redux/pacienteDucks'
//REDUX
import { useDispatch, useSelector} from 'react-redux'
import shortid from 'shortid'
const FormularioPaciente = () => {

  //REDUX
  const dispatch = useDispatch()
  const user = useSelector(store => store.user.user)
  const [paciente, setPaciente] = useState({
    nombre: "",
    edad: "",
    sexo: "",
    numero: ""
  });

  const {nombre,edad,numero,sintomas,sexo} = paciente;

  const handleOnChange = (e) => {
    setPaciente({
      ...paciente,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    
    //Validar

    //Pasar datos
    agregarPaciente(paciente)
    //Debe ir el state global de eventos
    //reiniciar form
    setPaciente({
      nombre: "",
      edad: "",
      sexo: "",
      numero: ""
    });
  };

  const agregarPaciente = async () =>{
    try {
      // const res = await db.collection('usuarios').doc(user.email).collection('pacientes').get

      const paciente = {
        nombre: nombre,
        edad: edad,
        numero: numero,
        sexo: sexo,
        id: shortid.generate()
      }
       await db.collection('usuarios').doc(user.email).collection('pacientes').doc(paciente.id).set(paciente) 
      dispatch(fetchPacientes())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="modal-body">
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label>Paciente</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                placeholder="Nombre paciente"
                value= {nombre}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="col-6">
            <div className="form-group">
              <label>Edad</label>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  name="edad"
                  min="1"
                  max="99"
                  placeholder="Edad"
                  value={edad}
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="form-group">
              <label>Teléfono</label>
              <div className="input-group mb-3">
                <input
                  type="tel"
                  className="form-control"
                  name="numero"
                  placeholder="(LADA) 555 555"
                  maxLength="10"
                  value={numero}
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="form-group">
              <label>Sexo</label>
              <div className="input-group mb-3">
                <select
                  className="form-control"
                  name="sexo"
                  value={sexo}
                  onChange={handleOnChange}
                >
                  <option value="">--Sexo--</option>
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                </select>
              </div>
            </div>
          </div>

          
        </div>
      </div>
      <div className="modal-footer justify-content-between">
        <button type="button" className="btn btn-default" data-dismiss="modal" >
          Cerrar
        </button>
        <button type="button" className="btn btn-success" data-dismiss="modal" onClick={handleOnSubmit}>
          Guardar
        </button>
      </div>
    </>
  )
}

export default FormularioPaciente
