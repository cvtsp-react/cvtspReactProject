import {createStore, combineReducers} from 'redux'
import monitorApp from './monitor'
import manageApp from './manage'

const reducers = combineReducers(Object.assign(monitorApp, manageApp));

export default createStore(reducers);
