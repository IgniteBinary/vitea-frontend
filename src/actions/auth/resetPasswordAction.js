import axios from 'axios';
import * as types from '../action_types';
import apiRequest from '../common_actions';

const resetPasswordSuccess = payload => ({
    type: types.RESET_PASSWORD_SUCCESS,
    payload,
});

const resetPasswordFailed = payload => ({
    type: types.RESET_PASSWORD_FAILED,
    payload,
});

const resetPassword = newpass => (dispatch) => {
    dispatch(apiRequest());
    return axios.post(`${process.env.SEVER_API}/auth/resetpassword`, newpass)
    .then((res) => {
        dispatch(resetPasswordSuccess(res.data));
    })
    .catch((err) => {dispatch(resetPasswordFailed(err));});
}

export default resetPassword
