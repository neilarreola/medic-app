import React,{useState} from "react";
import {useSelector} from 'react-redux'
import {db} from '../../../firebase/firebase'

const Formulario = () => {

  
  const user = useSelector(store => store.user.user)
  const [texto, setTexto] = useState('');

  const agregarMensaje = async () => {
    try {
      const timeElapsed = Date.now();
      const today= new Date(timeElapsed);
      await db.collection('chat').add({
        fecha: today.toISOString(),
        texto: texto,
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleOnChange = (e) => {
    setTexto(e.target.value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if(texto.trim()===''){
      return;
    }

    agregarMensaje()
    setTexto('')
  }

  return (
    <form
      onSubmit={handleOnSubmit}
    >
      <div className="input-group">
        <input
          type="text"
          placeholder="Escribe un mensaje ..."
          className="form-control"
          value={texto}
          onChange={handleOnChange}
        />
        <span className="input-group-append">
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </span>
      </div>
    </form>
  );
};

export default Formulario;
