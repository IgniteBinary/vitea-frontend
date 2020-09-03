/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const activateUserSuccess = (payload) => ({
  type: types.ACTIVATE_USER_SUCCESS,
  payload,
});

const activateUserFailed = (payload) => ({
  type: types.ACTIVATE_USER_FAILED,
  payload,
});

const startActivateUser = () => ({
  type: types.API_REQUEST,
});

const activateUser = (user) => (dispatch) => {
  dispatch(startActivateUser());
  const { _id } = JSON.parse(localStorage.getItem('user'));
  console.log(_id);
  user.initiated_by = _id;
  return axios
    .post(`${process.env.REACT_APP_API_URL}/activate-merchant-staff`, user)
    .then((res) => {
      toast.success(res.data.message);
       res.data.id = user.staff_id;
      dispatch(activateUserSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
      dispatch(activateUserFailed(err));
    });
};

export default activateUser;
