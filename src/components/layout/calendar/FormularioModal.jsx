import React, { useState } from "react";
import {sweetAlert} from '../../alerts/SweetAlert'
//REDUX
import { useDispatch, useSelector} from 'react-redux'
import {db} from '../../../firebase/firebase'
import {fetchEventos} from '../../../redux/eventoDucks'
const FormularioModal = ({color}) => {

  //REDUX
  const dispatch = useDispatch()
  const user = useSelector(store => store.user.user)
  //State que lee los datos
  const [error,setError] = useState(false);
  const [evento, setEvento] = useState({
    title: "",
    start: "",
    end: "",
    backgroundColor: "",
    borderColor: ""
  });

  const { title, start, end, backgroundColor, borderColor} = evento;

  const handleOnChange = (e) => {
    setEvento({
      ...evento,
      [e.target.name]: e.target.value,
      backgroundColor: color,
      borderColor: color
    });
  };

  const handleOnSubmit = (e) => {
    
    //Validar
    if(title.trim() === '' || start.trim() === '' || end.trim() === ''){
      //SweetAlert de error
      sweetAlert('warning','campos vacíos')
      setError(true)
      return;
    }
    setError(false)
    //Pasar datos
    agregarCita()

    //reiniciar form
    setEvento({
      title: "",
      start: "",
      end: "",
      backgroundColor: "",
      borderColor: ""
    })
  };

  const agregarCita = async() =>{
    try {
      await db.collection('usuarios').doc(user.email).collection('eventos').add({
        title: title,
        start: start,
        end: end,
        backgroundColor: backgroundColor,
        borderColor: borderColor
      })

      dispatch(fetchEventos())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="modal-body" style={{
        backgroundColor: color
      }}>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label>Paciente</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={title}
                onChange={handleOnChange}
              />
              {/* <select
                className="form-control select2"
                style={{ width: "100%" }}
                defaultValue="--Seleccione--"
              >
                <option>Dylan Garcia</option>
                <option>Luis Rivera</option>
              </select> */}
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <label>Costo</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  name="costo"
                />
                <div className="input-group-append">
                  <span className="input-group-text">.00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <label>Empieza</label>
              <div className="input-group mb-3">
                <input
                  type="datetime-local"
                  className="form-control"
                  name="start"
                  value={start}
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <label>Termina</label>
              <div className="input-group mb-3">
                <input
                  type="datetime-local"
                  className="form-control"
                  name="end"
                  value={end}
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </div>

          
        </div>
      </div>
      <div className="modal-footer justify-content-between">
        <button type="button" className="btn btn-default" data-dismiss="modal">
          Cerrar
        </button>
        
        <button type="button" className="btn btn-success" data-dismiss="modal" onClick={handleOnSubmit}>
          Guardar
        </button>
      </div>
    </>
  );
};

export default FormularioModal;
