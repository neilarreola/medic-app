import React,{useEffect, useState} from 'react'
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import Header from './Header';
import Menu from './Menu';
import Calendar from "../layout/calendar/Calendar";
import Inicio from "../layout/main/Inicio";
import Pacientes from "../layout/pacientes/Pacientes";
import Profile from '../layout/profile/Profile';
import Reports from '../layout/reports/Reports';
import Receta from '../layout/receta/Receta';
import Roles from '../layout/roles/Roles';
import Footer from './Footer';
import Chat from '../layout/chat/Chat';
import Notifications from '../layout/notifications/Notifications';
import {auth} from '../../firebase/firebase';

const Dashboard = ({history}) => {

  // //Crear statede usuario
  // const [user, setUser] = useState(null)
  
  // useEffect(() => {
  //   if(auth.currentUser){
  //     console.log('Existe un usuario')
  //     //Se debe guardar en state
  //     setUser(auth.currentUser);
  //   }else{
  //     console.log('No existe un usuario')
  //     history.push('/')
  //   }
  // }, [history])

  return (  
    <Router>
      <div className="wrapper">
        <Header />
        <Menu />
        <Switch>
                <Route exact path="/dashboard" component={Inicio} />
                <Route exact path="/dashboard/calendar" component={Calendar} />
                <Route exact path="/dashboard/patients" component={Pacientes} />
                <Route exact path="/dashboard/recipe" component={Receta} />
                <Route exact path="/dashboard/profile" component={Profile} />
                <Route exact path="/dashboard/reports" component={Reports} />
                <Route exact path="/dashboard/roles" component={Roles} />
                <Route exact path="/dashboard/chat" component={Chat} />
                <Route exact path="/dashboard/notifications" component={Notifications} />
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}
 
export default withRouter(Dashboard);