import ThemeOptions from './ThemeOptions';
import Login from './auth/login';
import Users from './users/getAllUsers';
import Stores from './stores/getStoresReducers';
import Geolocation from './geolocation/geolocation';
import Orders from './orders/getAllOrders';
import Categories from './categories/categories';
import Products from './products/products';
import Loyalty from './Loyalty/loyaltyReducers';
import Facility from './facility/facilityReducer';
import Payment from './payments/payments';
import ResetPassword from './passwordReset/password_reset';
import Shipping from './shipping/shipping';
import TrackShipping from './trackShiping/trackShipping';
import Subscription from './subscriptions/';
import Withdrawals from './withdrawals/allWithdrawals';
import Domains from './domains/domains';
import DNS from './switchedDomains/swithced';
import Image from './image/images';
import Certifications from './certifications/images';
import Logo from './logo/images';
export default {
  ThemeOptions,
  Login,
  Users,
  Stores,
  Geolocation,
  Orders,
  Categories,
  Products,
  Facility,
  Loyalty,
  Payment,
  ResetPassword,
  Shipping,
  TrackShipping,
  Subscription,
  Withdrawals,
  Domains,
  DNS,
  Image,
  Certifications,
  Logo
};
