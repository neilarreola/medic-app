import {auth, app, db, storage} from '../firebase/firebase'
import {sweetAlert} from '../components/alerts/SweetAlert'
//constantes
const dataInicial = {
  loading: false,
  activo: false
}


//TYPES
const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'
const CERRAR_SESION = 'CERRAR_SESION'


//REDUCER
export default function userReducer(state = dataInicial, action){
  switch(action.type){
    case LOADING:
      return {...state, loading: true}
    case USUARIO_ERROR:
      return {...dataInicial}
    case USUARIO_EXITO:
      return {...state, loading: false, user: action.payload, activo: true}
    case CERRAR_SESION:
      return {...dataInicial, user: action.payload}
    default:
      return state
  }
}


//ACCIONES
export const ingresoUsuario = () => async (dispatch, getState) => {
  dispatch({
    type: LOADING
  })
  try {
    const provider = new app.auth.GoogleAuthProvider();
    const res = await auth.signInWithPopup(provider)
    console.log(res.user);
    const usuario = {
      uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        emailVerified: res.user.emailVerified,
        creationTime: res.user.metadata.creationTime,
        lastSignInTime: res.user.metadata.lastSignInTime
    }

    const usuarioDB = await db.collection('usuarios').doc(usuario.email).get()
    if(usuarioDB.exists){
      //Cuando existe el usuario en Firestore
      dispatch({
        type: USUARIO_EXITO,
        payload: usuarioDB.data()
      })
      localStorage.setItem('usuario',JSON.stringify(usuarioDB.data()))
    }else{
      //Si no existe el usuario en Firestore
      await db.collection('usuarios').doc(usuario.email).set(usuario)
      
      dispatch({
        type: USUARIO_EXITO,
        payload: usuario
      })
      localStorage.setItem('usuario',JSON.stringify(usuario))
    } 
    sweetAlert('success','Inicio de sesión exitoso')
  } catch (error) {
    console.log(error)
    dispatch({
      type: USUARIO_ERROR
    })
  }
}

export const obtenerUsuarioActivo =() => (dispatch, getState) =>{
  if(localStorage.getItem('usuario')){
    dispatch({
      type:USUARIO_EXITO,
      payload: JSON.parse(localStorage.getItem('usuario'))
    })
  }
}

export const cerrarSesionUsuario = () => (dispatch, getState) =>{
  auth.signOut()
  localStorage.removeItem('usuario')
  sweetAlert('success','Sesión cerrada')
  dispatch({
    type: CERRAR_SESION,
    payload: {
        uid: '',
        email: '',
        displayName: '',
        photoURL: '',
        emailVerified: '',
        creationTime: '',
        lastSignInTime: ''
    }
  })
}

export const actualizarUsuarioAccion = (nombreActualizado, especialidadActualizado, telefonoActualizado, direccionActualizado) => async (dispatch, getState) => {

  dispatch({
    type: LOADING
  })
  const {user} = getState().user
  console.log(user)

  try {
    await db.collection('usuarios').doc(user.email).update({
      displayName: nombreActualizado,
      especialidad: especialidadActualizado,
      telefono: telefonoActualizado,
      direccion: direccionActualizado
    })

    const usuario = {
      ...user,
      displayName: nombreActualizado,
      especialidad: especialidadActualizado,
      telefono: telefonoActualizado,
      direccion: direccionActualizado
    }

    dispatch({
      type: USUARIO_EXITO,
      payload: usuario
    })
    sweetAlert('success','Perfil actualizado')
    localStorage.setItem('usuario',JSON.stringify(usuario))
    
  } catch (error) {
    console.log(error)
  }
}

export const actualizarFotoAccion = (imagenEditada) => async (dispatch, getState) =>{
  dispatch({
    type: LOADING
  })
  const {user} = getState().user

  try {
    const imagenRef = await storage.ref().child(user.email).child('foto perfil')
    await imagenRef.put(imagenEditada)
    const imagenURL = await imagenRef.getDownloadURL()

    await db.collection('usuarios').doc(user.email).update({
      photoURL: imagenURL
    })

    const usuario = {
      ...user,
      photoURL: imagenURL
    }
    dispatch({
      type: USUARIO_EXITO,
      payload: usuario
    })
    sweetAlert('success','Imagen actualizada')
    localStorage.setItem('usuario',JSON.stringify(usuario))
  } catch (error) {
    console.log(error)
  }
}

export const ingresoUsuarioEmail=(email,password)=> async(dispatch, getState) => {
  dispatch({
    type: LOADING
  })
  try {
    const res = await auth.signInWithEmailAndPassword(email,password)
    console.log(res.user);
    const usuario = {
        uid: res.user.uid,
        email: res.user.email
    }

    const usuarioDB = await db.collection('usuarios').doc(usuario.email).get()

    dispatch({
      type: USUARIO_EXITO,
      payload: usuarioDB.data()
    })
    localStorage.setItem('usuario',JSON.stringify(usuarioDB.data()))
    
    sweetAlert('success','Inicio de sesión exitoso')
  } catch (error) {
    console.log(error)
    if(error.code === 'auth/invalid-email'){
      sweetAlert('error','Email inválido')
    }
    if(error.code === 'auth/user-not-found'){
      sweetAlert('error','Email no registrado')
    }
    if(error.code === 'auth/wrong-password'){
      sweetAlert('error','Contraseña incorrecta')
    }
    dispatch({
      type: USUARIO_ERROR
    })
  }
}

export const registroUsuarioEmail=(nombre,email,password)=> async(dispatch, getState) => {
  dispatch({
    type: LOADING
  })
  try {
    const res = await auth.createUserWithEmailAndPassword(email,password)
    console.log(res.user);

    const usuario = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: nombre,
        photoURL: 'https://static-media-prod-cdn.itsre-sumo.mozilla.net/static/sumo/img/default-FFA-avatar.png',
        emailVerified: res.user.emailVerified,
        creationTime: res.user.metadata.creationTime,
        lastSignInTime: res.user.metadata.lastSignInTime
    }

    await db.collection('usuarios').doc(usuario.email).set(usuario)

    dispatch({
      type: USUARIO_EXITO,
      payload: usuario
    })
    localStorage.setItem('usuario',JSON.stringify(usuario))
   
    sweetAlert('success','Inicio de sesión exitoso')
  } catch (error) {
    console.log(error)
    if(error.code === 'auth/invalid-email'){
      sweetAlert('error','Email inválido')
    }
    if(error.code === 'auth/email-already-in-use'){
      sweetAlert('error','Usuario ya registrado')
    }
    dispatch({
      type: USUARIO_ERROR
    })
  }
}
