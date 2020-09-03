/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const getPaymentSuccess = (payload) => ({
  type: types.GET_PAYMENTS_SUCCESS,
  payload,
});

const getPaymentFailed = (payload) => ({
  type: types.GET_PAYMENTS_FAILED,
  payload,
});

const startGetPayments = () => ({
  type: types.API_REQUEST,
});

const getPayments = (product) => (dispatch) => {
  dispatch(startGetPayments());
  const { _id, merchant_id } = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  console.log(_id);
  //product.initiated_by = _id
  //product.merchant_id = merchant_id
  return axios
    .get(
      `https://gateway.julla.co/merchant/v1/merchants/${merchant_id}/payments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((res) => {
      dispatch(getPaymentSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      if (err.message === 'Request failed with status code 404'){
        toast.error( 'Upload CR-12 and Certificate of incorporation to activate account' );
      }else{
        toast.error(err.response.data.message);
      }
      dispatch(getPaymentFailed(err.response.data));
    });
};

export default getPayments;
