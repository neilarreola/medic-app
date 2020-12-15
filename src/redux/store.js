import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

//Importamos todos los reducers
import userReducer,{obtenerUsuarioActivo} from './userDucks'
import eventoReducer from './eventoDucks'
import pacienteReducer from './pacienteDucks'
import teamReducer from './teamDucks'
import chatReducer from './chatDucks'
const rootReducer = combineReducers({
    user: userReducer,
    eventos: eventoReducer,
    pacientes: pacienteReducer,
    team: teamReducer,
    chat: chatReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    obtenerUsuarioActivo()(store.dispatch)
    return store
}