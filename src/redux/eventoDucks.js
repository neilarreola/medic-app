import { db } from "../firebase/firebase"

//CONSTANTES
const dataInicial = {
  loading: false,
  eventos: []
}
//TYPES
const EVENTO_EXITO = 'EVENTO_EXITO'
const LOADING_EVENTO = 'LOADING_EVENTO'

//REDUCER
export default function eventoReducer(state = dataInicial, action){
  switch(action.type){
    case LOADING_EVENTO:
      return {...state, loading: true}
    case EVENTO_EXITO:
      return {...state, loading: false,eventos: action.payload}
    default:
      return state
  }
}

export const fetchEventos = () => async(dispatch, getState) =>{
  const {user} = getState().user
  dispatch({
    type: LOADING_EVENTO
  })
  try {
    const res= await db.collection('usuarios').doc(user.email).collection('eventos').get()
    const arrayEventos = res.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
    })
    //Dispatch
    dispatch({
      type: EVENTO_EXITO,
      payload: arrayEventos
    })
  } catch (error) {
    console.log(error)
  }
}