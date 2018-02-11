import {createStore, combineReducers, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import login from './login'
import monitorApp from './monitorPlateform'
import manageApp from './managePlateform'

const reducers = combineReducers(Object.assign({ login }, monitorApp, manageApp));

export default createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(reduxThunk)
);
