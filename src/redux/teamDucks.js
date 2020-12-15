import { db } from "../firebase/firebase"

//CONSTANTES
const dataInicial = {
  loading: false,
  team: []
}
//TYPES
const TEAM_EXITO = 'TEAM_EXITO'
const LOADING_TEAM = 'LOADING_TEAM'

//REDUCER
export default function teamReducer(state = dataInicial, action){
  switch(action.type){
    case LOADING_TEAM:
      return {...state, loading: true}
    case TEAM_EXITO:
      return {...state, loading: false,team: action.payload}
    default:
      return state
  }
}

export const fetchTeam = () => async(dispatch, getState) =>{
  const {user} = getState().user
  dispatch({
    type: LOADING_TEAM
  })
  try {
    const res= await db.collection('usuarios').get()
    const array= res.docs.filter(doc => doc.id !== user.email)

    const arrayTeam = array.map(doc => {
      return {
        ...doc.data(),
        id: doc.id
      }
    })

    //Dispatch
    dispatch({
      type: TEAM_EXITO,
      payload: arrayTeam
    })
  } catch (error) {
    console.log(error)
  }
}