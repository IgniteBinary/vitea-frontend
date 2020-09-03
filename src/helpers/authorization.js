import jwtDecode from 'jwt-decode';

/**
 * @description - get user from a token
 * @returns {object} - return user details
 */

const decodeToken = () => {
  const token = localStorage.getItem('facility_token');
  const currentTime = Date.now();
  const tokenInfo = jwtDecode(token);
  console.log(currentTime > tokenInfo.exp * 1000)

  try {
    const tokenInfo = jwtDecode(token);
    // if (Date.now() >= tokenInfo.exp * 1000) {
      //return false;
    // }
    return true;
  } catch (err) {
    return false;
  }
};

export default decodeToken;