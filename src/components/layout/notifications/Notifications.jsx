import React from 'react';
import { Link } from "react-router-dom";

const Reports = () => {
  return (  
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Notificaciones</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={'/dashboard'}>Home</Link>
                </li>
                <li className="breadcrumb-item active">Notificaciones</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <div className="content">
        <div className="container-fluid">
          <h1>Desde Notificaciones</h1>
        </div>
      </div>
    </div>
  );
}
 
export default Reports;