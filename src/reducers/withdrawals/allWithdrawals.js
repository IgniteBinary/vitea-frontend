import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';

export const initialState = {
  balance: null,
  withdrawalls: [],
  isLoading: false,
  response: null,
  getWithdrawalsError: null,
  success: null,
  errorMessage: null,
};

const updateStartGetWithdrawalsState = (state) => ({
  ...state,
  isLoading: true,
  success: false,
  errorMessage: false,
  getWithdrawalsError: false,
});

const updateGetWithdrawalsSuccessState = (state, action) => ({
  ...state,
  balance: action.payload.message[0].balance,
  isLoading: false,
  response: action.payload,
  withdrawalls: action.payload.message[1],
  success: true,
});

const updateGetWithdrawalsFailedState = (state, action) => ({
  ...state,
  isLoading: false,
  response: action.payload,
  success: false,
});


const withDrawalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GET_ALL_WITHDRAWALS':
      return updateStartGetWithdrawalsState(state);
    case types.GET_ALL_WITHDRAWALS_SUCCESS:
      return updateGetWithdrawalsSuccessState(state, action);
    case types.GET_ALL_WITHDRAWALS_FAILED:
      return updateGetWithdrawalsFailedState(state, action);
    
    default:
      return state;
  }
};

export default withDrawalsReducer;
