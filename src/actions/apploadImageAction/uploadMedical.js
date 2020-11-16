/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';

const uploadMedRecSuccess = (payload) => ({
  type: types.UPLOAD_MEDICAL_SUCCESS,
  payload,
});

const uploadMedRecFailed = (payload) => ({
  type: types.UPLOAD_MEDICAL_FAILED,
  payload,
});

const startMedicalRecUpload = () => ({
  type: 'START_UPLOAD_MEDICAL_RECORD',
});

export const uploadMedicRecord = (image) => (dispatch) => {
  dispatch(startMedicalRecUpload());
  return axios
    .post('https://api.cloudinary.com/v1_1/dy1bghrrm/image/upload', image)
    .then((res) => {
      dispatch(uploadMedRecSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(uploadMedRecFailed(err));
    });
};

export const uploadMedicRecordPdf = (image) => (dispatch) => {
        dispatch(startMedicalRecUpload());
        return axios
            .post(
              'https://api.cloudinary.com/v1_1/dy1bghrrm/image/upload',
              image
            )
            .then((res) => {
               dispatch(uploadMedRecSuccess(res.data));
              .post()
            })
            .catch((err) => {
              console.log(err);
              dispatch(uploadMedRecFailed(err));
            });
        };
