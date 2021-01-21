import {
    CREATE_LIST_SUCCESS,
    CREATE_LIST_FAIL,
    LOAD_USER_LISTS_SUCCESS,
    LOAD_USER_LISTS_FAIL,
    DELETE_LIST_SUCCESS,
    DELETE_LIST_FAIL,
    UPDATE_LIST_SUCCESS,
    UPDATE_LIST_FAIL,
    LOAD_LIST_OWNER_SUCCESS,
    LOAD_LIST_OWNER_FAIL
} from '../actions/types';

const initialState = {
    lists: {},
    selectedList: null, 
    listErrors: [],
    listOwner: null
}

export default function(state = initialState, action) {
    const {type, payload} = action; 

    switch(type) {
        case CREATE_LIST_SUCCESS:
            return {
                ...state,
                selectedList: payload
            }
        case CREATE_LIST_FAIL:
            return {
                ...state, 
                listErrors: ['Failed to create list.']
            }
        case LOAD_USER_LISTS_SUCCESS:
            return {
                ...state,
                lists: payload
            }
        case LOAD_USER_LISTS_FAIL:
            return {
                ...state,
                listErrors: ['User lists retrieval failed.']
            }
        case DELETE_LIST_FAIL:
            return {
                ...state,
                listErrors: ['List Delete Failed.']
            }
        case UPDATE_LIST_FAIL:
            return {
                ...state,
                listErrors: ['List Update Failed.']
            }
        case LOAD_LIST_OWNER_SUCCESS:
            return {
                ...state, 
                listOwner: payload
            }
        case LOAD_LIST_OWNER_FAIL:
            return {
                ...state,
            }
        case UPDATE_LIST_SUCCESS:
        case DELETE_LIST_SUCCESS:
        default:
            return state;
    }
}