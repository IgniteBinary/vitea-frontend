import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';


const loginSuccess =  payload => ({
    type: types.USER_LOGIN_SUCCESS,
    payload,
});

const startLoginAction = () => ({
  type: 'START_LOGIN',
});

const loginFailed = payload => ({
    type: types.USER_LOGIN_FAIL,
    payload,
})

/**
 * @description - Login A user
 * @param {object} user
 * @returns {Function} - A dispatch function
 */

const login = user => (dispatch) => {
    dispatch(startLoginAction());
    return axios.post('http://vitea.azurewebsites.net/facilities/login', user)
    .then((res) => {
        localStorage.setItem('facility_token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.facility))
        dispatch(loginSuccess(res.data));
    })
    .catch((err) => {
        toast.error(err.response.data.message);
         dispatch(loginFailed(err)); });

}

export default login
