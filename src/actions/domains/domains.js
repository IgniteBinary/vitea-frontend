
import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';


const getAllDomainsSuccess = (payload) => ({
  type: types.GET_ALL_DOMAINS_SUCCESS,
  payload,
});

const getAllDomainsFailed = (payload) => ({
  type: types.GET_ALL_DOMAINS_FAILED,
  payload,
});

const startGetAllDomains = () => ({
    type: 'START_GET_ALL_DOMAINS'
})



const getAllDomains = () => (dispatch) => {
  dispatch(startGetAllDomains());
  const { _id, merchant_id } = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  return axios
    .get(
      `https://gateway.julla.co/merchant/v1/merchants/${merchant_id}/domains`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': true,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      dispatch(getAllDomainsSuccess(res.data));
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
      dispatch(getAllDomainsFailed(err));
    });
};

export default getAllDomains;
