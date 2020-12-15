import React from "react";
import { Link, NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <aside className="main-sidebar sidebar-light-teal elevation-4">
      {/* Brand Logo */}
      <Link to={"/dashboard"} className="brand-link">
        <img
          src="dist/img/Logo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">Medic App</span>
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            <li className="nav-item">
              <NavLink to='/dashboard' exact className='nav-link'>
                <i className="nav-icon fas fa-clinic-medical"/>
                <p>Inicio</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/dashboard/patients' className='nav-link'>
                <i className="nav-icon fas fa-users"/>
                <p>Mis pacientes</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/dashboard/recipe' className='nav-link'>
                <i className="nav-icon far fa-file-alt"/>
                <p>Receta</p>
              </NavLink>
            </li>

            <li className="nav-header">Herramientas</li>
            <li className="nav-item">
              <NavLink to='/dashboard/calendar' className='nav-link'>
                <i className="nav-icon far fa-calendar-alt"/>
                <p>Calendario</p>
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink to='/dashboard/reports' className='nav-link'>
                <i className="nav-icon fas fa-chart-pie"/>
                <p>Reportes</p>
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink to='/dashboard/roles' className='nav-link'>
                <i className="nav-icon fas fa-hospital-user"/>
                <p>Mi equipo</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/dashboard/chat' className='nav-link'>
                <i className="nav-icon far fa-comments"/>
                <p>Mensajería</p>
              </NavLink>
            </li>

            <li className="nav-header">Perfil</li>
            <li className="nav-item">
              <NavLink to='/dashboard/profile' className='nav-link' >
                <i className="nav-icon far fa-user"/>
                <p>Perfil</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/dashboard/notifications' className='nav-link' >
                <i className="nav-icon far fa-bell"/>
                <p>Notificaciones</p>
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default Menu;
