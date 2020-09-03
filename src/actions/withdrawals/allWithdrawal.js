/* eslint-disable camelcase */
import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
//import apiRequest from '../common_actions';

const getAllWithdrawalsSuccess = (payload) => ({
  type: types.GET_ALL_WITHDRAWALS_SUCCESS,
  payload,
});


const getAllWithdrawalsFailed = (payload) => ({
  type: types.GET_ALL_WITHDRAWALS_FAILED,
  payload,
});

const startGetAllWithdrawals = () => ({
    type: 'START_GET_ALL_WITHDRAWALS'
})


const getAllWithdrawals = () => (dispatch) => {
  dispatch(startGetAllWithdrawals());
  const { merchant_id } = JSON.parse(localStorage.getItem('user'));
  return axios
    .get(
      `https://gateway.julla.co/merchant/v1/merchants/${merchant_id}/payment-withdrawals/`
    )
    .then((res) => {
      dispatch(getAllWithdrawalsSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
      dispatch(getAllWithdrawalsFailed(err));
    });
};

export default getAllWithdrawals;
