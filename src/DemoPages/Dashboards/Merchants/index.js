import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import OdersTable from './odersTable';
import orders from './dummy';

import FormModal from '../../Modal/formModal';
import MerchantOnbording from './Variation1';

import {
  Col,
  Card,
  CardBody,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledButtonDropdown,
  CardFooter,
} from 'reactstrap';

import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

import ReactTable from 'react-table';
import avatar2 from '../../../assets/utils/images/avatars/2.jpg';
// Examples
import AnalyticsDashboard1 from './Examples/Variation1';
import AnalyticsDashboard2 from './Examples/Variation2';
import getALLStores from '../../../actions/stores/getAllStoresAction';
import getALLUsers from '../../../actions/users/getAllUsersAction';
import deactivateUser from '../../../actions/users/deactivateUser';
import activateUser from '../../../actions/users/activateUser';
import getAllOrders from '../../../actions/orders/getAllOrdersAction';
import {toast} from 'react-toastify';
import CheckUser from '../../../helpers/authorization';
export class Logistics extends Component {
  state = {
    modal: false,
    users: this.props.Users.users,
  };

  toggle = () =>
    this.setState({
      modal: !this.state.modal,
    });

  trackOrder = () => {
    this.props.history.push('/dashboard/track-order');
  };

  componentDidMount() {
    if (!CheckUser()) {
      toast.error('Your session has expired redirecting to Login');
      window.setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    }
    this.props.getAllOrders();
    this.props.getUsers();
  }

  //This will have perfomance issues instead just return the user object
  //With the order payload i.e attach user object to repec' payload
  prepareOrdersData = async () => {
    let { orders } = this.props.Orders;
    const { users } = this.props.Users;

    for (let i = 0; i < orders.length; i++) {
      let customer_id = orders[i].customer_id;
      const user = await users.find((userObj) => userObj._id === customer_id);
      orders[i].customer_data = user;
    }

    return orders;
  };

  deactivateUser = (user) => async () => {
    await this.props.deactivateUser(user);
  };

  activateUser = (user) => async () => {
    await this.props.activateUser(user);
  };

  orderTotal = (products) => {
    // const total = products.reduce((a,b) => ({price: a.price + b.price}))
    let totalPrice = 0;
    products.map((product) => {
      product.price ? (totalPrice += product.price) : (totalPrice += 0);
    });
    // return total
    return totalPrice;
  };

  newUsers = () => this.state.users.reverse();

  render() {
    const { orders } = this.props.Orders;
    const data = orders;
    const openOrders = data.filter(
      (order) =>
        order.payment === 'Pending' ||
        order.payment === 'Unpaid' ||
        !order.payment
    );
    const unPaidOrders = data.filter(
      (order) => order.payment === 'Unpaid' || !order.payment
    );
    return (
      <Fragment>
        <FormModal modal={this.state.modal} toggle={this.toggle} />
        <CSSTransitionGroup
          component='div'
          transitionName='TabsAnimation'
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <PageTitle
            toggle={this.toggle}
            useCase={false}
            modal={this.state.modal}
            heading='Merchant Self Onboarding'
            subheading='Merchants'
            icon='pe-7s-note2 icon-gradient bg-mean-fruit'
          />

          <MerchantOnbording/>
      
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getStores: () => dispatch(getALLStores()),
  getUsers: () => dispatch(getALLUsers()),
  deactivateUser: (user) => dispatch(deactivateUser(user)),
  activateUser: (user) => dispatch(activateUser(user)),
  getAllOrders: () => dispatch(getAllOrders()),
});

export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Logistics);
