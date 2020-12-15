import React from 'react'

const RecetaImprimir = () => {
  return (
    <div className="content">
        <div className="container-fluid">
          <div className="invoice p-3 mb-3">
            {/* title row */}
            <div className="row">
              <div className="col-12">
                <h4>
                  <i className="fas fa-hospital" /> Consultorio Médico
                  <p className="float-right"></p>
                </h4>
              </div>
              {/* /.col */}
            </div>
            <div className="card-header">
              <h3 className="card-title">Dr. Dylan</h3>
              <br />
              <p>Lorem ipsum dolor sit amet consectetur.</p>
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
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Edad
                      </label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Peso
                      </label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="" className="col-sm-2 col-form-label">
                        Talla
                      </label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control"/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default RecetaImprimir
