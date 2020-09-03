import ReactGA from 'react-ga';
import { nameShape } from 'react-transition-group/utils/PropTypes';

const currentUserId = JSON.parse(localStorage.getItem('user')).merchant.mechant_id;
const name = JSON.parse(localStorage).getItem('user').merchant.first_name
const trackingId = 'UA-143547257-1';

ReactGA.initialize(trackingId);

ReactGA.set({
  userId: currentUserId,
  user_name: name
});