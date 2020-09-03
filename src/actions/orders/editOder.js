/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';

const editOrderSuccess = (payload) => ({
  type: types.EDIT_ORDER_SUCCESS,
  payload,
});

const editOrderFailed = (payload) => ({
  type: types.EDIT_ORDER_FAILED,
  payload,
});

const startEditOrder = () => ({
  type: types.API_REQUEST,
});

const editOrder = (order) => (dispatch) => {
  dispatch(startEditOrder());
  const { order_no } = order;
  delete order.order_no;
  console.log(order, 'My value')
  const token = localStorage.getItem('token');
  return axios
    .patch(`https://gateway.julla.co/orders/v1/order/${order_no}`, order)
    .then((res) => {
      dispatch(editOrderSuccess(res.data));
      console.log(res.data, 'response');
    })
    .catch((err) => {
      if (err.message === 'Network Error') {
        console.log('Oops! Something went wrong try again');
      }
      console.log(err);
      toast.error('Oops something went wrong');
      dispatch(editOrderFailed(err));
    });
};

export default editOrder;
