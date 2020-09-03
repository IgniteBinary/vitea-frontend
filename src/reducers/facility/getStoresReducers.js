import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';

export const initialState = {
    stores: [],
    isLoading: false,
    response: null,
    getUserError: null,
    success: null,
    errorMessage: null,
}
const updateCreateStoreSuccessState = (state, action) => {
   
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: true,
  };
};

const updateCreateStoreFailedState = (state, action) =>
  updateObject(state, {
    isLoading: false,
    createUserError: true,
    response: action.payload,
    errorMessage: action.payload.response.data.message,
  });

const updateGetAllStoresSuccessState = (state, action) => {
    return {
      ...state,
      stores: [...action.payload],
      isLoading: false,
      response: action.payload,
      success: true,
    };
};

const updateGetAllStoresFailedState = (state, action) => {
    return {
      ...state,
      isLoading: false,
      getAllStoresError: true,
      response: action.payload,
      errorMessage: action.payload.response.data.message,
    };
};

const StartRequest = (state) => {
    return {
        ...state,
        isLoading: true,
        errorMessage: null


    }
}
const getAllStoresReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.API_REQUEST:
            return StartRequest(state);
        case types.GET_ALL_STORES_FAILED:
            return updateGetAllStoresFailedState(state, action);
        case types.GET_ALL_STORES_SUCCESS:
            return updateGetAllStoresSuccessState(state, action);
        case types.CREATE_STORE_SUCCESS:
            return updateCreateStoreSuccessState(state, action);
        case types.CREATE_STORE_FAILED:
            return updateCreateStoreFailedState(state, action);

        default:
            return state;
    }
};

export default getAllStoresReducer;