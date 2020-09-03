import React, {Component, Fragment} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import PageTitleAlt3 from '../../../Layout/AppMain/PageTitleAlt3';
import getALLStores from '../../../actions/stores/getAllStoresAction';
import getALLUsers from '../../../actions/users/getAllUsersAction';
import getAllOrders from '../../../actions/orders/getAllOrdersAction'
import SearchBox from '../../SearchBox';
import matchSorter from 'match-sorter';
import data from './dummy';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import PageTitle from '../../../Layout/AppMain/PageTitle';

import {
    Row, Col,
    CardHeader,
    Card
} from 'reactstrap';



import {
    faAngleUp,
    faAngleDown,
   
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import OrdersTable from './orders';

class MinimalDashboard1 extends Component {
  
  render() {
    const { payments } = this.props.Payment;
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
            tag='Withdraw'
            useCase='Withdraw'
            heading='Payments'
            subheading='Payments account'
            icon='pe-7s-cash icon-gradient bg-happy-fisher'
            rightIcon='pe-7s-wallet'
            //toggle={this.addNewProduct}
          />
          {
            <Tabs
              defaultActiveKey='1'
              renderTabBar={() => <ScrollableInkTabBar />}
              renderTabContent={() => <TabContent />}
            >
              <TabPane tab='All Payments' key='1'>
                <Card className='main-card mb-3'>
                  <CardHeader>
                    <div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
                      Payments
                    </div>
                  </CardHeader>
                  <OrdersTable data={this.props.data} />
                </Card>
              </TabPane>
              <TabPane tab='Withdrawal History' key='2'></TabPane>
              <TabPane tab='Sales Report' key='3'></TabPane>
              <TabPane tab='Finance Reports' key='4'></TabPane>
            </Tabs>
          }
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}


export const mapDispatchToProps = (dispatch) => ({
  getStores: () => dispatch(getALLStores()),
  getUsers: () => dispatch(getALLUsers()),
  getOrders: () => dispatch(getAllOrders()),
});

export const mapStateToProps = (state) => ({
  ...state,
});


export default connect(mapStateToProps, mapDispatchToProps)(MinimalDashboard1);
