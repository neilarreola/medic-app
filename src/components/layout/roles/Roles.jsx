import React,{useEffect} from 'react'
import { Link } from "react-router-dom";
import UserTeam from './UserTeam';

import { useDispatch, useSelector} from 'react-redux'
import {fetchTeam } from '../../../redux/teamDucks'

const Roles = () => {

  //useEffect para los eventos
  useEffect(() => {
    dispatch(fetchTeam())
  }, [])

  //REDUX
  const dispatch = useDispatch()
  const team = useSelector(store => store.team.team)
  const user = useSelector(store => store.user.user)

  const mostrarContactos = [{
    nombre: "Dylan"
  },
  {
    nombre: "Luis"
  },
  {
    nombre: "Jose"
  }]

  return (  
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Mi equipo</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={'/dashboard'}>Home</Link>
                </li>
                <li className="breadcrumb-item active">Mi equipo</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <div className="content">
        <div className="card card-solid">
          <div className="card-body pb-0">
            <div className="row d-flex align-items-strech">

              {/* Irá dentro de un map */}
              { team.map(usuario => {
                return (
                  <UserTeam 
                    key={usuario.id}
                    usuario={usuario}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Roles;