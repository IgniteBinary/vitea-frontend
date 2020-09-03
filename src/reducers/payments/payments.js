import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';

export const initialState = {
  payments: [],
  isLoading: false,
  response: null,
  kyc_uploaded: false,
  success: null,
  errorMessage: null,
};

const updateGetPaymentsSuccessState = (state, action) => {
  return {
    ...state,
    payments: [...action.payload.message],
    isLoading: false,
    response: action.payload,
    success: true,
    kyc_uploaded: true
  };
};

const updateGetPaymentsFailedState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
  };
};

const updateUploadCoiSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: true,
  };
};

const updateUploadCoiFailed = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: false,
  };
};

const updateUploadC12Success = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: true,
  };
};

const updateUploadC12Failed = (state, action) => {
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
const getAllCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.API_REQUEST:
      return StartRequest(state);
    case types.GET_PAYMENTS_SUCCESS:
      return updateGetPaymentsSuccessState(state, action);
    case types.GET_PAYMENTS_FAILED:
      return updateGetPaymentsFailedState(state, action);
    case types.UPLOAD_COI_SUCCESS:
      return updateUploadCoiSuccess(state, action);
    case types.UPLOAD_COI_FAILED:
      return updateUploadCoiFailed(state, action);
    case types.UPLOAD_C12_SUCCESS:
      return updateUploadC12Success(state, action);
    case types.UPLOAD_C12_FAILED:
      return updateUploadC12Failed(state, action);

    default:
      return state;
  }
};

export default getAllCategoriesReducer;
