import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment'
import * as types from '../action_types';

const createSuperAdminSuccess = (payload) => ({
  type: types.CREATE_SUPER_USER_SUCCESS,
  payload,
});

const createSuperAdminFailed = (payload) => ({
  type: types.CREATE_SUPER_USER_FAILED,
  payload,
});

const startCreateSuperAdmin = () => ({
  type: 'START_CREATE_FACILITY',
});

const createSuperAdmin = (superAdmin) => (dispatch) => {
  const { id } = JSON.parse(localStorage.getItem('facility'))
  const formatDob = moment(superAdmin.dob).format("YYYY-MM-DD")
  superAdmin.dob = formatDob
  dispatch(startCreateSuperAdmin());
  return axios
    .post(
     `http://vitea.azurewebsites.net/facilities/${id}`,
      superAdmin
    )
    .then((res) => {
      toast.success('Super Admin added successfully');
      // localStorage.setItem('token', res.data.token);
      console.log(res.data);
      dispatch(createSuperAdminSuccess(res.data));
    })
    .catch((err) => {
      console.log(err.response);
      toast.error(err.response.data && err.response.data.message);
      dispatch(createSuperAdminFailed(err));
    });
};

export default createSuperAdmin;
