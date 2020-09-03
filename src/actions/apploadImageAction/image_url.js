import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';

const uploadLogoSuccess = (payload) => ({
    type: types.UPLOAD_LOGO_SUCCESS,
    payload,
});

const uploadLogoFailed = (payload) => ({
    type: types.UPLOAD_LOGO_FAILED,
    payload,
});

const startImageUpload = () => ({
    type: 'START_LOGO_UPLOAD',
});

const logoUpload = (image) => (dispatch) => {
    dispatch(startImageUpload());
    return axios
        .post('https://api.cloudinary.com/v1_1/dy1bghrrm/image/upload', image)
        .then((res) => {
            dispatch(uploadLogoSuccess(res.data));
        })
        .catch((err) => {
            console.log(err);
            dispatch(uploadLogoFailed(err));
        });
};
export default logoUpload;