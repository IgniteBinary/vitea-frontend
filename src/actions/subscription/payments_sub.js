import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const makeSubPaymentSuccess = (payload) => ({
  type: types.MAKE_SUBSCRIPTION_PAYMENTS_SUCCESS,
  payload,
});

const makeSubPaymentsFailed = (payload) => ({
  type: types.MAKE_SUBSCRIPTION_PAYMENTS_FAILED,
  payload,
});

const startMakePayments = () => ({
  type: 'START_MAKE_PAYMENTS',
});

const makePayments = (pay) => (dispatch) => {
  dispatch(startMakePayments());
  const { _id, merchant_id } = JSON.parse(localStorage.getItem('user'));
  console.log(_id);
  return axios
    .post(`https://gateway.julla.co/merchant/v1/merchants/${merchant_id}/renew-subscription`, pay)
    .then((res) => {
      dispatch(makeSubPaymentSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
      dispatch(makeSubPaymentsFailed(err));
    });
};

export default makePayments;
