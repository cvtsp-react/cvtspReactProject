import {createStore, combineReducers} from 'redux'
import login from './login'
import monitorApp from './monitorPlateform'
import manageApp from './managePlateform'

const reducers = combineReducers(Object.assign({ login }, monitorApp, manageApp));

export default createStore(reducers);
