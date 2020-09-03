import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import OdersTable from './odersTable';
import orders from './dummy';
import viewShipping from '../../../actions/shipping/getShipping';
import FormModal from '../../Modal/formModal';

import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import getALLStores from '../../../actions/stores/getAllStoresAction';
import getALLUsers from '../../../actions/users/getAllUsersAction';
import deactivateUser from '../../../actions/users/deactivateUser';
import activateUser from '../../../actions/users/activateUser';
import getAllOrders from '../../../actions/orders/getAllOrdersAction';
import {toast} from 'react-toastify';
import CheckUser from '../../../helpers/authorization';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import DetailsModal from './shippingDetails';

export class Logistics extends Component {
         state = {
           modal: false,
           users: this.props.Users.users,
           steps: [
             {
               selector: '[data-tut="dashboard_details"]',

               content: () => (
                 <div>
                   <h3>Shipping</h3>
                   <p>
                     Offer domestic and world wide shipping. Use the search
                     filter to locate the exact shipment and monitor the
                     shipping status of any product by looking at your shipping
                     status.
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

         trackOrder = () => {
           this.props.history.push('/dashboard/track-order');
         };

         handleViewDetails = (order_no) => async () => {
           await this.props.viewShipping(order_no);
           if (this.props.Shipping.success) {
             localStorage.setItem(
               'shipping',
               JSON.stringify(this.props.Shipping.response.message)
             );
             this.props.history.push('/dashboard/track-order');
           }
         };

         componentDidMount() {
           if (!CheckUser()) {
             toast.error('Your session has expired redirecting to Login');
             window.setTimeout(() => {
               window.location.href = '/';
             }, 4000);
           }

            const tut = localStorage.getItem('list_shipping_tut');
            if (tut && tut === 'off') {
              this.closeTour();
            }

            localStorage.setItem('list_shipping_tut', 'off');
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
             const user = await users.find(
               (userObj) => userObj._id === customer_id
             );
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
           const accentColor = '#007bff';
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
                   //useCase='Add Order'
                   modal={this.state.modal}
                   heading='Shipping Management'
                   subheading='Shipping'
                   icon='pe-7s-note2 icon-gradient bg-mean-fruit'
                 />

                 {this.state.isTourOpen && (
                   <Tour
                     steps={this.state.steps}
                     isOpen={this.state.isTourOpen}
                     onRequestClose={this.closeTour}
                     rounded={5}
                     accentColor={accentColor}
                     onAfterOpen={false}
                     onBeforeClose={this.enableBody}
                     showButtons={false}
                     showNumber={false}
                     //disableDotsNavigation={false}
                     className='tour'
                   />
                 )}

                 <Tabs
                   defaultActiveKey='1'
                   renderTabBar={() => <ScrollableInkTabBar />}
                   renderTabContent={() => <TabContent />}
                 >
                   <TabPane tab='All Orders' key='1'>
                     <OdersTable
                       getPrice={this.orderTotal}
                       data={data}
                       deactivateUser={this.trackOrder}
                       activateUser={this.activateUser}
                       handleViewDetails={this.handleViewDetails}
                     />
                   </TabPane>
                   {/* <TabPane tab='Open Orders' key='2'>
                     <OdersTable
                       getPrice={this.orderTotal}
                       data={openOrders}
                       deactivateUser={this.deactivateUser}
                       activateUser={this.activateUser}
                     />
                   </TabPane>
                   <TabPane tab='Unfulfilled' key='3'>
                     <OdersTable
                       getPrice={this.orderTotal}
                       data={openOrders}
                       deactivateUser={this.deactivateUser}
                       activateUser={this.activateUser}
                     />
                   </TabPane>
                   <TabPane tab='Unpaid' key='4'>
                     <OdersTable
                       getPrice={this.orderTotal}
                       data={unPaidOrders}
                       deactivateUser={this.deactivateUser}
                       activateUser={this.activateUser}
                     />
                   </TabPane> */}
                 </Tabs>
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
         viewShipping: (order_no) => dispatch(viewShipping(order_no)),
       });

export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Logistics);
