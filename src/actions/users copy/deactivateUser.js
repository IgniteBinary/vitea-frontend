/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const deactivateUserSuccess = (payload) => ({
  type: types.DEACTIVATE_USER_SUCCESS,
  payload,
});

const deactivateUserFailed = (payload) => ({
  type: types.DEACTIVATE_USER_FAILED,
  payload,
});

const startDeactivateUser = () => ({
  type: types.API_REQUEST,
});

const deactivateUser = (user) => (dispatch) => {
  dispatch(startDeactivateUser());
  const { _id } = JSON.parse(localStorage.getItem('user'));
  console.log(_id);
  user.initiated_by = _id;
  return axios
    .post(`${process.env.REACT_APP_API_URL}/deactivate-merchant-staff`, user)
    .then((res) => {
       toast.success(res.data.message);
       res.data.id = user.staff_id;
       console.log(res.data)
      dispatch(deactivateUserSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
      dispatch(deactivateUserFailed(err));
    });
};

export default deactivateUser;
