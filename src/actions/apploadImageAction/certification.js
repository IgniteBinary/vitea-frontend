
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const uploadCertSuccess = (payload) => ({
    type: types.UPLOAD_CERT_SUCCESS,
    payload,
});


const uploadCertFailed = (payload) => ({
    type: types.UPLOAD_CERT_FAILED,
    payload,
});

const startImageUpload = () => ({
    type: 'START_CERT_UPLOAD',
});

const certUpload = (image) => (dispatch) => {
    dispatch(startImageUpload());
    return axios
        .post('https://api.cloudinary.com/v1_1/dy1bghrrm/image/upload', image)
        .then((res) => {
            dispatch(uploadCertSuccess(res.data));
        })
        .catch((err) => {
            console.log(err);
            dispatch(uploadCertFailed(err));
        });
};
export default certUpload;
