import React, { Component, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import PageTitleAlt3 from '../../../Layout/AppMain/PageTitleAlt3';

import Circle from 'react-circle';
import Chart from 'react-apexcharts';
import getALLStores from '../../../actions/stores/getAllStoresAction';
import getALLUsers from '../../../actions/users/getAllUsersAction';
import getAllOrders from '../../../actions/orders/getAllOrdersAction';

import bg1 from '../../../assets/utils/images/dropdown-header/abstract1.jpg';

import avatar1 from '../../../assets/utils/images/avatars/1.jpg';
import avatar2 from '../../../assets/utils/images/avatars/2.jpg';
import avatar3 from '../../../assets/utils/images/avatars/3.jpg';
import avatar4 from '../../../assets/utils/images/avatars/4.jpg';

import classnames from 'classnames';
import { data1, data2, data3, data4, data5, data6 } from './dummy';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import {
  Row,
  Col,
  Alert,
  Button,
  CardHeader,
  Table,
  ButtonGroup,
  Nav,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  Progress,
  Card,
  CardBody,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledButtonDropdown,
  CardFooter,
} from 'reactstrap';

import Column from './Examples/Column';
import Bar2 from './Examples/Bar';
import Area from './Examples/Area';
import Mixed from './Examples/Column';
import LineChart from './lineChart';
import Order from './orders';

class MinimalDashboard1 extends Component {
  constructor(props) {
    super(props);

    this.togglePop1 = this.togglePop1.bind(this);

    this.state = {
      steps: [
        {
          selector: '[data-tut="reports_details"]',
          content: () => (
            <div>
              <h3>Reports and analytics</h3>
              <p>
                Understand your customers and increase your revenue through
                Julla reports and analytics. Here you will get data on your
                returning customer rate, online store conversion rate, average
                order value and many more.
              </p>
            </div>
          ),
        },
      ],
      isTourOpen: true,
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    // this.props.getStores();
    // this.props.getUsers();
    // this.props.getOrders();

    const tut = localStorage.getItem('reports_tut');
    if (tut && tut === 'off') {
      this.closeTour();
    }

    localStorage.setItem('reports_tut', 'off');
  }

  togglePop1() {
    this.setState({
      popoverOpen1: !this.state.popoverOpen1,
    });
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  disableBody = (target) => disableBodyScroll(target);
  enableBody = (target) => enableBodyScroll(target);

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };

  render() {
    const { orders } = this.props.Orders;
    console.log(orders);
    const accentColor = '#007bff';
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
            {this.state.isTourOpen &&
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
            />}
            <Col sm='12' md='7' lg='6'>
              <Card className='mb-3'>
                <CardHeader className='card-header-tab'>
                  <div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
                    Total Sales
                  </div>
                </CardHeader>
                <CardBody className='pt-0'>
                  <LineChart data={data1} />
                </CardBody>
              </Card>
            </Col>
            <Col sm='12' md='7' lg='6'>
              <Card className='mb-3'>
                <CardHeader className='card-header-tab'>
                  <div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
                    Online Store Session
                  </div>
                </CardHeader>
                <CardBody className='pt-0'>
                  <LineChart data={data2} />
                </CardBody>
              </Card>
            </Col>

            {/* <Col  className='card ml-2'>
              <LineChart />
            </Col> */}
          </Row>
          <Row>
            <Col sm='12' md='7' lg='6'>
              <Card className='mb-3'>
                <CardHeader className='card-header-tab'>
                  <div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
                    Returning customer rate
                  </div>
                </CardHeader>
                <CardBody className='pt-0'>
                  <LineChart data={data3} />
                </CardBody>
              </Card>
            </Col>
            <Col sm='12' md='7' lg='6'>
              <Card className='mb-3'>
                <CardHeader className='card-header-tab'>
                  <div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
                    Online Store Conversion Rate
                  </div>
                </CardHeader>
                <CardBody className='pt-0'>
                  <LineChart data={data4} />
                </CardBody>
              </Card>
            </Col>

            {/* <Col  className='card ml-2'>
              <LineChart />
            </Col> */}
          </Row>
          <Row>
            <Col sm='12' md='7' lg='6'>
              <Card className='mb-3'>
                <CardHeader className='card-header-tab'>
                  <div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
                    Average order value
                  </div>
                </CardHeader>
                <CardBody className='pt-0'>
                  <LineChart data={data5} />
                </CardBody>
              </Card>
            </Col>
            <Col sm='12' md='7' lg='6'>
              <Card className='mb-3'>
                <CardHeader className='card-header-tab'>
                  <div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
                    Total Orders
                  </div>
                </CardHeader>
                <CardBody className='pt-0'>
                  <LineChart data={data6} />
                </CardBody>
              </Card>
            </Col>

            {/* <Col  className='card ml-2'>
              <LineChart />
            </Col> */}
          </Row>
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
