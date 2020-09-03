import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';

export const initialState = {
    isLoading: false,
    response: null,
    loginError: null,
    success: null,
    errorMessage: null,
}

const apiRequestStartState =  {isLoading: true};

/**
 * @description - Dispatches when login is successful
 * @param {object} state
 * @param {object} action
 * @returns {object} - An updated state
 */
const updateLoginSuccessState = (state, action) => ({
    ...state,
    isLoading: false,
    response: action.payload,
    success: true,
});

/**
 * @description - Dispatches when login fails
 * @param {object} state
 * @param {object} action
 * @returns {object} - An updated state
 */
const updateLoginFailedState = (state, action) => ({
  ...state,
  isLoading: false,
  loginError: true,
  response: action.payload,
  errorMessage: action.payload.response.data.message,
});

const loginReducer =  (state = initialState, action) => {
    switch (action.type) {
        case 'START_LOGIN':
            return updateObject(initialState, apiRequestStartState);
        case types.USER_LOGIN_FAIL:
            return updateLoginFailedState(state, action);
        case types.USER_LOGIN_SUCCESS:
            return updateLoginSuccessState(state, action);
        default:
            return state;
    }
};

export default loginReducer;