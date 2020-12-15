import React,{useState, useCallback} from 'react';
import { Link, withRouter } from "react-router-dom";
import {auth} from '../../firebase/firebase'
import Alert from "../alerts/Alert";
import {sweetAlert} from '../alerts/SweetAlert'

const ForgotPassword = ({history}) => {

  const [email, setEmail] = useState('');

  const [error, setError] = useState(false);
  const [tipoError, setTipoError] = useState('');
  
  const onChange = (e) =>{
    setEmail(
      e.target.value
      )
    }
  
  const onSubmit = (e) =>{
    e.preventDefault();

    //Validar
    if(email.trim()===''){
      setError(true);
      setTipoError('Campos vacíos');
      return;
    }
    //Realizar login
    recuperarContraseña();

    //Pasando validación
    setError(false);
    setTipoError('');

    setEmail('');       
  }

  const recuperarContraseña = useCallback(
    async () => {
      try {
        await auth.sendPasswordResetEmail(email)
        history.push('/')
        sweetAlert('success','Correo enviado')
      } catch (e) {
        console.log(e);
        setError(true);
        setTipoError(e.message)
      }
    },[email,history],)
  return (  
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="/#"><b>Medic</b>App</a>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
          {
            error ? <Alert texto={tipoError}/> : null
          }
            <p className="login-box-msg">Olvidaste tu contraseña? Recuperala ingresando tu email.</p>
            <form
              onSubmit={onSubmit}
            >
              <div className="input-group mb-3">
                <input type="email" 
                  className="form-control" 
                  placeholder="Email" 
                  value={email}
                  onChange={onChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-block"
                  >Solicitar nueva contraseña</button>
                </div>
                {/* /.col */}
              </div>
            </form>
            <p className="mt-3 mb-1">
              <Link to={'/'} className="text-center">Regresar</Link>
            </p>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
    </div>

  );
}
 
export default withRouter(ForgotPassword);