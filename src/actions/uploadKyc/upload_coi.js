/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const uploadCoiSuccess = (payload) => ({
  type: types.UPLOAD_COI_SUCCESS,
  payload,
});

const uploadCoiFailed = (payload) => ({
  type: types.UPLOAD_COI_FAILED,
  payload,
});

const startCoiUpload = () => ({
  type: types.API_REQUEST,
});

const uploadCoi = (file) => (dispatch) => {
  dispatch(startCoiUpload());
  const { _id, merchant_id } = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  console.log(_id);
  //product.initiated_by = _id
  //product.merchant_id = merchant_id
  return axios
    .post(
      `https://gateway.julla.co/merchant/v1/merchants/${merchant_id}/kyc/coi`,
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((res) => {
      dispatch(uploadCoiSuccess(res.data));
      toast.success(res.data.message)
    })
    .catch((err) => {
      console.log(err);
      //toast.error(err.response.data.message);
      dispatch(uploadCoiFailed(err));
    });
};

export default uploadCoi;
