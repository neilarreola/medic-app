import React,{useEffect,useRef} from "react";
import { Link } from "react-router-dom";
import Formulario from "./Formulario";
import { useDispatch, useSelector} from 'react-redux'
import {fetchChat} from '../../../redux/chatDucks'
import {db} from '../../../firebase/firebase'

const Chat = () => {
  //State global de pacientes
  //REDUX
  const dispatch = useDispatch()
  const chat = useSelector(store => store.chat.chat)
  const user = useSelector(store => store.user.user)

  const refZonaChat = useRef(null)

  //useEffect para los eventos
  useEffect(() => {
    dispatch(fetchChat())
    // refZonaChat.current.scrollTop = refZonaChat.current.scrollHeight
  }, [])


  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Chat</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={"/dashboard"}>Home</Link>
                </li>
                <li className="breadcrumb-item active">Chat</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <div className="content">
        <div className="container-fluid">
          <div className="card direct-chat direct-chat-primary"
          >
            <div className="card-header">
              <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="#">
                  <img
                    src="/dist/img/userdefault.png"
                    width={30}
                    height={30}
                    className="d-inline-block align-top mr-3"
                  />
                  Usuario
                </a>
              </nav>
            </div>
            <div className="card-body">
              <div className="direct-chat-messages"
                ref={refZonaChat}
              >

                {
                  chat.map((item,index)=>(
                    user.uid === item.uid ? (

                    <div className="direct-chat-msg right" key={index}>
                      <div className="direct-chat-infos clearfix">
                        <span className="direct-chat-name float-right">
                          {item.displayName}
                        </span>
                        <span className="direct-chat-timestamp float-left">
                          {item.fecha}
                        </span>
                      </div>
                      <img
                        className="direct-chat-img"
                        src={item.photoURL}
                        alt="message user image"
                      />
                      <div className="direct-chat-text">{item.texto}</div>
                    </div>
                    ) : (
                    <div className="direct-chat-msg" key={index}>
                      <div className="direct-chat-infos clearfix">
                        <span className="direct-chat-name float-left">
                        {item.displayName}
                        </span>
                        <span className="direct-chat-timestamp float-right">
                        {item.fecha}
                        </span>
                      </div>
                      <img
                        className="direct-chat-img"
                        src={item.photoURL}
                        alt="message user image"
                      />
                      <div className="direct-chat-text">
                      {item.texto}
                      </div>
                    </div>
                        
                    )
                  ))
                }


                {/* Izquierda */}
              </div>
            </div>

            <div className="card-footer">
              <Formulario />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
