import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';

export const initialState = {
  isLoading: false,
  response: null,
  location: null,
};
const getGeolocationSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    location: action.payload.results[0].formatted_address,
    success: true,
  };
};

const getGeolocationFailed = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: false,
  };
};

const StartRequest = (state) => {
  return {
    ...state,
    isLoading: true,
    errorMessage: null,
  };
};
const getGeoLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.API_REQUEST:
      return StartRequest(initialState);
    case types.GET_REVERSED_GEOLOCATION_SUCCESS:
      return getGeolocationSuccess(state, action);
    case types.GET_REVERSED_GEOLOCATION_FAILED:
      return getGeolocationFailed(state, action);

    default:
      return state;
  }
};

export default getGeoLocationReducer;
