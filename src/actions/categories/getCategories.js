/* eslint-disable camelcase */
import axios from 'axios';
import { toast } from 'react-toastify';

import * as types from '../action_types';
import apiRequest from '../common_actions';


const getAllCategoriesSuccess = (payload) => ({
  type: types.GET_ALL_CATEGORIES_SUCCESS,
  payload,
});

const getAllCategoriesFailed = (payload) => ({
  type: types.GET_ALL_CATEGORIES_FAILED,
  payload,
});


const getALLCategories = () => (dispatch) => {
    dispatch(apiRequest());
    const { _id, merchant_id } = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token');
    return axios
      .get(
        'https://gateway.julla.co/products/v1/categories/',
        {
          headers: {
             'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': true,
            'Content-Type': 'application/json'
          },
        }
      )
      .then((res) => {
        dispatch(getAllCategoriesSuccess(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(getAllCategoriesFailed(err));
      });

}

export default getALLCategories;
