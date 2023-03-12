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

export const studentListReducer = (state = {}, action) =>{  ///here action.type accepts action type from studentAction.js and action.payload accepts data from studentAction.js and return either state or state in terms of loading, error or success type
        switch (action.type) {
                case STUDENT_LIST_REQUEST:
                        return { loading: true };
                case STUDENT_LIST_SUCCESS:
                        return { loading: false, studentInfo: action.payload };
                case STUDENT_LIST_FAIL:
                        return { loading: false, error: action.payload };
                default:
                        return state;
        } 
} 
export const studentCreateReducer = (state = {}, action) =>{
        switch (action.type) {
                case STUDENT_CREATE_REQUEST:
                        return { loading: true };
                case STUDENT_CREATE_SUCCESS:
                        return { loading: false, studentInfo: action.payload };
                case STUDENT_CREATE_FAIL:
                        return { loading: false, error: action.payload };
                default:
                        return state;
        } 
}
export const studentEditReducer = (state = {}, action) =>{
        switch (action.type) {
                case STUDENT_UPDATE_REQUEST:
                        return { loading: true };
                case STUDENT_UPDATE_SUCCESS:
                        return { loading: false, studentInfo: action.payload,success:true };
                case STUDENT_UPDATE_FAIL:
                        return { loading: false, error: action.payload,success:false };
                default:
                        return state;
        } 
}
export const studentDeleteReducer = (state = {}, action) =>{
        switch (action.type) {
                case STUDENT_DELETE_REQUEST:
                        return { loading: true };
                case STUDENT_DELETE_SUCCESS:
                        return { loading: false, studentInfo: action.payload };
                case STUDENT_DELETE_FAIL:
                        return { loading: false, error: action.payload };
                default:
                        return state;
        }         
}         
export const studentGetByIdReducer = (state = {}, action) =>{
        switch (action.type) {
                case STUDENT_GETSTUDENTBYID_REQUEST:
                        return { loading: true };
                case STUDENT_GETSTUDENTBYID_SUCCESS:
                        return { loading: false, studentInfoByid: action.payload };
                case STUDENT_GETSTUDENTBYID_FAIL:
                        return { loading: false, error: action.payload };
                default:
                        return state;
        }         
}
export const studentBySearchReducer = (state = {}, action) =>{
        switch (action.type) {
                case STUDENT_GETSTUDENTBYSEARCH_REQUEST:
                        return { loading: true };
                case STUDENT_GETSTUDENTBYSEARCH_SUCCESS:
                        return { loading: false, studentInfoBySearch: action.payload };
                case STUDENT_GETSTUDENTBYSEARCH_FAIL:
                        return { loading: false, error: action.payload };
                default:
                        return state;
        }         
}