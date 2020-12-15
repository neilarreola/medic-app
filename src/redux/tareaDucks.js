import { db } from "../firebase/firebase"

//CONSTANTES
const dataInicial = {
  loading: false,
  pacientes: []
}
//TYPES
const PACIENTE_EXITO = 'PACIENTE_EXITO'
const LOADING_PACIENTE = 'LOADING_PACIENTE'

//REDUCER
export default function pacienteReducer(state = dataInicial, action){
  switch(action.type){
    case LOADING_PACIENTE:
      return {...state, loading: true}
    case PACIENTE_EXITO:
      return {...state, loading: false,pacientes: action.payload}
    default:
      return state
  }
}

export const fetchPacientes = () => async(dispatch, getState) =>{
  const {user} = getState().user
  dispatch({
    type: LOADING_PACIENTE
  })
  try {
    const res= await db.collection('usuarios').doc(user.email).collection('pacientes').get()
    const arrayPacientes = res.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
    })
    console.log(arrayPacientes)
    //Dispatch
    dispatch({
      type: PACIENTE_EXITO,
      payload: arrayPacientes
    })
  } catch (error) {
    console.log(error)
  }
}