import axios from 'axios';
import { http, getToken } from '../utils/localStorage'
const URL = 'http://localhost:8000/api/student';
axios.defaults.withCredentials = true;

///api of students starts
export const addStudent = async (data) => {
        return await axios.post(`${URL}/add-student`, data);
}
export const getAllStudent = async () => {
        return await axios.get(`${URL}/students`);
}
export const deleteStudent = async (id) => {

        return await axios.delete(`${URL}/deleteStudent/${id}`);
}
export const getStudentById = async (id) => {
        return await axios.get(`${URL}/edit-student/${id}`);
}
export const updateStudent = async (data, id) => {
        return await axios.put(`${URL}/studentUpdate/${id}`, data);
}
export const searchStudents = async (data) => {

        return await axios.post(`${URL}/searchStudentRecords`, data);
}
    ///api of students ends
