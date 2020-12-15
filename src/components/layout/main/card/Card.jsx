import React from "react";

const Card = () => {
  return (
    <div className="col-lg-3 col-6">
      {/* small box */}
      <div className="small-box bg-info">
        <div className="inner">
          <h3>50</h3>
          <p>Pacientes</p>
        </div>
        <div className="icon">{/* <i className="ion ion-bag" /> */}</div>
        <a href="/#" className="small-box-footer">
          Más info <i className="fas fa-arrow-circle-right" />
        </a>
      </div>
    </div>
  );
};

export default Card;
