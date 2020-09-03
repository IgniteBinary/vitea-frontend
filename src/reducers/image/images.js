import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';


export const initialState = {
  img_url: null,
  response: null,
  success: null,
  errorMessage: null,
  isLoading: false,
 
};


const updateUploadImageSuccessState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: true,
    img_url: action.payload.secure_url,
  };
};

const updateUploadImageFailedState = (state, action) => {
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
    img_url: null
  };
};
const uploadImageReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'START_IMAGE_UPLOAD':
      return StartRequest(state);
    case types.UPLOAD_IMAGE_FAILED:
      return updateUploadImageFailedState(state, action);
    case types.UPLOAD_IMAGE_SUCCESS:
      return updateUploadImageSuccessState(state, action);
    default:
      return state;
  }
};

export default uploadImageReducer;
