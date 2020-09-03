import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';

const createFacilitySuccess = (payload) => ({
  type: types.CREATE_FACILITY_SUCCESS,
  payload,
});

const createFacilityFailed = (payload) => ({
  type: types.CREATE_FACILITY_FAILED,
  payload,
});

const startCreateFacility = () => ({
  type: 'START_CREATE_FACILITY',
});

const createFacility = (merchant) => (dispatch) => {
  dispatch(startCreateFacility());
  return axios
    .post('http://vitea.azurewebsites.net/facilities', merchant)
    .then((res) => {
      toast.success('Bussiness details added successfully');
      localStorage.setItem('facility', JSON.stringify(res.data.facility))
      console.log(res.data);
      dispatch(createFacilitySuccess(res.data));
    })
    .catch((err) => {
      console.log(err.response);
      toast.error(err.response.data.message);
      dispatch(createFacilityFailed(err));
    });
};

export default createFacility;
