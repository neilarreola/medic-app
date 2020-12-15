import { db } from "../firebase/firebase"

//CONSTANTES
const dataInicial = {
  loading: false,
  chat: []
}
//TYPES
const CHAT_EXITO = 'CHAT_EXITO'
const LOADING_CHAT = 'LOADING_CHAT'

//REDUCER
export default function chatReducer(state = dataInicial, action){
  switch(action.type){
    case LOADING_CHAT:
      return {...state, loading: true}
    case CHAT_EXITO:
      return {...state, loading: false,chat: action.payload}
    default:
      return state
  }
}

export const fetchChat = () => async(dispatch, getState) =>{
  const {user} = getState().user
  dispatch({
    type: LOADING_CHAT
  })
  try {
    db.collection('chat').orderBy('fecha')
      .onSnapshot(query => {
        const arrayMensajes = query.docs.map(item => item.data())
        //Dispatch
        dispatch({
          type: CHAT_EXITO,
          payload: arrayMensajes
        })
      })

  } catch (error) {
    console.log(error)
  }
}

export const agregarMensaje = (uid, texto) => async(dispatch,getState) => {
  const {user} = getState().user
  
  try {
    await db.collection('chat').add({
      fecha: Date.now(),
      texto: texto,
      uid: uid,
      email: user.email,
      displayName: user.displayName
    })
  } catch (error) {
    console.log(error)
  }
}