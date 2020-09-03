import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';

export const initialState = {
  isLoading: false,
  response: null,
  success: null,
  errorMessage: null,
};



const switchDnsSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    success: true,
    response: action.payload,
  };
};

const switchDnsFailed = (state, action) => {
  return {
    ...state,
    isLoading: false,
    success: false,
    response: action.payload,
  };
};

const startSwitchDns = (state) => {
  return {
    ...state,
    isLoading: true,
    success: false,
    errorMessage: null,
  };
};

const dnsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_SWITCH_DOMAINS':
      return startSwitchDns(state);
    case types.SWITCH_DOMAINS_SUCCESS:
      return switchDnsSuccess(state, action);
    case types.SWITCH_DOMAINS_FAILED:
      return switchDnsFailed(state, action);
    default:
      return state;
  }
};

export default dnsReducer;
