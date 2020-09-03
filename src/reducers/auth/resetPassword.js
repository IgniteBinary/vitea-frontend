import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';

export const initialState = {
    isLoading: false,
    response: null,
    resetError: null,
    success: null,
    resetErrorMessage: null,
}

const apiRequestStartState = { isLoading: true };

/**
 * @description - Dispatches when reset password is successful
 * @param {object} state
 * @param {object} action
 * @returns {object} - An updated state
 */
const resetPasswordSuccessState = (state, action) => updateObject(state, {
    isLoading: false,
    resetError: false,
    response: action.payload,
    success: true,
});

/**
 * @description - Dispatches when reset password fails
 * @param {object} state
 * @param {object} action
 * @returns {object} - An updated state
 */
const resetPasswordFailedState = (state, action) => updateObject(state, {
    isLoading: false,
    resetError: true,
    response: action.payload,
    resetErrorMessage: action.payload.response.data.message,
});

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.API_REQUEST:
            return updateObject(initialState, apiRequestStartState);
        case types.USER_LOGIN_FAIL:
            return resetPasswordFailedState(state, action);
        case types.USER_LOGIN_SUCCESS:
            return resetPasswordSuccessState(state, action);
        default:
            return state;
    }
};

export default loginReducer;