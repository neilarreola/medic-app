import React, { useState, useCallback, useEffect} from "react";
import { Link, withRouter } from "react-router-dom";
import {auth} from '../../firebase/firebase'
import './Login.css';
import {sweetAlert} from '../alerts/SweetAlert'
//REDUX
import {useDispatch, useSelector} from 'react-redux'
import { ingresoUsuario,ingresoUsuarioEmail} from '../../redux/userDucks'


const Login = ({history}) => {

  //useDispatch de REDUX
  const dispatch = useDispatch()
  const loading = useSelector(store => store.user.loading)
  const activo = useSelector(store => store.user.activo)
  
  //-----------------------------------------------------------
  //States locales de login
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });
  
  const { email, password } = usuario;
  const [error, setError] = useState(false);

  //---------------------------------------------------------------
  //Funciones
  useEffect(() => {
    console.log('Usuario ' + activo)
    if(activo){
      history.push('/dashboard')
    }
  }, [activo,history])


  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //Validar
    if(email.trim()==='' || password.trim()===''){
      setError(true);
      sweetAlert('warning','Campos vacíos')
      return;
    }
    if(password.length < 6){
      setError(true);
      sweetAlert('warning','Contraseña mínima de 6 caracteres')
      return;
    }
    setError(false);
    setUsuario({
      email: "",
      password: ""
    })

    //Dispatch de Login
    dispatch(ingresoUsuarioEmail(email,password))
  };



  const login = useCallback(async() => {
    try {
      const res = await auth.signInWithEmailAndPassword(email,password)
      console.log(res.user)
      history.push('/dashboard')
      sweetAlert('success','Inicio de sesión exitoso')
    } catch (e) {
      if(e.code === 'auth/invalid-email'){
        setError(true);
        sweetAlert('error','Email inválido')
      }
      if(e.code === 'auth/user-not-found'){
        setError(true);
        sweetAlert('error','Email no registrado')
      }
      if(e.code === 'auth/wrong-password'){
        setError(true);
        sweetAlert('error','Contraseña incorrecta')
      }
      console.log(e);
    }
  },[email,password,history],)

  return (
  <div className="hold-transition login-page"> 
    <div className="login-box">
      <div className="login-logo">
        <a href="/#">
          <b>Inicio </b>sesión
        </a>
      </div>
      {/* /.login-logo */}
      <div className="card">
        <div className="card-body login-card-body">
          <form 
            onSubmit={onSubmit}
          >
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                autoComplete="username"
                name="email"
                value={email}
                onChange={onChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                autoComplete="current-password"
                name="password"
                value={password}
                onChange={onChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="row">
              {/* <div className="col-8">
                <div className="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Recordar usuario</label>
                </div>
              </div> */}
              {/* /.col */}
              <div className="col-12">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-block"
                  
                >
                  Iniciar
                </button>
              </div>
              {/* /.col */}
            </div>
          </form>
          <hr/>
          <div className="social-auth-links text-center mb-4 mt-4">
            
            <button 
              className="btn btn-block btn-danger"
              disabled={loading}
              onClick={()=>dispatch(ingresoUsuario())}
            >
              <i className="fab fa-google-plus mr-2" /> Google+
            </button>
          </div>
          {/* /.social-auth-links */}
          <p className="mb-1">
            <Link to={'/forgot-password'} className="text-center">Olvidé mi contraseña</Link>
          </p>
          <p className="mb-0">
            <Link to={'/register'} className="text-center">Crear una nueva cuenta</Link>
          </p>
        </div>
        {/* /.login-card-body */}
      </div>
    </div>
  </div> 
  );
};

export default withRouter(Login);
