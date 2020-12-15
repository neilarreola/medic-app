import React, { useEffect } from "react";
import Tareas from "./tareas/Tareas";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'

const Inicio = () => {
  const user = useSelector(store => store.user.user)
  const eventos = useSelector(store => store.eventos.eventos)
  const pacientes = useSelector(store => store.pacientes.pacientes)
  const team = useSelector(store => store.team.team)

 
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Inicio</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={'/dashboard'}>Home</Link>
                </li>
                <li className="breadcrumb-item active">Inicio</li>
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
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>8</h3>
                  <p>Pacientes</p>
                </div>
                <div className="icon">
                  <i className="ion ion-ios-people" />
                </div>
                <button className="btn btn-info btn-block">
                  Más info <i className="fas fa-arrow-circle-right" />
                </button>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>
                    5000<sup style={{ fontSize: 20 }}>.00</sup>
                  </h3>
                  <p>Ganancias</p>
                </div>
                <div className="icon">
                  <i className="ion ion-cash" />
                </div>
                <button className="btn btn-success btn-block">
                  Más info <i className="fas fa-arrow-circle-right" />
                </button>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>1</h3>
                  <p>Consultas hoy</p>
                </div>
                <div className="icon">
                  <i className="ion ion-ios-calendar-outline" />
                </div>
                <button className="btn btn-warning btn-block">
                  Más info <i className="fas fa-arrow-circle-right" />
                </button>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>2</h3>
                  <p>Mi equipo</p>
                </div>
                <div className="icon">
                  {/* <i className="ion ion-pie-graph" /> */}
                </div>
                <button className="btn btn-danger btn-block">
                  Más info <i className="fas fa-arrow-circle-right" />
                </button>
              </div>
            </div>
            {/* ./col */}
          </div>

          <div className="row">
            <div className="col-lg-7 connectedSortable">
              <Tareas />
            </div>

            {/* Puede ser un componente de citas próximas o de hoy */}
            <div className="col-lg-5">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Citas proximas</h3>
                </div>
                <div className="card-body">
                  <div className="callout callout-info">
                    <h5>Cita próxima</h5>
                    <p>A las 8 pm - Luis Rivera</p>
                  </div>
                  <div className="callout callout-success">
                    <h5>Cita aceptada</h5>
                    <p>9 am - Jose</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default Inicio;
