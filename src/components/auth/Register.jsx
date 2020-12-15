import React, {useState, useEffect} from "react";
import { Link, withRouter } from "react-router-dom";
import './Register.css';
import { useDispatch, useSelector} from 'react-redux'
import { registroUsuarioEmail } from '../../redux/userDucks'
import { sweetAlert } from "../alerts/SweetAlert";

const Register = ({history}) => {


  //REDUX
  const dispatch = useDispatch()
  const activo = useSelector(store => store.user.activo)

  //States locales de login
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: ""
  });

  const { nombre, email, password, confirmar } = usuario;

  const [error, setError] = useState(false);
  const [tipoError, setTipoError] = useState('');


  //Funciones
  useEffect(() => {
    console.log('Usuario ' + activo)
    if(activo){
      history.push('/dashboard')
    }
  }, [activo,history])


  //Funciones
  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //Validar no campos vacíos
    if(nombre.trim()==='' || email.trim()==='' || password.trim()==='' || confirmar.trim()==='' ){
      setError(true);
      sweetAlert('warning','Campos vacíos');
      return;
    }
    //Minimo 6 caracteres
    if(password.length < 6 || confirmar.length < 6){
      setError(true);
      sweetAlert('warning','Contraseña mínima de 6 carácteres');
      return;
    }
    //Los dos password sean iguales
    if(password !== confirmar){
      setError(true);
      sweetAlert('warning','Las contraseñas no son iguales');
      return;
    }

    
    //Pasar datos
    dispatch(registroUsuarioEmail(nombre,email,password))
  };


  // const registrar = useCallback(
  //   async() => {
  //     try {
  //       //Nos conectamos a firebase para la autenticacion
  //       const res = await auth.createUserWithEmailAndPassword(email,password);
  //       console.log(res.user);

  //       await db.collection('users').doc(res.user.email).set({
  //         uid: res.user.uid,
  //         email: res.user.email,
  //         nombre: nombre
  //       })

  //       //Pasando validación
  //       setError(false);
  //       setTipoError('');

  //       setUsuario({
  //         nombre: "",
  //         email: "",
  //         password: "",
  //         confirmar: ""
  //       })
  //       history.push('/dashboard');

  //       //Creamos la coleccion

  //     } catch (e) {
  //       if(e.code === 'auth/invalid-email'){
  //         setError(true);
  //         setTipoError('Email inválido');
  //       }
  //       if(e.code === 'auth/email-already-in-use'){
  //         setError(true);
  //         setTipoError('Usuario ya registrado');
  //       }
  //       console.log(e);
  //     }
  //   },
  //   [email,password,history,nombre],
  // )
  return (
    <div className="hold-transition register-page">
      <div className="register-box">
        <div className="register-logo">
          <a href="/#">
            <b>Registro </b>usuario
          </a>
          
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <form
              onSubmit={onSubmit}
            >
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre completo"
                  name="nombre"
                  value={nombre}
                  onChange={onChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
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
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirma tu password"
                  name="confirmar"
                  value={confirmar}
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
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="terms"
                      defaultValue="agree"
                    />
                    <label htmlFor="agreeTerms">
                      Acepto los <a href="/#">términos y condiciones</a>
                    </label>
                  </div>
                </div> */}
                {/* /.col */}
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Registrar
                  </button>
                </div>
                {/* /.col */}
              </div>
            </form>
            <hr/>
            
            <Link to={'/'} className="text-center">Volver a iniciar sesión</Link>
          </div>
          {/* /.form-box */}
        </div>
        {/* /.card */}
      </div>
      {/* /.register-box */}
    </div>
  );
};

export default withRouter(Register);
