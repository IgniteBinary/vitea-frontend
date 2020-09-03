import * as types from '../../actions/action_types';
//import updateObject from '../reducer.utils';

export const initialState = {
  isLoading: false,
  response: null,
  success: null,
  errorMessage: null,
};

const updatePasswordResetSuccessState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: true
  };
};

const updatePasswordResetFailedState = (state, action) => {
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
    success: null,
  };
};


const passwordResetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'StartPasswordReset':
      return StartRequest(state);
    case types.RESET_PASSWORD_SUCCESS:
      return updatePasswordResetSuccessState(state, action);
    case types.RESET_PASSWORD_FAILED:
      return updatePasswordResetFailedState(state, action);
    default:
      return state;
  }
};

export default passwordResetReducer;
