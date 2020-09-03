/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';

const editProductSuccess = (payload) => ({
  type: types.EDIT_PRODUCT_SUCCESS,
  payload,
});

const editProductFailed = (payload) => ({
  type: types.EDIT_PRODUCT_FAILED,
  payload,
});

const startEditProduct = () => ({
  type: types.API_REQUEST,
});

const editProduct = (product) => (dispatch) => {
  dispatch(startEditProduct());
  console.log('I was called')
  const {_id} = product;
  delete product._id;
  delete product.product_image
  const token = localStorage.getItem('token');
  return axios
    .patch(`https://gateway.julla.co/products/v1/product/${_id}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then((res) => {
      dispatch(editProductSuccess(res.data));
      console.log(res.data, 'response');
    })
    .catch((err) => {
      if (err.message === 'Network Error'){
          console.log('Oops! Something went wrong try again')
      }
      console.log(err);
      toast.error('Oops something went wrong');
      dispatch(editProductFailed(err));
    });
};

export default editProduct;
