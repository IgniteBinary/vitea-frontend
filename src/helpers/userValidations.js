/* eslint-disable no-unused-expressions */
import helpers from './index';

/**
 * @description - Validation to signup user
 * @param {*} data
 * @param {*} state
 * @returns {object} - Error object
 */

const validation = (data, state) => {
  const error = { ...state };
  switch (data.type) {
    case 'email':
      !helpers.isEmailValid(data.content)
        ? (error.email = true)
        : delete error.email;
      break;
    case 'password':
      !helpers.isPasswordValid(data.content)
        ? (error.password = true)
        : delete error.firstName;
      break;
    case 'first_name':
      !helpers.isNameValid(data.content)
        ? (error.firstName = true)
        : delete error.firstName;
      break;
    case 'last_name':
      !helpers.isNameValid(data.content)
        ? (error.lastName = true)
        : delete error.lastName;
      break;

    case 'msisdn':
      !helpers.isPhoneValid(data.content)
        ? (error.phoneNumber = true)
        : delete error.phoneNumber;
      break;

    case 'national_id':
      !helpers.isIdValid(data.content)
        ? (error.nationalId = true)
        : delete error.nationalId;
      break;

    case 'handle':
      !helpers.isNameValid(data.content)
        ? (error.handle = true)
        : delete error.handle;
      break;

    default:
      return error;
  }
  return error;
};

export default validation;
