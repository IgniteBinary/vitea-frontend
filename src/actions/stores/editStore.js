/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';

const editStoreSuccess = (payload) => ({
  type: types.EDIT_STORE_SUCCESS,
  payload,
});

const editStoreFailed = (payload) => ({
  type: types.EDIT_STORE_FAILED,
  payload,
});

const startEditStore = () => ({
  type: types.API_REQUEST,
});

const editStore = (store) => (dispatch) => {
  dispatch(startEditStore());
  const { id } = store;
  delete store.id;
  const token = localStorage.getItem('token');
  return axios
    .patch(`https://gateway.julla.co/merchant/v1/stores/${id}`, store, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then((res) => {
      dispatch(editStoreSuccess(res.data));
      console.log(res.data, 'response');
    })
    .catch((err) => {
      if (err.message === 'Network Error') {
        console.log('Oops! Something went wrong try again');
      }
      console.log(err);
      toast.error('Oops something went wrong');
      dispatch(editStoreFailed(err));
    });
};

export default editStore;
