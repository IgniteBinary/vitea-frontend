/* eslint-disable camelcase */
import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const getShippingSuccess = (payload) => ({
  type: types.GET_SHIPPING_SUCCESS,
  payload,
});

const getShippingFailed = (payload) => ({
  type: types.GET_SHIPPING_FAILED,
  payload,
});

const getShipping = order_no => (dispatch) => {
  dispatch(apiRequest());
  //const { _id, merchant_id } = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  return axios
    .get(`https://gateway.julla.co/logistics/v1/shipping/order/${order_no}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': true,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      dispatch(getShippingSuccess(res.data));
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
      dispatch(getShippingFailed(err));
    });
};

export default getShipping;
