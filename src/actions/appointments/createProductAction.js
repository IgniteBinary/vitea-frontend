/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const createProductSuccess = (payload) => ({
  type: types.CREATE_PRODUCT_SUCCESS,
  payload,
});

const createProductFailed = (payload) => ({
  type: types.CREATE_PRODUCT_FAILED,
  payload,
});

const startCreateProduct = () => ({
  type: 'START_CREATE_PRODUCT',
});

const createProduct = (product) => (dispatch) => {

  dispatch(startCreateProduct());
  const { _id, merchant_id } = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  product.append('merchant_id', merchant_id);
  console.log(_id);
  //product.initiated_by = _id
  //product.merchant_id = merchant_id
  return axios
    .post('https://gateway.julla.co/products/v1/product/', product, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      dispatch(createProductSuccess(res.data));
    })
    .catch((err) => {
      toast.error(err.response.data.error);
      dispatch(createProductFailed(err));
    });
};

export default createProduct;
