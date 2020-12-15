import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import ModalDefault from "../../modals/ModalDefault";
import FormularioModal from "./FormularioModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from '@fullcalendar/bootstrap';
import esLocale from '@fullcalendar/core/locales/es';
import { CirclePicker} from 'react-color';

import { useDispatch, useSelector} from 'react-redux'
import { guardarEvento, fetchEventos } from '../../../redux/eventoDucks'
import {db} from '../../../firebase/firebase'

const Calendar = () => {

  //useEffect para los eventos
  useEffect(() => {
    dispatch(fetchEventos())
  }, [])


  //REDUX
  const dispatch = useDispatch()
  const eventos = useSelector(store => store.eventos.eventos)
  const user = useSelector(store => store.user.user)
  //Estado de los COLORES
  const [colorEstado, setColorEstado] = useState('');


  const handleChangeColor = (color) =>{
    setColorEstado(color.hex)
  }
  const colorEvento = {
    backgroundColor : colorEstado,
    borderColor : colorEstado
  }

  const handleEventClick = e =>{
    alert(e.event.title)
  }

  const agregarCita = () =>{
    
  }

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Calendario</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={"/dashboard"}>Home</Link>
                </li>
                <li className="breadcrumb-item active">Calendario</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="sticky-top mb-3">
                {/* /.card */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Crear evento</h3>
                  </div>
                  <div className="card-body">
                    <div
                      className="btn-group"
                      style={{ width: "100%", marginBottom: 10 }}
                    >
                      {/*<button type="button" id="color-chooser-btn" class="btn btn-info btn-block dropdown-toggle" data-toggle="dropdown">Color <span class="caret"></span></button>*/}
                      <CirclePicker 
                        colors = {['#f44336','#9C27B0','#03A9F4','#009688','#4CAF50','#FFC107']}
                        onChange={handleChangeColor}
                      />
                      
                    </div>
                    {/* /btn-group */}
                    <div className="input-group mt-2">
                      
                        <button
                          id="add-new-event"
                          type="button"
                          className="btn btn-primary btn-block"
                          data-target="#modal-default"
                          data-toggle="modal"
                          style={colorEvento}
                        >
                          Agregar
                        </button>
                      {/* /btn-group */}
                    </div>
                    {/* /input-group */}
                  </div>
                </div>
              </div>
            </div>

            <ModalDefault titulo={"Cita"} contenido={<FormularioModal agregarCita={agregarCita} color={colorEstado}/>} clase='modal-dialog' />

            {/* /.col */}
            <div className="col-md-9">
              <div className="card card-primary">
                <div className="card-body p-0">
                  {/* THE CALENDAR */}
                  <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, bootstrapPlugin]}
                    themeSystem= 'bootstrap'
                    locales= {[esLocale]}
                    locale= 'es'
                    headerToolbar={{
                      start: 'prev,next today',
                      center: 'title',
                      end: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView="dayGridMonth"
                    weekends={true}
                    //Eventos
                    events={eventos}
                    // dateClick={handleDateClick}
                    eventClick={handleEventClick}
                  />
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default Calendar;
