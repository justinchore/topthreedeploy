import axios from 'axios';
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
} from './types';

export const create_list = (
    list_title, 
    list_entry_1,
    list_entry_1_desc,
    list_entry_2,
    list_entry_2_desc,
    list_entry_3,
    list_entry_3_desc,
    list_author
    ) => async dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ list_title, list_entry_1, list_entry_1_desc, list_entry_2, 
        list_entry_2_desc, list_entry_3, list_entry_3_desc, "list_author":Number(list_author)});

        console.log(body);

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/lists/`, body, config)

            dispatch({
                type: CREATE_LIST_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CREATE_LIST_FAIL
            })
        }
}

export const load_user_lists = (user_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/lists/user/${user_id}/`, config)

        dispatch({
            type: LOAD_USER_LISTS_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: LOAD_USER_LISTS_FAIL,
        })
    }


}

export const delete_list = (list_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/lists/${list_id}/`);

        dispatch({
            type: DELETE_LIST_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: DELETE_LIST_FAIL
        })
    }
}

export const update_list = (list_id, list_title, list_entry_1, list_entry_2, list_entry_3, list_entry_1_desc, list_entry_2_desc, list_entry_3_desc, list_author) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    const body = JSON.stringify({ list_title, list_entry_1, list_entry_1_desc, list_entry_2, 
    list_entry_2_desc, list_entry_3, list_entry_3_desc, "list_author":Number(list_author)});

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/lists/${list_id}/`, body, config);

        dispatch({
            type: UPDATE_LIST_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: UPDATE_LIST_FAIL
        })
    }
}

export const load_list_owner = (owner_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }; 

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/lists/owner/${owner_id}/`, config);

        dispatch({
            type: LOAD_LIST_OWNER_SUCCESS,
            payload: res.data
        }); 
    } catch (err) {
        dispatch({
            type: LOAD_LIST_OWNER_FAIL
        })
    }
}
