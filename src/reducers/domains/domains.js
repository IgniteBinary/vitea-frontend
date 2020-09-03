import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';


export const initialState = {
  domains: [],
  isLoading: false,
  response: null,
  getDomainsError: null,
  success: null,
  errorMessage: null,
};

const updateGetAllDomainsSuccessState = (state, action) => {
  return {
    ...state,
    domains: [...action.payload.message],
    isLoading: false,
    response: action.payload,
    success: true,
  };
};

const updateGetAllDomainsFailedState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    getAllCategoriesError: true,
    response: action.payload,
    errorMessage: action.payload.response.data.message,
  };
};

const StartRequest = (state) => {
  return {
    ...state,
    isLoading: true,
    success: false,
    errorMessage: null,
  };
};
const getAllDomainsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GET_ALL_DOMAINS':
      return StartRequest(state);
    case types.GET_ALL_DOMAINS_SUCCESS:
      return updateGetAllDomainsSuccessState(state, action);
    case types.GET_ALL_DOMAINS_FAILED:
      return updateGetAllDomainsFailedState(state, action);
    default:
      return state;
  }
};

export default getAllDomainsReducer;
