import React,{useEffect,useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import ForgotPassword from './components/auth/ForgotPassword';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import {auth} from './firebase/firebase';
import Spinner from './components/Spinner';

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false);

  //Puede ir en el UsuarioPROVIDER
  useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(user =>{
        console.log(user);
        if(user){
          setFirebaseUser(user)
        }else{
          setFirebaseUser(null)
        }
      })
    }
    fetchUser()
  }, [])


  const RutaPrivada = ({component,path,...rest}) =>{
    if(localStorage.getItem('usuario')){
      const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
      if(usuarioStorage.uid === firebaseUser.uid){
        return <Route component={component} path={path} {...rest}/>
      }else{
        return <Redirect to="/" {...rest}/>
      }
    }else{
      return <Redirect to="/" {...rest}/>
    }
  }
  return firebaseUser !== false ? (
      <Router>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/forgot-password' component={ForgotPassword}/>
          <RutaPrivada exact path='/dashboard' component={Dashboard}/>
        </Switch>
      </Router>
  ) : (
    <Spinner/>
  )
}

export default App;
