import React from "react";
import Calendar from "../layout/calendar/Calendar";
import Inicio from "../layout/main/Inicio";
import Pacientes from "../layout/pacientes/Pacientes";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Content = () => {
  return (
    <>
            <Router>
      <div className="content-wrapper">
        <div className="content">
          <div className="container-fluid">
              <Switch>
                <Route exact path="/dashboard" component={Inicio} />
                <Route exact path="/dashboard/calendar" component={Calendar} />
                <Route exact path="/dashboard/pacientes" component={Pacientes} />
              </Switch>
          </div>
        </div>
      </div>
            </Router>
    </>
  );
};

export default Content;
