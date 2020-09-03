/* eslint-disable camelcase */
import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const getAllOdersSuccess = (payload) => ({
  type: types.GET_ALL_ORDERS_SUCCESS,
  payload,
});

const getAllOdersFailed = (payload) => ({
  type: types.GET_ALL_ORDERS_FAILED,
  payload,
});

const getALLOrders = () => (dispatch) => {
  dispatch(apiRequest());
  const { _id, merchant_id } = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  return axios
    .get(`https://gateway.julla.co/orders/v1/orders/${merchant_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      dispatch(getAllOdersSuccess(res.data.message));
      console.log(res.data.message)
    })
    .catch((err) => {
      console.log(err.status);
      if (err === 'Unauthorized') {
        toast.error('Your session has expired');
      } else {
        console.error('Error', err);
      }

      //dispatch(getAllOdersFailed(err));
    });
};

export default getALLOrders;
