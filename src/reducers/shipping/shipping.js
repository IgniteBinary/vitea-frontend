import updateObject from '../reducer.utils';
import * as types from '../../actions/action_types';

export const initialState = {
  isLoading: false,
  response: null,
  success: null,
};

const updateGetShippingSuccessState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: true,
  };
};

const updateGetShippingFailedState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: false
  };
};

const StartRequest = (state) => {
  return {
    ...state,
    isLoading: true,
    errorMessage: null,
  };
};
const getShippingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.API_REQUEST:
      return StartRequest(state);
    case types.GET_SHIPPING_SUCCESS:
      return updateGetShippingSuccessState(state, action);
    case types.GET_SHIPPING_FAILED:
      return updateGetShippingFailedState(state, action);
    default:
      return state;
  }
};

export default getShippingReducer;
