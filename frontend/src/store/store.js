import { createStore, combineReducers, applyMiddleware, compose } from 'redux';  // configureStore will be used to create store. combineReducers will be used for combining all reducers, applyMiddlware will be used with redux-thunk to apply thunk middlewares if needs.
import thunk from 'redux-thunk';  // if after getting dispatch from action if  it returns function thunk will apply ascynchronously some logic as middleware then give it to reducer.
import { composeWithDevTools } from "redux-devtools-extension";

import {
        userLoginReducer,
        userRegisterReducer,
        userUpdateProfileReducer
} from './reducers/authReducers';  // imporeting auth user reducers
import {
        studentCreateReducer,
        studentEditReducer,
        studentDeleteReducer,
        studentListReducer,
        studentGetByIdReducer,
        studentBySearchReducer
} from './reducers/studentReducers'; // importing student reducers

const reducer = combineReducers({
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userUpdateProfile: userUpdateProfileReducer,
        studentCreate: studentCreateReducer,
        studentEdit: studentEditReducer,
        studentDelete: studentDeleteReducer,
        studentList: studentListReducer,
        studentGetById: studentGetByIdReducer,
        studentBySearch: studentBySearchReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : "";

const initialState = {
        userLogin: { userInfo: userInfoFromStorage }
};
const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));//this is also 

export default store;
