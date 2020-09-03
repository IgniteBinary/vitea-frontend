/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';


const toggleCreateUserModal = () => ({
  type: types.TOGGLE_CREATE_USER_MODAL,
  payload: {
      showModal: true
  },
});


export default toggleCreateUserModal;
