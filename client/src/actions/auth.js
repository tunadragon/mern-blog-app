import * as api from '../api';
import { AUTH } from '../constants/actionTypes'

export const signin = (formData, history) => async (dispatch) => {
    try {
        // log in user
        const { data } = await api.signIn(formData)
        dispatch({type:AUTH, data})

        // navigate back to home page
        history.push('/')
    } catch (err) {
        console.log(err)
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        // sign up user
        const { data } = await api.signUp(formData)
        dispatch({type:AUTH, data})

        // navigate back to home page
        history.push('/')
    } catch (err) {
        console.log(err)
    }
}