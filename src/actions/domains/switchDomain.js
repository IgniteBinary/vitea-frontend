import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const switchDomainsSuccess = (payload) => ({
  type: types.SWITCH_DOMAINS_SUCCESS,
  payload,
});

const switchDomainsFailed = (payload) => ({
  type: types.SWITCH_DOMAINS_FAILED,
  payload,
});

const startSwitchDomains = () => ({
  type: 'START_SWITCH_DOMAINS',
});

const switchDomains = (data) => (dispatch) => {
  dispatch(startSwitchDomains());
  const { _id, merchant_id } = JSON.parse(localStorage.getItem('user'));
  console.log(_id);
  return axios
    .post(
      `https://gateway.julla.co/merchant/v1/merchants/${merchant_id}/dns`,
      data
    )
    .then((res) => {
      dispatch(switchDomainsSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message)
     toast.error(err.response.data.message.error);
      dispatch(switchDomainsFailed(err));
    });
};

export default switchDomains;
