import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';
import { updateTemplateExpression } from 'typescript';

export const initialState = {
    users: [],
    isLoading: false,
    response: null,
    createUserError: null,
    success: null,
    errorMessage: null,
}

const apiRequestStartState = {isLoading: false};


const updateCreateUserSuccessState = (state, action) => {
    
    return { 
        ...state,
        isLoading: false,
        response: action.payload,
        success: true,

    }
};

const updateCreateSuperUserSuccessState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: true,
  };
};

const updateCreateSuperUserFailedState = (state, action) =>
  updateObject(state, {
    isLoading: false,
    createUserError: true,
    response: action.payload,
    errorMessage: action.payload.response.data.message,
    success: false
  });

const updateCreateUserFailedState = (state, action) => updateObject(state, {
    isLoading: false,
    createUserError: true,
    response: action.payload,
    //errorMessage: action.payload.response.data.message,
});

const startCreateUser = (state, action) => updateObject(state, {
    isLoading: true,
    success: false,
    createUserError: false
})

const createUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATING_USER_START:
            return startCreateUser(initialState, action);
        case types.CREATE_USER_FAILED:
            return updateCreateUserFailedState(state, action);
        case types.CREATE_USER_SUCCESS:
            return updateCreateUserSuccessState(state, action);
        case types.CREATE_SUPER_USER_SUCCESS:
            return updateCreateSuperUserSuccessState(state, action);
        case types.CREATE_SUPER_USER_FAILED:
            return updateCreateSuperUserFailedState(state, action);
        default:
            return state;
    }
};

export default createUserReducer;