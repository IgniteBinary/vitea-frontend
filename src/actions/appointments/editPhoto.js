/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const editProductPhotoSuccess = (payload) => ({
  type: types.EDIT_PRODUCT_PHOTOS_SUCCESS,
  payload,
});

const editProductPhotoFailed = (payload) => ({
  type: types.EDIT_PRODUCT_PHOTOS_FAILED,
  payload,
});

const startEditProduct = () => ({
  type: types.API_REQUEST,
});

const editProduct = (product) => (dispatch) => {
  dispatch(startEditProduct());
  const { _id } = JSON.parse(localStorage.getItem('product'));
  product.append('id', _id);
  product.append('editing', 'true')
  console.log(_id);
  //product.initiated_by = _id
  //product.merchant_id = merchant_id
  return axios
    .patch('https://gateway.julla.co/products/v1/product-images', product, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      dispatch(editProductPhotoSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
      dispatch(editProductPhotoFailed(err));
    });
};

export default editProduct;
