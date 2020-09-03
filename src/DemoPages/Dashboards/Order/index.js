import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import OdersTable from './odersTable';
import FormModal from '../../Modal/formModal';
import CheckUser from '../../../helpers/authorization';
import { toast } from 'react-toastify';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

// Examples
import getALLStores from '../../../actions/stores/getAllStoresAction';
import getALLUsers from '../../../actions/users/getAllUsersAction';
import deactivateUser from '../../../actions/users/deactivateUser';
import activateUser from '../../../actions/users/activateUser';
import getAllOrders from '../../../actions/orders/getAllOrdersAction';
import editOrder from '../../../actions/orders/editOder';
import OrderTable from './viewOrder';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import {
  returningCustomers,
  returningCustomersData,
  customersData,returningData,
  cleanData

} from '../reports/customers/utils';

import {
  periodicSalesData,
  salesByPaymentsMethod,
} from '../reports/sales/utils';

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
    isTourOpen: false,
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
    this.props.getUsers();
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

  deactivateUser = (user) => async () => {
    await this.props.deactivateUser(user);
  };

  activateUser = (user) => async () => {
    await this.props.activateUser(user);
  };

  getOrder = (_id) => async () => {
    const order = await this.props.Orders.orders.find((x) => x._id === _id);
    console.log(order, 'Larry');

    this.setState({
      order: order,
      modal: !this.state.modal,
    });
  };

  handleEditSerialNo = (e) => {
    e.preventDefault();
    console.log('yess');
    const data = this.state.order.products;
    data[[e.target.name]].serial_no = e.target.value;
    this.setState({
      order: {
        ...this.state.order,
        products: data,
      },
    });

    console.log(this.state.order);
  };

  handleSubmitStatusChange = async (e) => {
    e.preventDefault();
    const data = {};
    const { order_no } = this.state.order;
    const { products } = this.state.order;

    data.products = products;
    data.order_no = order_no;
    data.status = 'fulfilled';

    await this.props.editOrder(data);

    if (this.props.Orders.success) {
      toast.success('Order marked fulfilled successfully');
      this.toggle();
    }
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
    console.log(returningCustomers(orders), 'yessss');
    console.log(returningCustomersData(orders), 'check')
    const data = orders.filter((order) => {
      return (
        this.checkPaymentStatus(order) === 'Paid' ||
        this.checkPaymentStatus(order) === 'Patial'
      );
    });
    console.log(customersData(data), 'not check');
    console.log(returningData(data), 'Clean data');
    console.log(periodicSalesData(data), 'Cleanest data now');
    console.log(periodicSalesData(data, {month: 'long'}), 'monthly data now');
    console.log(salesByPaymentsMethod(data), 'payment type data now');
    const fullfilled = data.filter((order) => order.status === 'fulfilled');
    const unfulfilledOrders = data.filter(
      (order) => order.status === 'unfulfilled'
    );
    const offlineOrders = data.filter(
      (order) => order.order_type === 'offline'
    );
    const onlineOrders = data.filter((order) => order.order_type === 'online');
    const accentColor = '#007bff';
    console.log(this.state.order);
    return (
      <Fragment>
        {/* <Tour
                 steps={this.state.steps}
                 isOpen={this.state.isTourOpen}
                 onRequestClose={this.closeTour}
                 rounded={5}
                 accentColor={accentColor}
                 onAfterOpen={this.disableBody}
                 onBeforeClose={this.enableBody}
                 showButtons={false}
                 showNumber={false}
                 //disableDotsNavigation={false}
                 className='tour'
               /> */}
        <OrderTable
          modal={this.state.modal}
          isLoading={this.props.Orders.isLoading}
          toggle={this.getOrder}
          data={this.state.order}
          cancelModal={this.toggle}
          checkPaymentStatus={this.checkPaymentStatus}
          editSerialNo={this.handleEditSerialNo}
          handleSubmit={this.handleSubmitStatusChange}
        />
        {/* <FormModal modal={this.state.modal} toggle={this.toggle} /> */}
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
            heading='Order Management'
            subheading='Orders'
            icon='pe-7s-note2 icon-gradient bg-mean-fruit'
          />
          {
            <Tabs
              defaultActiveKey='1'
              renderTabBar={() => <ScrollableInkTabBar />}
              renderTabContent={() => <TabContent />}
            >
              <TabPane tab='All Orders' key='1'>
                <OdersTable
                  getPrice={this.orderTotal}
                  data={data}
                  viewOrder={this.getOrder}
                  activateUser={this.activateUser}
                  checkPaymentStatus={this.checkPaymentStatus}
                />
              </TabPane>
              <TabPane tab='Unfulfilled Orders' key='2'>
                <OdersTable
                  getPrice={this.orderTotal}
                  data={unfulfilledOrders}
                  viewOrder={this.getOrder}
                  activateUser={this.activateUser}
                  checkPaymentStatus={this.checkPaymentStatus}
                />
              </TabPane>
              <TabPane tab='Fulfilled orders' key='3'>
                <OdersTable
                  getPrice={this.orderTotal}
                  data={fullfilled}
                  //viewOrder={this.getOrder}
                  activateUser={this.activateUser}
                  checkPaymentStatus={this.checkPaymentStatus}
                  printOrder={this.printOrder}
                />
              </TabPane>
              <TabPane tab='Offline orders' key='4'>
                <OdersTable
                  getPrice={this.orderTotal}
                  data={offlineOrders}
                  //viewOrder={this.getOrder}
                  printOrder={this.printOrder}
                  activateUser={this.activateUser}
                  checkPaymentStatus={this.checkPaymentStatus}
                />
              </TabPane>

              <TabPane tab='Online orders' key='5'>
                <OdersTable
                  getPrice={this.orderTotal}
                  data={onlineOrders}
                  viewOrder={this.getOrder}
                  activateUser={this.activateUser}
                  checkPaymentStatus={this.checkPaymentStatus}
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

          {/* 
                 <Col md='12'>
                   <Card className='main-card mb-3'>
                     <CardBody>
                       <ReactTable
                         data={data}
                         columns={[
                           {
                             columns: [
                               {
                                 Header: 'Name',
                                 accessor: 'first_name',
                                 Cell: (row) => (
                                   <div>
                                     <div className='widget-content p-0'>
                                       <div className='widget-content-wrapper'>
                                         <div className='widget-content-left mr-3'></div>
                                         <div className='widget-content-left flex2'>
                                           <div className='widget-heading'>
                                             {row.value}
                                           </div>
                                         </div>
                                       </div>
                                     </div>
                                   </div>
                                 ),
                               },
                               {
                                 Header: 'Username',
                                 accessor: 'last_name',
                               },
                               {
                                 Header: 'Email',
                                 accessor: 'email',
                                 minWidth: 200,
                               },
                               {
                                 Header: 'Phone Number',
                                 accessor: 'msisdn',
                               },
                               {
                                 Header: 'Status',
                                 accessor: 'status',
                               },
                             ],
                           },
                           {
                             columns: [
                               {
                                 Header: 'Actions',
                                 accessor: '_id',
                                 Cell: (row) => (
                                   <div className='d-block w-100 text-center'>
                                     <UncontrolledButtonDropdown>
                                       <DropdownToggle
                                         caret
                                         className='btn-icon btn-icon-only btn btn-link'
                                         color='link'
                                       >
                                         <i className='lnr-menu-circle btn-icon-wrapper' />
                                       </DropdownToggle>
                                       <DropdownMenu className='rm-pointers dropdown-menu-hover-link'>
                                         <DropdownItem header>
                                           Manage users
                                         </DropdownItem>
                                         <DropdownItem>
                                           <i className='dropdown-icon lnr-inbox'>
                                             {' '}
                                           </i>
                                           <span
                                             onClick={this.deactivateUser({
                                               staff_id: row.value,
                                             })}
                                           >
                                             Deactivate user
                                           </span>
                                         </DropdownItem>
                                         <DropdownItem>
                                           <i className='dropdown-icon lnr-file-empty'>
                                             {' '}
                                           </i>
                                           <span
                                             onClick={this.activateUser({
                                               staff_id: row.value,
                                             })}
                                           >
                                             Activate User
                                           </span>
                                         </DropdownItem>
                                         <DropdownItem>
                                           <i className='dropdown-icon lnr-book'>
                                             {' '}
                                           </i>
                                           <span>Actions</span>
                                         </DropdownItem>
                                         <DropdownItem divider />
                                         <DropdownItem>
                                           <i className='dropdown-icon lnr-picture'>
                                             {' '}
                                           </i>
                                           <span>Dividers</span>
                                         </DropdownItem>
                                       </DropdownMenu>
                                     </UncontrolledButtonDropdown>
                                   </div>
                                 ),
                               },
                             ],
                           },
                         ]}
                         defaultPageSize={10}
                         className='-striped'
                       />
                     </CardBody>
                   </Card>
                 </Col> */}
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
  editOrder: (data) => dispatch(editOrder(data)),
});

export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsDashboard);
