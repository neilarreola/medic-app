import React from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { cerrarSesionUsuario } from "../../redux/userDucks";
const Header = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  const cerrarSesion = () => {
    dispatch(cerrarSesionUsuario());
    history.push("/");
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-dark navbar-indigo">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            href="/#"
            role="button"
          >
            <i className="fas fa-bars" />
          </a>
        </li>

        <li className="nav-item d-none d-sm-inline-block">
          <a href="/#" className="nav-link">
            ¡Bienvenido {user.displayName}
          </a>
        </li>
      </ul>

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Notifications Dropdown Menu */}
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="/#">
            <i className="far fa-bell" />
            <span className="badge badge-warning navbar-badge">15</span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">
              15 Notificaciones
            </span>
            <div className="dropdown-divider" />
            <a href="/#" className="dropdown-item">
              <i className="fas fa-envelope mr-2" /> 4 mensajes nuevos
              <span className="float-right text-muted text-sm">3 mins</span>
            </a>
            <div className="dropdown-divider" />
            <a href="/#" className="dropdown-item">
              <i className="fas fa-users mr-2" /> 8 solicitudes
              <span className="float-right text-muted text-sm">12 horas</span>
            </a>
            <div className="dropdown-divider" />
            <a href="/#" className="dropdown-item">
              <i className="fas fa-file mr-2" /> 3 reportes nuevos
              <span className="float-right text-muted text-sm">2 días</span>
            </a>
            <div className="dropdown-divider" />
            <a href="/#" className="dropdown-item dropdown-footer">
              Ver todas las notificaciones
            </a>
          </div>
        </li>

        <li className="nav-item dropdown user-menu">
          <a
            href="/#"
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
          >
            <i className="far fa-user-circle"></i>
          </a>
          <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            {/* User image */}
            <li className="user-header bg-primary">
              <img
                src={user.photoURL}
                className="img-circle elevation-2"
                alt="user"
              />
              <p>{user.displayName}</p>
            </li>
            {/* Menu Body */}
            <li className="user-body text-center">
              <strong>
                <i className="fas fa-history pr-2" />Ultima conexión
              </strong>
              <p className="text-muted">{user.lastSignInTime}</p>
            </li>
            {/* Menu Footer*/}
            <li className="user-footer">
              <Link
                to="/dashboard/profile"
                className="btn btn-default btn-flat"
              >
                Perfil
              </Link>
              <a
                href="/#"
                className="btn btn-default btn-flat float-right"
                onClick={() => cerrarSesion()}
              >
                Sign out
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(Header);
