import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';


export const initialState = {
  subscribed: null,
  isLoading: false,
  response: null,
  success: null,
  errorMessage: null,
  reports: [],
};

const updateMerchantIsOptedInSuccess = (state, action) => {
  return {
    ...state,
    subscribed:
      action.payload.message === 'Merchant is opted in to loyalty'
        ? true
        : false,
    response: action.payload,
    success: true,
  };
};

const updateMerchantIsOptedInFailed = (state, action) => {
  return {
    ...state,
    response: action.payload,
    success: false,
  };
};

const updateMerchantReportsSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: true,
    reports: action.payload.message[0],
  };
};

const updateMerchantReportsFailed = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: false,
  };
};
const updateOptinSuccessState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: true,
    subscribed: true,
  };
};

const updateOptinFailedState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    errorMessage: action.payload.response.data.message,
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
const loyaltyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.API_REQUEST:
      return StartRequest(state);
    case types.OPTIN_LOYALTY_FAILED:
      return updateOptinFailedState(state, action);
    case types.GET_MERCHANT_REPORTS_SUCCESS:
      return updateMerchantReportsSuccess(state, action);
    case types.CHECK_OPTIN_STATUS_SUCCESS:
      return updateMerchantIsOptedInSuccess(state, action);
    case types.CHECK_OPTIN_STATUS_FAILED:
      return updateMerchantIsOptedInFailed(state, action);
    case types.GET_MERCHANT_REPORTS_FAILED:
      return updateMerchantReportsFailed(state, action);
    case types.OPTIN_LOYALTY_SUCCESS:
      return updateOptinSuccessState(state, action);
    default:
      return state;
  }
};

export default loyaltyReducer;
