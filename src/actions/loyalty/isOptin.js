/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const checkOptinStatusSuccess = (payload) => ({
  type: types.CHECK_OPTIN_STATUS_SUCCESS,
  payload,
});

const checkOptinStatusFailed = (payload) => ({
  type: types.CHECK_OPTIN_STATUS_FAILED,
  payload,
});

const startLoyaltyRequest = () => ({
  type: types.API_REQUEST,
});

const optinStatus = (divider) => (dispatch) => {
  dispatch(startLoyaltyRequest());
  const {  merchant_id } = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  return axios
    .post(
      `https://gateway.julla.co/loyalty/v1/opted-in/${merchant_id}`,
    )
    .then((res) => {
      toast.success(res.data.message);
      console.log(res.data);
      dispatch(checkOptinStatusSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
      dispatch(checkOptinStatusFailed(err));
    });
};

export default optinStatus;
