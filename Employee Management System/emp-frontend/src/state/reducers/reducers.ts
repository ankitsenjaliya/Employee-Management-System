import {combineReducers} from 'redux';
import amountReducer from './amountReducer';
import employeeReducer from "./employeeReducer";

const reducers = combineReducers({
    amount : amountReducer,
    employee : employeeReducer
})

export default reducers;