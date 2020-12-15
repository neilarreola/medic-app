import React,{useRef} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'
import {useReactToPrint} from 'react-to-print'
//Componente a imprimir
import RecetaImprimir from "./RecetaImprimir";
const Receta = () => {
  const today = new Date()
  const month = today.getMonth() +1
  const diaActual = today.getDate() + "/" + month + "/" + today.getFullYear();

  const user = useSelector(store => store.user.user)




  //ReactToPrint
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Receta</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={"/dashboard"}>Home</Link>
                </li>
                <li className="breadcrumb-item active">Receta</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* <RecetaImprimir/> */}
      <div className="content">
        <div className="container-fluid">
          <div className="invoice p-3 mb-3 impresion">
            <style>
              {`@media print {
                .form-control{border:0}}`
              }
            </style>
            <style>
              {`@media print {
                .main-footer{display:none}}`
              }
            </style>
            {/* title row */}
            <div className="row">
              <div className="col-12">
                <h4>
                  <i className="fas fa-hospital" /> Consultorio Médico
                  <p className="float-right">{`${diaActual}`}</p>
                </h4>
              </div>
              {/* /.col */}
            </div>
            <div className="card-header">
              <h3 className="card-title">Dr. {user.displayName}</h3>
              <br />
            <p>{user.direccion}</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam perspiciatis exercitationem, cum ea voluptatibus assumenda.</p>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="card-body">
                  <form className="form-horizontal">
                    <div className="form-group row">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Paciente
                      </label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Nombre del paciente"/>
                      </div>
                    </div>
                  </form>
                  <textarea className="form-control" rows="10" placeholder="Ingresa las indicaciones..."></textarea>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card-body">
                  <form className="form-horizontal">
                    <div className="form-group row">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Temp
                      </label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Ej. 37 ºC"/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="" className="col-sm-2 col-form-label" >
                        Edad
                      </label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Ej. 20 años"/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Peso
                      </label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Ej. 65 kg"/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Altura
                      </label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Ej. 1.70 cm"/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <img src="/dist/img/firma.png" alt="" className="img-fluid"/>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* /.row */}
            {/* this row will not appear when printing */}
            <div className="row no-print">
              <div className="col-12">
                <button href="/#" target="_blank" className="btn btn-default"
                  onClick= {()=> window.print()}
                >
                  <i className="fas fa-print" /> Imprimir
                </button>
                <button type="button" className="btn btn-success float-right" data-target="#modal-default"
                          data-toggle="modal">
                  <i className="far fa-credit-card" /> Enviar por correo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receta;
