/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const optinLoyaltySuccess = (payload) => ({
  type: types.OPTIN_LOYALTY_SUCCESS,
  payload,
});

const optinLoyaltyFailed = (payload) => ({
  type: types.OPTIN_LOYALTY_FAILED,
  payload,
});

const startLoyaltyRequest = () => ({
  type: types.API_REQUEST,
});

const optInLoyalty = (divider) => (dispatch) => {
  dispatch(startLoyaltyRequest());
  const { _id, merchant_id } = JSON.parse(localStorage.getItem('user'));
  const token  = localStorage.getItem('token');
  console.log(_id);
  return axios
    .post(`https://gateway.julla.co/loyalty/v1/opt-in/${merchant_id}`, divider,  {
       headers: {
        Authorization : `Bearer ${token}`,
      }

    })
    .then((res) => {
      toast.success(res.data.message);
      console.log(res.data)
      dispatch(optinLoyaltySuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
      dispatch(optinLoyaltyFailed(err));
    });
};

export default optInLoyalty;
