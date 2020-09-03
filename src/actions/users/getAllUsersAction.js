/* eslint-disable camelcase */
import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';


const getAllUsersSuccess = payload => ({
    type: types.GET_ALL_USERS_SUCCESS,
    payload,
});

const getAllUsersFailed = payload => ({
    type: types.GET_ALL_USERS_FAILED,
    payload,
})


const getALLUsers = () => (dispatch) => {
    dispatch(apiRequest());
    const { facility_id } = JSON.parse(localStorage.getItem('user'));
    const facility_token = localStorage.getItem('facility_token')
    return axios.get(`http://vitea.azurewebsites.net/facilities/doctors/${facility_id}`, {
        headers: {
            'Authorization': `Bearer ${facility_token}`,
            'Access-Control-Allow-Origin': true,
            'Content-Type': 'application/json'
        },
    })
        .then((res) => {
            dispatch(getAllUsersSuccess(res.data));
            localStorage.setItem('users', JSON.stringify(res.data))
        })
        .catch((err) => {
            console.log(err)
            toast.error(err.response.data.message);
            dispatch(getAllUsersFailed(err));
        });

}

export default getALLUsers
