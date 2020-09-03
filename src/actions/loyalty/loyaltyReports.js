import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const getmerchantReportsSuccess = (payload) => ({
  type: types.GET_MERCHANT_REPORTS_SUCCESS,
  payload,
});

const getmerchantReportsFailed = (payload) => ({
  type: types.GET_MERCHANT_REPORTS_FAILED,
  payload,
});

const getMerchantReports = () => (dispatch) => {
  dispatch(apiRequest());
  const { merchant_id } = JSON.parse(localStorage.getItem('user'));
  return axios
    .get(
      `https://gateway.julla.co/loyalty/v1/merchant-reports/${merchant_id}`
    )
    .then((res) => {
      dispatch(getmerchantReportsSuccess(res.data));
      console.log('loyalty reports >>>>',)
      console.log(res.data);
      toast.success('Merchant reports fetched successfully');
    })
    .catch((err) => {
        if (err.message === 'Network Error') {
         toast.error('Oops! Something went wrong')
        }
      console.log(err);
      toast.error(err.response.data.message);
      dispatch(getmerchantReportsFailed(err));
    });
};

export default getMerchantReports;
