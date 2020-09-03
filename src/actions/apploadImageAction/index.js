
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const uploadImageSuccess = (payload) => ({
    type: types.UPLOAD_IMAGE_SUCCESS,
    payload,
});

const uploadImageFailed = (payload) => ({
    type: types.UPLOAD_IMAGE_FAILED,
    payload,
});

const startImageUpload = () => ({
    type: 'START_IMAGE_UPLOAD',
});

const imageUpload = (image) => (dispatch) => {
    dispatch(startImageUpload());
    return axios
        .post('https://api.cloudinary.com/v1_1/dy1bghrrm/image/upload', image)
        .then((res) => {
            dispatch(uploadImageSuccess(res.data));
        })
        .catch((err) => {
            console.log(err);
            dispatch(uploadImageFailed(err));
        });
};
export default imageUpload;
