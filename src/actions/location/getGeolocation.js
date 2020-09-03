/* eslint-disable camelcase */
import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';


const getReversedGeoLocationSuccess = (payload) => ({
  type: types.GET_REVERSED_GEOLOCATION_SUCCESS,
  payload,
});

const getReversedGeoLocationFailed = (payload) => ({
  type: types.GET_REVERSED_GEOLOCATION_FAILED,
  payload,
});

const GetLocation = (lat, lng) => (dispatch) => {
  const url = `${process.env.REACT_APP_GEOCODING_API}${lat},${lng}&key=${process.env.REACT_APP_GOOGE_MAPS_API}`;
  dispatch(apiRequest());
  return axios
    .post(url)
    .then((res) => {
      console.log(res.data)
      dispatch(getReversedGeoLocationSuccess(res.data));
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      dispatch(getReversedGeoLocationFailed(err));
    });
};


export default GetLocation;
