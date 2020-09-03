import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';

export const initialState = {
  categories: [],
  isLoading: false,
  response: null,
  getCategoriesError: null,
  success: null,
  errorMessage: null,
};


const updateGetAllCategoriesSuccessState = (state, action) => {
  return {
    ...state,
    categories: [...action.payload],
    isLoading: false,
    response: action.payload,
    success: true,
  };
};

const updateGetAllCategoriesFailedState = (state, action) => {
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
    errorMessage: null,
  };
};
const getAllCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.API_REQUEST:
      return StartRequest(state);
    case types.GET_ALL_CATEGORIES_FAILED:
      return updateGetAllCategoriesFailedState(state, action);
    case types.GET_ALL_CATEGORIES_SUCCESS:
      return updateGetAllCategoriesSuccessState(state, action);
    default:
      return state;
  }
};

export default getAllCategoriesReducer;
