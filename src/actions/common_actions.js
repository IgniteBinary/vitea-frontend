import * as actionTypes from './action_types';

const apiRequest = (status) => ({
    type: actionTypes.API_REQUEST,
    payload: status,
});

export default apiRequest;

const toggleCreateUserModal = (status) => (
    {
        type: actionTypes.TOGGLE_CREATE_USER_MODAL,
        payload: status

    }
)
