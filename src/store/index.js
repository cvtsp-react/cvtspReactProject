import {createStore, combineReducers, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import login from './login'
import monitorApp from './monitorPlateform'
import manageApp from './managePlateform'
import chat_store from './chat_store'

const reducers = combineReducers(Object.assign({ login, chat_store }, monitorApp, manageApp));

export default createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(reduxThunk)
);
