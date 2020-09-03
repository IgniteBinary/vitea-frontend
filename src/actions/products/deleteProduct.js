/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const deleteProductSuccess = (payload) => ({
  type: types.DELETE_PRODUCT_SUCCESS,
  payload,
});

const deleteProductFailed = (payload) => ({
  type: types.DELETE_PRODUCT_FAILED,
  payload,
});

const startDeleteProduct = () => ({
  type: types.API_REQUEST,
});

const deleteProduct = (id) => (dispatch) => {
  dispatch(startDeleteProduct());
  const token = localStorage.getItem('token');
  return axios
    .delete(`https://gateway.julla.co/products/v1/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
       const data = {message: "Your product has been permanently deleted!", _id: id}
      dispatch(deleteProductSuccess(data));
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
      dispatch(deleteProductFailed(err));
    });
};

export default deleteProduct;
