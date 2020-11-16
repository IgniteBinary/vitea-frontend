/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';

const editAppointmentSuccess = (payload) => ({
  type: types.EDIT_APPOINTMENT_SUCCESS,
  payload,
});

const editAppointmentFailed = (payload) => ({
  type: types.EDIT_APPOINTMENT_FAILED,
  payload,
});

const startEditAppointment = () => ({
  type: 'START_EDIT_APPOINTMENT',
});

const editAppointment = (appointment) => (dispatch) => {
  dispatch(startEditAppointment());
  console.log('I was called');
  const { id } = appointment;
  delete appointment.id;
  const token = localStorage.getItem('facility_token');
  return axios
    .put(`http://vitea.azurewebsites.net/appointments/${id}`, appointment, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then((res) => {
      dispatch(editAppointmentSuccess(res.data));
      toast.success('Doctor assigned');
      console.log(res.data, 'response');
    })
    .catch((err) => {
      if (err.message === 'Network Error') {
        console.log('Oops! Something went wrong try again');
      }
      console.log(err);
      toast.error('Oops something went wrong');
      dispatch(editAppointmentFailed(err));
    });
};

export default editAppointment;
