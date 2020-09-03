import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';

export const initialState = {
    facilities: [],
    isLoading: false,
    response: null,
    success: null,
    errorMessage: null,
}
const updateCreateFacilitySuccessState = (state, action) => {
   
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: true,
  };
};

const updateCreateSuperUserSuccessState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: true,
  };
};

const updateCreateSuperUserFailedState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: false,
  };
};
const updateCreateFacilityFailedState = (state, action) =>
  updateObject(state, {
    success: false,
    isLoading: false,
    response: action.payload,
    errorMessage: action.payload.response.data.message,
  });

const updateGetAllFacilitiesSuccessState = (state, action) => {
    return {
      ...state,
      facilities: [...action.payload],
      isLoading: false,
      response: action.payload,
      success: true,
    };
};

const updateGetAllFacilitiesFailedState = (state, action) => {
  return {
    ...state,
    success: false,
    isLoading: false,
    response: action.payload,
    errorMessage: action.payload.response.data.message,
  };
};

const StartRequest = (state) => {
    return {
        ...state,
        isLoading: true,
        errorMessage: null,
        success: false


    }
}
const facilityReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'START_CREATE_FACILITY':
        return StartRequest(state);
      case types.GET_ALL_FACILITIES_FAILED:
        return updateGetAllFacilitiesFailedState(state, action);
      case types.GET_ALL_FACILITIES_SUCCESS:
        return updateGetAllFacilitiesSuccessState(state, action);
      case types.CREATE_FACILITY_SUCCESS:
        return updateCreateFacilitySuccessState(state, action);
      case types.CREATE_FACILITY_FAILED:
        return updateCreateFacilityFailedState(state, action);
      case types.CREATE_SUPER_USER_SUCCESS:
        return updateCreateSuperUserSuccessState(state, action)
      case types.CREATE_SUPER_USER_FAILED:
        return updateCreateSuperUserFailedState(state, action);
      default:
        return state;
    }
};

export default facilityReducer;

