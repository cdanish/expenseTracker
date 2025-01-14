import {configureStore} from "@reduxjs/toolkit";
import authReducer from './features/authSlice';
import transReducer from "./features/transSlice";

const store = configureStore({
    reducer:{
        auth:authReducer,
        trans:transReducer
    }
});

export default store;