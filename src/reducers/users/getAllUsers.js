import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';

export const initialState = {
    users: [],
    isLoading: false,
    response: null,
    getUserError: null,
    success: null,
    errorMessage: null,
}

const deactivateUserSuccessState = (state, action) => {
  return {
    ...state,
    users: state.users.map(
        (content, i) => content._id === action.payload.id ? { ...content, status: 'INACTIVE'} : content
    ),
    isLoading: false,
    response: action.payload,
    success: true,
  };
};

const activateUserSuccessState = (state, action) => {
  return {
    ...state,
    users: state.users.map((content, i) =>
      content._id === action.payload.id ? { ...content, status: 'ACTIVE' } : content
    ),
    isLoading: false,
    response: action.payload,
    success: true,
  };
};

const deactivateUserFailedState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: false,
  };
};

const updateGetUsersSuccessState = (state, action) => updateObject(state, {
    isLoading: false,
    users: action.payload.doctors,
    success: true,
});

const updateGetUsersFailedState = (state, action) => updateObject(state, {
    isLoading: false,
    getUserError: true,
    response: action.payload
});

const updateCreateUserSuccessState = (state, action) => {
   
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    success: true,
  };
};

const updateCreateUserFailedState = (state, action) =>
  updateObject(state, {
    isLoading: false,
    createUserError: true,
    response: action.payload
  });

const startCreateUser = (state) => {
    return {
      ...state,
      isLoading: true,
      success: false,
      createUserError: false,
      errorMessage: null,
    };
}
  


const usersReducer = (state = initialState , action) => {
    switch (action.type) {
      case 'START_CREATE_USER':
        return startCreateUser(state);
      case types.GET_ALL_USERS_FAILED:
        return updateGetUsersFailedState(state, action);
      case types.DEACTIVATE_USER_FAILED:
        return deactivateUserFailedState(state, action);
      case types.DEACTIVATE_USER_SUCCESS:
        return deactivateUserSuccessState(state, action);
      case types.ACTIVATE_USER_SUCCESS:
        return activateUserSuccessState(state, action);
      case types.GET_ALL_USERS_SUCCESS:
        return updateGetUsersSuccessState(state, action);
      case types.CREATE_USER_SUCCESS:
        return updateCreateUserSuccessState(state, action);
      case types.CREATE_USER_FAILED:
        return updateCreateUserFailedState(state, action);

      default:
        return state;
    }
};

export default usersReducer;