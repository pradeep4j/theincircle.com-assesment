import { login, logout, addUser, updateUsersProfileById } from "../../routes/userRoutes";
import { setUser, removeUser } from '../../utils/localStorage';
import { toast } from 'react-toastify';
import {
        USER_LOGIN_FAIL,
        USER_LOGIN_REQUEST,
        USER_LOGIN_SUCCESS,
        USER_LOGOUT,
        USER_REGISTER_FAIL,
        USER_REGISTER_REQUEST,
        USER_REGISTER_SUCCESS,
        USER_UPDATE_FAIL,
        USER_UPDATE_REQUEST,
        USER_UPDATE_SUCCESS,
} from "../actionTypes/authConstants";

export const loginUser = (postbody) => async (dispatch) => {
        //login dispatch
        dispatch({ type: USER_LOGIN_REQUEST });

        await login(postbody).then(response => {
                dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
                if (response.status === 201 && (response.data !== 400 && response.data !== 404)) {
                        setUser(response.data);
                        toast.success('User Logged in Successfully!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                        /*swal({
                                title: "Successful!",
                                text: 'User Addes Successfully !',
                                icon: "success",
                                button: "OK!",
                        });*/
                }
                else if (response.data === 404) {
                        dispatch({
                                type: USER_LOGIN_FAIL,
                                payload:
                                        'User is not registered with us!'
                        });
                        toast.error('User is not registered with us!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                        document.getElementById("submitting").innerText = "Login";
                        document.getElementById("submitting").disabled = false;
                }
                else if (response.data === 400) {
                        dispatch({
                                type: USER_LOGIN_FAIL,
                                payload:
                                        'Entered Username/Password is wrong!'
                        });
                        toast.error('Entered Username/Password is wrong!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                        document.getElementById("submitting").innerText = "Login";
                        document.getElementById("submitting").disabled = false;
                }
                else {
                        dispatch({
                                type: USER_LOGIN_FAIL,
                                payload:
                                        response.data
                        });
                        toast.error(response.data, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                        document.getElementById("submitting").innerText = "Login";
                        document.getElementById("submitting").disabled = false;
                }
        }).catch(error => {
                dispatch({
                        type: USER_LOGIN_FAIL,
                        payload:
                                error.message
                });

                toast.error(error.message, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
                document.getElementById("submitting").innerText = "Login";
                document.getElementById("submitting").disabled = false;
        });

};
export const registerUser = (postBody) => async (dispatch) => {
        //  alert(JSON.stringify(postBody)); return;
        dispatch({ type: USER_REGISTER_REQUEST });
        await addUser(postBody).then(response => {
                dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
                if (response.status === 201 && response.data !== 409) {
                        toast.success('User Added Successfully!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                }
                else if (response.data === 409) {
                        dispatch({
                                type: USER_REGISTER_FAIL,
                                payload:
                                        "Email is already registered with us!"
                        });
                        toast.error('Email is already registered with us!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                        document.getElementById("submitting").innerText = "Add User";
                        document.getElementById("submitting").disabled = false;
                }
                else {
                        dispatch({
                                type: USER_REGISTER_FAIL,
                                payload:
                                        response.data
                        });
                        toast.error(response.data, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                }
                document.getElementById("submitting").innerText = "Add User";
                document.getElementById("submitting").disabled = false;
        }).catch((error) => {
                dispatch({
                        type: USER_REGISTER_FAIL,
                        payload:
                                error.message
                });
                toast.error(error.message, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
                document.getElementById("submitting").innerText = "Add User";
                document.getElementById("submitting").disabled = false;
        });
};
export const updateUser = (postBody, id) => async (dispatch) => {

        dispatch({ type: USER_UPDATE_REQUEST });

        await updateUsersProfileById(postBody, id).then(response => {

                dispatch({ type: USER_UPDATE_SUCCESS, payload: response.data });
                dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
                if (response.status === 201) {
                        /*swal({
                                title: "Successful!",
                                text: 'User Addes Successfully !',
                                icon: "success",
                                button: "OK!",
                        });*/
                        setUser(response.data);
                        toast.success('User Updated Successfully!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                }
                else {
                        toast.error(response.data, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                        document.getElementById("submitting").innerText = "Update User";
                        document.getElementById("submitting").disabled = false;
                }
        }).catch((error) => {
                dispatch({
                        type: USER_UPDATE_FAIL,
                        payload:
                                error.message
                });
                toast.error(error.message, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
                document.getElementById("submitting").innerText = "Update User";
                document.getElementById("submitting").disabled = false;
        });
};
export const logoutUser = () => async (dispatch) => {
        dispatch({ type: USER_LOGOUT });
        removeUser();
        await logout().then(response => {
                if (response.status === 201) {
                        toast.success('User Logged Out Successfully!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                }
                else if (response.status === 208) {
                        toast.error(response.data, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                }
        }).catch(error => {
                toast.error(error.maessage, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        });
};