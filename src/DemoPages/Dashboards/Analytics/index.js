import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import UsersTable from './usersTable'

import FormModal  from '../../Modal/formModal';

import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import getALLStores from '../../../actions/stores/getAllStoresAction';
import getALLUsers from '../../../actions/users/getAllUsersAction';
import deactivateUser from '../../../actions/users/deactivateUser';
import activateUser from '../../../actions/users/activateUser';
import CheckUser from '../../../helpers/authorization';
import {toast} from  'react-toastify';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
export class AnalyticsDashboard extends Component {
         state = {
           modal: false,
           users: this.props.Users.users,
           steps: [
             {
               selector: '[data-tut="user_details"]',

               content: () => (
                 <div>
                   <h3>Dashboard</h3>
                   <p>
                     Get real-time updates on the performance of your employees
                     managing different stores. Click on 'create user' to add a
                     new user and fill in their details.
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

           const tut = localStorage.getItem('list_users_tut');
           if (tut && tut === 'off') {
             this.closeTour();
           }

           localStorage.setItem('list_users_tut', 'off');
           this.props.getUsers();
         }

         deactivateUser = (user) => async () => {
           await this.props.deactivateUser(user);
         };

         activateUser = (user) => async () => {
           await this.props.activateUser(user);
         };

         newUsers = () => this.state.users.reverse();

         disableBody = (target) => disableBodyScroll(target);
         enableBody = (target) => enableBodyScroll(target);

         closeTour = () => {
           this.setState({ isTourOpen: false });
         };

         openTour = () => {
           this.setState({ isTourOpen: true });
         };

         render() {
           const data = this.props.Users.users;
          //  const activeUsers = data.filter((user) => user.status === 'ACTIVE');
          //  const inActiveUsers = data.filter(
          //    (user) => user.status === 'INACTIVE'
          //  );
           const accentColor = '#007bff';
           return (
             <Fragment>
               <FormModal modal={this.state.modal} toggle={this.toggle} />
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
                   useCase='Add Doctor'
                   modal={this.state.modal}
                   heading='Doctor management'
                   subheading='Doctors'
                   icon='pe-7s-users icon-gradient bg-mean-fruit'
                 />
                 <Tabs
                   defaultActiveKey='1'
                   renderTabBar={() => <ScrollableInkTabBar />}
                   renderTabContent={() => <TabContent />}
                 >
                   <TabPane tab='Active' key='1'>
                     <UsersTable
                       data={data}
                       deactivateUser={this.deactivateUser}
                       activateUser={this.activateUser}
                     />
                   </TabPane>
                   <TabPane tab='Newly Created' key='2'>
                     <UsersTable
                       data={this.newUsers()}
                       deactivateUser={this.deactivateUser}
                       activateUser={this.activateUser}
                     />
                   </TabPane>
                   <TabPane tab='Deactivated' key='3'>
                     <UsersTable
                       data={data}
                       deactivateUser={this.deactivateUser}
                       activateUser={this.activateUser}
                     />
                   </TabPane>
                   <TabPane tab='Inactive' key='4'>
                     <UsersTable
                       data={data}
                       deactivateUser={this.deactivateUser}
                       activateUser={this.activateUser}
                     />
                   </TabPane>
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

export  const mapDispatchToProps = dispatch => (
   {
       getStores : () => dispatch(getALLStores()),
       getUsers : () => dispatch(getALLUsers()),
       deactivateUser: user => dispatch(deactivateUser(user)),
       activateUser: user => dispatch(activateUser(user))
   }
)

export const mapStateToProps =  state => (
    {
        ...state
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsDashboard)