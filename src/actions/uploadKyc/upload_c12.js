/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const uploadC12Success = (payload) => ({
  type: types.UPLOAD_C12_SUCCESS,
  payload,
});

const uploadC12Failed = (payload) => ({
  type: types.UPLOAD_C12_FAILED,
  payload,
});

const startC12Upload = () => ({
  type: types.API_REQUEST,
});

const uploadC12 = (file) => (dispatch) => {
  dispatch(startC12Upload());
  const { _id, merchant_id } = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  console.log(_id);
  //product.initiated_by = _id
  //product.merchant_id = merchant_id
  return axios
    .post(
      `https://gateway.julla.co/merchant/v1/merchants/${merchant_id}/kyc/c12`,
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((res) => {
      dispatch(uploadC12Success(res.data));
    })
    .catch((err) => {
      console.log(err);
      //toast.error(err.response.data.message);
      dispatch(uploadC12Failed(err));
    });
};

export default uploadC12;
