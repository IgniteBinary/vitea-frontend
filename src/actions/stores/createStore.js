import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const createStoreSuccess = (payload) => ({
  type: types.CREATE_STORE_SUCCESS,
  payload,
});

const createStoreFailed = (payload) => ({
  type: types.CREATE_STORE_FAILED,
  payload,
});

const startCreateStore = () => ({
  type: types.API_REQUEST,
});

const createStore = (store) => (dispatch) => {
  dispatch(startCreateStore());
  const { _id,merchant_id } = JSON.parse(localStorage.getItem('user'));

  store.created_by = _id;
  store.merchant_id = merchant_id;

  return axios
    .post(`https://gateway.julla.co/merchant/v1/stores`, store)
    .then((res) => {
      toast.success(res.data.message);
      dispatch(createStoreSuccess(res.data));
    })
    .catch((err) => {
      console.log(err.response);
      toast.error(err.response.data.message);
      dispatch(createStoreFailed(err));
    });
};

export default createStore;
