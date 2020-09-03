import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';


export const initialState = {
  cert_url: null,
  response: null,
  success: null,
  errorMessage: null,
  isLoading: false,
 
};


const updateUploadCertSuccessState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: true,
    cert_url: action.payload.secure_url
  };
};

const updateUploadCertFailedState = (state, action) => {
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
    response: null,
    cert_url: null
  };
};
const uploadImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_CERT_UPLOAD':
      return StartRequest(state);
    case types.UPLOAD_CERT_SUCCESS:
      return updateUploadCertSuccessState(state, action);
    case types.UPLOAD_CERT_FAILED:
      return updateUploadCertFailedState(state, action);
    default:
      return state;
  }
};

export default uploadImageReducer;
