/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const resetPasswordSuccess = (payload) => ({
  type: types.RESET_PASSWORD_SUCCESS,
  payload,
});

const resetPasswordFailed = (payload) => ({
  type: types.RESET_PASSWORD_FAILED,
  payload,
});

const startResetPassword = () => ({
  type: 'StartPasswordReset',
});

const resetPassword = (payload) => (dispatch) => {
  dispatch(startResetPassword());
  return axios
    .post(
      'https://gateway.julla.co/auth/api/auth/v2/staff-reset-password',
      payload
    )
    .then((res) => {
      dispatch(resetPasswordSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      toast.error('Email does not exits');
      dispatch(resetPasswordFailed(err));
    });
};

export default resetPassword;
