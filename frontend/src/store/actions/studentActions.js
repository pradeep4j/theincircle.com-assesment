import { addStudent, getAllStudent, deleteStudent, updateStudent, getStudentById, searchStudents } from '../../routes/studentRoutes';
import { toast } from 'react-toastify';
import {
        STUDENT_LIST_FAIL,
        STUDENT_LIST_REQUEST,
        STUDENT_LIST_SUCCESS,
        STUDENT_CREATE_REQUEST,
        STUDENT_CREATE_SUCCESS,
        STUDENT_CREATE_FAIL,
        STUDENT_UPDATE_FAIL,
        STUDENT_UPDATE_REQUEST,
        STUDENT_UPDATE_SUCCESS,
        STUDENT_DELETE_FAIL,
        STUDENT_DELETE_REQUEST,
        STUDENT_DELETE_SUCCESS,
        STUDENT_GETSTUDENTBYID_REQUEST,
        STUDENT_GETSTUDENTBYID_SUCCESS,
        STUDENT_GETSTUDENTBYID_FAIL,
        STUDENT_GETSTUDENTBYSEARCH_REQUEST,
        STUDENT_GETSTUDENTBYSEARCH_SUCCESS,
        STUDENT_GETSTUDENTBYSEARCH_FAIL

} from "../actionTypes/studentConstants";

export const createStudents = (postBody) => async (dispatch) => {
        dispatch({ type: STUDENT_CREATE_REQUEST });
        await addStudent(postBody).then(response => {

                dispatch({ type: STUDENT_CREATE_SUCCESS, payload: response.data });

                if (response.status === 201) {
                        toast.success('Student Added Successfully!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                }
                else if (response.data === 409) {
                        dispatch({ type: STUDENT_CREATE_FAIL, payload: 'Email is already registered with us!' });
                        toast.error('Email is already registered with us!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                }
                else {
                        dispatch({ type: STUDENT_CREATE_FAIL, payload: response.message });
                        toast.error(response.message, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                }
        }).catch(error => {
                dispatch({ type: STUDENT_CREATE_FAIL, payload: error.message });
                toast.error(error.message, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        });
}
export const updateStudents = (postBody, id) => async (dispatch) => {
        dispatch({ type: STUDENT_UPDATE_REQUEST });
        await updateStudent(postBody, id).then(response => {
                dispatch({ type: STUDENT_UPDATE_SUCCESS, payload: response.data });
                if (response.status === 201) {
                        toast.success('Student Updated Successfully!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                }
        }).catch(error => {
                dispatch({ type: STUDENT_UPDATE_FAIL, payload: error.message });
                toast.error(error.message, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        });
}
export const getAllStudents = () => async (dispatch) => {
        dispatch({ type: STUDENT_LIST_REQUEST });
        await getAllStudent().then(response => {
                dispatch({ type: STUDENT_LIST_SUCCESS, payload: response.data });
                if (response.status === 201) {
                        /* toast.success('Showing Students Records Successfully!', {
                                 position: "bottom-right",
                                 hideProgressBar: false,
                                 progress: undefined,
                         });  */
                }
        }).catch(error => {
                dispatch({ type: STUDENT_LIST_FAIL, payload: error.message });
                toast.error(error.message, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        })
}
export const deleteStudents = (e, id) => async (dispatch) => {
        dispatch({ type: STUDENT_DELETE_REQUEST });
        let targetSet = e.currentTarget;

        const response = await deleteStudent(id).then(response => {
                dispatch({ type: STUDENT_DELETE_SUCCESS, payload: response.data });
                if ((response.status === 201 || response.status === 200) && (response.data !== 403 && response.data !== 401 && response.data !== 404)) {
                        targetSet.innerText = 'Delete';
                        e.target.closest("tr").remove();
                        toast.success(response.data, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                }
        }).catch(error => {
                dispatch({ type: STUDENT_DELETE_FAIL, payload: error.message });
                toast.error(error.message, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        });
}
export const getStudentsById = (id) => async (dispatch) => {
        dispatch({ type: STUDENT_GETSTUDENTBYID_REQUEST });
        await getStudentById(id).then(response => {
                dispatch({ type: STUDENT_GETSTUDENTBYID_SUCCESS, payload: response.data });
                if (response.status === 201) {
                        toast.success(response.data, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                }
                else {
                        dispatch({ type: STUDENT_GETSTUDENTBYID_FAIL, payload: `OOps!...No Record Found on this ID ${id} !!` });
                        toast.error(`OOps!...No Record Found on this ID ${id} !!`, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });

                }

        }).catch(error => {
                dispatch({ type: STUDENT_GETSTUDENTBYID_FAIL, payload: error.message });
                toast.error(`OOps!...No Record Found on this ID ${id} !!`, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        });
}
export const studentSearch = (data) => async (dispatch) => {
        dispatch({ type: STUDENT_GETSTUDENTBYSEARCH_REQUEST });
        await searchStudents(data).then(response => {
                dispatch({ type: STUDENT_GETSTUDENTBYSEARCH_SUCCESS, payload: response.data });

                if (response.status === 201) {
                        /* alert(response.status)
                         toast.success(response.data, {
                                 position: "bottom-right",
                                 hideProgressBar: false,
                                 progress: undefined,
                         });*/
                }
                else {
                        dispatch({ type: STUDENT_GETSTUDENTBYID_FAIL, payload: `OOps!...No Record Found !!` });
                        toast.error(`OOps!...No Record Found !!`, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                }

        }).catch(error => {
                dispatch({ type: STUDENT_GETSTUDENTBYSEARCH_FAIL, payload: error.message });
                toast.error(error.message, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
        });
}



