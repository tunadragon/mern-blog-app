import * as api from '../api';
import { FETCH_ALL, CREATE, DELETE, UPDATE } from '../constants/actionTypes'

// Action Creators: functions that return an action
// Action: object with a type and payload
// Redux-thunk: async logic
export const getPosts = () => async (dispatch) => {
    try {
        // try to fetch all data from api
        const { data } = await api.fetchPosts();
        const action = { type: FETCH_ALL, payload: data}
        // send data through action.payload (goes to reducer)
        dispatch(action);
    } catch (err) {
        console.log(err.message);
    }
}

export const createPost = (newPost) => async (dispatch) => {
    try {
        // make api request to create bew post
        const { data } = await api.createPost(newPost);

        const action = { type: CREATE, payload: data}
        dispatch(action);
    } catch (err) {
        console.log(err.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        // make api request to update post
        const { data } = await api.updatePost(id, post);

        const action = { type: UPDATE, payload: data}
        dispatch(action);
    } catch (err) {
        console.log(err.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        const action = { type: DELETE, payload: id }
        dispatch(action);
    } catch(err) {
        console.log(err.message);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        const action = { type: UPDATE, payload: data }
        dispatch(action);
    } catch(err) {
        console.log(err.message);
    }
}