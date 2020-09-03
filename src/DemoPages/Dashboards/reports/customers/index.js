import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PageTitle from '../../../../Layout/AppMain/PageTitle';
import OdersTable from './odersTable';
import CheckUser from '../../../../helpers/authorization';
import { toast } from 'react-toastify';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

// Examples
import getAllOrders from '../../../../actions/orders/getAllOrdersAction';
// import OrderTable from './viewOrder';
// import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import getAllWithdrawals from '../../../../actions/withdrawals/allWithdrawal';

import {
  cleanData,
} from './utils';

export class AnalyticsDashboard extends Component {
  state = {
    modal: false,
    users: this.props.Users.users,
    order: [],
    steps: [
      {
        selector: '[data-tut="order"]',
        content: () => (
          <div>
            <h3>Orders</h3>
            <p>
              Manage orders on the go by keeping tabs on your open orders,
              unfulfilled orders, and unpaid orders placed in a simple format.
            </p>
          </div>
        ),
      },
    ],
    isTourOpen: true,
  };

  toggle = () =>
    this.setState({
      modal: !this.state.modal,
    });

  componentDidMount() {
    if (!CheckUser()) {
      toast.error('Your session has expired redirecting to Login');
      window.setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    }
    this.props.getAllOrders();
  }

  disableBody = (target) => disableBodyScroll(target);
  enableBody = (target) => enableBodyScroll(target);

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };

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

  orderTotal = (products) => {
    // const total = products.reduce((a,b) => ({price: a.price + b.price}))
    let totalPrice = 0;
    products.map((product) => {
      product.price ? (totalPrice += product.price) : (totalPrice += 0);
    });
    // return total
    return totalPrice;
  };

  checkPaymentStatus = (order) => {
    let status = 'Unpaid';
    let actualPay = 0;
    const totalPrice = this.orderTotal(order.products);
    if (order.payments && order.payments.length > 0) {
      order.payments.forEach((payment) => {
        actualPay += payment.amount;
      });

      if (actualPay >= totalPrice) {
        status = 'Paid';
      } else {
        status = 'Patial';
      }
    }

    return status;
  };

  newUsers = () => this.state.users.reverse();

  printOrder = (order_no) => async () => {
    const order = await this.props.Orders.orders.find(
      (x) => x.order_no === order_no
    );
    localStorage.setItem('orderData', JSON.stringify(order));
    this.setState({
      order: order,
    });

    window.location.href = '/dashboard/order-invoice';
  };

  render() {
    const { orders } = this.props.Orders;
    // console.log(returningCustomers(orders), 'yessss');
    // console.log(returningCustomersData(orders), 'check');
    const data = orders.filter((order) => {
      return this.checkPaymentStatus(order) === 'Paid';
    });
    // console.log(customersData(data), 'not check');
    // console.log(returningData(data), 'Clean data');
    
    const returningCustomers = cleanData(data, 'returning');
    const oneTime = cleanData(data, 'oneTime');
    const loyal = cleanData(data, 'loyal');
    console.log(cleanData(data), 'Cleanest data');
    console.log(this.state.order);
    return (
      <Fragment>
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
            //  useCase='Add Order'
            modal={this.state.modal}
            heading='Customers Report'
            subheading='Reports'
            icon='lnr-pie-chart icon-gradient bg-mean-fruit'
          />
          {
            <Tabs
              defaultActiveKey='1'
              renderTabBar={() => <ScrollableInkTabBar />}
              renderTabContent={() => <TabContent />}
            >
              <TabPane tab='Returning customers' key='1'>
                <OdersTable data={returningCustomers} />
              </TabPane>
              <TabPane tab='One time/order customers' key='2'>
                <OdersTable data={oneTime} />
              </TabPane>
              <TabPane tab='Loyal Customers' key='3'>
                <OdersTable
                  data={loyal}
                  //viewOrder={this.getOrder}
                />
              </TabPane>
              {/* <TabPane tab='Unpaid' key='4'>
                       <OdersTable
                         getPrice={this.orderTotal}
                         data={unfulfilledOrders}
                         viewOrder={this.getOrder}
                         activateUser={this.activateUser}
                         checkPaymentStatus={this.checkPaymentStatus}
                       />
                     </TabPane> */}
            </Tabs>
          }
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getAllOrders: () => dispatch(getAllOrders()),
});

export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsDashboard);
