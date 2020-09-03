/* eslint-disable camelcase */
import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const trackShippingSuccess = (payload) => ({
  type: types.TRACK_SHIPPING_SUCCESS,
  payload,
});

const trackShippingFailed = (payload) => ({
  type: types.TRACK_SHIPPING_FAILED,
  payload,
});

const startTracking = () => ({
  type: 'START_TRACKING'
})

const trackShipping = (order_no) => (dispatch) => {
  dispatch(startTracking());
  //const { _id, merchant_id } = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  return axios
    .get(`https://gateway.julla.co/logistics/v1/shipping/order/track/${order_no}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': true,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      dispatch(trackShippingSuccess(res.data));
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
      dispatch(trackShippingFailed(err));
    });
};

export default trackShipping;
