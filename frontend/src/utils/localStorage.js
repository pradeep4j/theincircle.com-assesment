import axios from 'axios';

export const getToken = () => {
        let userInfos = localStorage.getItem('userInfo');
        const userToken = JSON.parse(userInfos);
        if (userToken) {
                return userToken.access_token;
        }
}
export const getAPIUrl = () => {
        let URL = 'http://localhost:8000/api';
        return URL;
}
export const setUser = (user_logged) => {
        const user = localStorage.setItem('userInfo', JSON.stringify(user_logged))
        return user;
}
export const getUser = () => {
        let userInfo = localStorage.getItem('userInfo');
        const user_detail = JSON.parse(userInfo);
        return user_detail;
}
export const removeUser = () => {
        const user_logged_out = localStorage.removeItem('userInfo');
        // return user_logged_out;
}
export const isLoggedIn = () => {
        if (getUser() === null)
                return false;
        else
                return true;
}
export const http = axios.create({
        baseURL: `${getAPIUrl()}`,
});