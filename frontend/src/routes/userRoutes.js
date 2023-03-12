import axios from 'axios';
import { http, getToken } from '../utils/localStorage'
const URL = 'http://localhost:8000/api/user';
axios.defaults.withCredentials = true;
///api of users starts
export const login = async (data) => {
    return await axios.post(`${URL}/login`, data);
}
export const logout = async () => {
    return await axios.get(`${URL}/logout`);
}
export const addUser = async (data) => {
    return await axios.post(`${URL}/add-user`, data);
}
export const usersProfileByid = async (id) => {
    return await axios.get(`${URL}/user-profile/${id}`);
}
export const updateUsersProfileById = async (data, id) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
    };
    return await axios.put(`${URL}/update-user-profile/${id}`, data, config); //adding token header with request
}
///api of users end