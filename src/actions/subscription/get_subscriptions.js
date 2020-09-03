/* eslint-disable camelcase */
import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const getAllSubscriptionSuccess = (payload) => ({
  type: types.GET_ALL_SUBSCRIPTIONS_SUCCESS,
  payload,
});

const getAllSubscriptionFailed = (payload) => ({
  type: types.GET_ALL_SUBSCRIPTIONS_FAILED,
  payload,
});


const getALLSubscription = () => (dispatch) => {
  dispatch(apiRequest());
  const { merchant_id } = JSON.parse(localStorage.getItem('user'));
  return axios
    .get('https://gateway.julla.co/merchant/v1/subscriptions')
    .then((res) => {
      dispatch(getAllSubscriptionSuccess(res.data));
      localStorage.setItem('subscription', JSON.stringify(res.data));
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      dispatch(getAllSubscriptionFailed(err));
    });
};

export default getALLSubscription;
