import updateObject from '../reducer.utils';
import * as types from '../../actions/action_types';

export const initialState = {
  isLoading: false,
  response: null,
  success: null,
};

const updateTrackShippingSuccessState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: true,
  };
};

const updateTrackShippingFailedState = (state, action) => {
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
const trackShippingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_TRACKING':
      return StartRequest(state);
    case types.TRACK_SHIPPING_SUCCESS:
      return updateTrackShippingSuccessState(state, action);
    case types.TRACK_SHIPPING_FAILED:
      return updateTrackShippingFailedState(state, action);
    default:
      return state;
  }
};

export default trackShippingReducer;
