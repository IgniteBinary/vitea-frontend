/* eslint-disable camelcase */
import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';


const getAllAppointmentsSuccess = payload => ({
    type: types.GET_ALL_PRODUCTS_SUCCESS,
    payload,
});

const getAllAppointmentsFailed = payload => ({
    type: types.GET_ALL_PRODUCTS_FAILED,
    payload,
})


const getALLAppointments = () => (dispatch) => {
    dispatch(apiRequest());
    const { facility_id } = JSON.parse(localStorage.getItem('user'));
    const facility_token = localStorage.getItem('facility_token')
    return axios
      .get(`http://vitea.azurewebsites.net/appointments/facility/${facility_id}`,{
        headers: {
          Authorization: `Bearer ${facility_token}`
        },
      })
      .then((res) => {
        console.log(res)
        console.log(res.data)
        dispatch(getAllAppointmentsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
        dispatch(getAllAppointmentsFailed(err));
      });

}

export default getALLAppointments;
