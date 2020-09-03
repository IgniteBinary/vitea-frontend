import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';


export const initialState = {
  logo_url: null,
  response: null,
  success: null,
  errorMessage: null,
  isLoading: false,
 
};


const updateUploadLogoSuccessState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: true,
    logo_url: action.payload.secure_url,
  };
};

const updateUploadLogoFailedState = (state, action) => {
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
    logo_url: null
  };
};
const uploadLogoReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'START_LOGO_UPLOAD':
      return StartRequest(state);
    case types.UPLOAD_LOGO_FAILED:
      return updateUploadLogoFailedState(state, action);
    case types.UPLOAD_LOGO_SUCCESS:
      return updateUploadLogoSuccessState(state, action);
    default:
      return state;
  }
};

export default uploadLogoReducer;
