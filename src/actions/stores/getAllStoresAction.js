/* eslint-disable camelcase */
import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';


const getAllStoresSuccess = payload => ({
    type: types.GET_ALL_STORES_SUCCESS,
    payload,
});

const getAllStoresFailed = payload => ({
    type: types.GET_ALL_STORES_FAILED,
    payload,
})


const getALLStores = () => (dispatch) => {
    dispatch(apiRequest());
    const {merchant_id} =  JSON.parse(localStorage.getItem('user'))
    return axios
      .get(`https://gateway.julla.co/merchant/v1/merchants/${merchant_id}/stores`)
      .then((res) => {
        dispatch(getAllStoresSuccess(res.data));
        localStorage.setItem('stores', JSON.stringify(res.data));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        dispatch(getAllStoresFailed(err));
      });

}

export default getALLStores
