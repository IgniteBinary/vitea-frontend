/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import {toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const createOrderSuccess = payload => ({
    type: types.CREATE_ORDER_SUCCESS,
    payload,
});

const createOrderFailed = payload => ({
    type: types.CREATE_ORDER_FAILED,
    payload,
});

const startCreateOrder = () => ({
    type: types.API_REQUEST,
})

const createOrder = order => (dispatch) => {
    dispatch(startCreateOrder());
    const { _id, merchant_id } = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    console.log(_id)
    return axios
      .post(`${process.env.REACT_APP_CREATE_ORDER_API}/${_id}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      .then((res) => {
        dispatch(createOrderSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        dispatch(createOrderFailed(err));
      });
}

export default createOrder;
