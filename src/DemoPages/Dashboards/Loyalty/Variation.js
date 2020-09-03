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
    const { orders } = this.props.Orders;
    console.log(orders);
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
          <Row>
            <Col md='3' lg='4'>
              <Card className='widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-primary border-primary'>
                <div className='widget-chat-wrapper-outer'>
                  <div className='widget-chart-content'>
                    <div className='widget-title opacity-5 text-uppercase'>
                      Total Points Earned
                    </div>
                    <div className='widget-numbers mt-2 fsize-4 mb-0 w-100'>
                      <div className='widget-chart-flex align-items-center'>
                        <div>
                          <span className='opacity-10 text-success pr-2'>
                            <FontAwesomeIcon icon={faAngleUp} />
                          </span>
                          0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md='3' lg='4'>
              <Card className='widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-danger border-danger'>
                <div className='widget-chat-wrapper-outer'>
                  <div className='widget-chart-content'>
                    <div className='widget-title opacity-5 text-uppercase'>
                      Order Conversion
                    </div>
                    <div className='widget-numbers mt-2 fsize-4 mb-0 w-100'>
                      <div className='widget-chart-flex align-items-center'>
                        <div>
                          <span className='opacity-10 text-danger pr-2'>
                            <FontAwesomeIcon icon={faAngleDown} />
                          </span>
                          0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md='12' lg='4'>
              <Card className='widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-primary border-primary'>
                <div className='widget-chat-wrapper-outer'>
                  <div className='widget-chart-content'>
                    <div className='widget-title opacity-5 text-uppercase'>
                      Redemmed Points
                    </div>
                    <div className='widget-numbers mt-2 fsize-4 mb-0 w-100'>
                      <div className='widget-chart-flex align-items-center'>
                        <div>
                          <span className='opacity-10 text-success pr-2'>
                            <FontAwesomeIcon icon={faAngleUp} />
                          </span>
                          0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Card className='main-card mb-3'>
            <CardHeader>
              <div className='card-header-title font-size-lg text-capitalize font-weight-normal'>Loyalty Summary</div>
            </CardHeader>

            <OrdersTable data={data} />
          </Card>
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
