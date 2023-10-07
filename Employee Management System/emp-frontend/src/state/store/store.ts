import reducers from "../reducers/reducers";
import { applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";

export const store = configureStore( {
    reducer : reducers
});