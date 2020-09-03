import React, { Component, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import Chart from 'react-apexcharts';
import getALLStores from '../../../actions/stores/getAllStoresAction';
import getALLUsers from '../../../actions/users/getAllUsersAction';
import getAllOrders from '../../../actions/orders/getAllOrdersAction';
import CheckUser from '../../../helpers/authorization';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import './style.scss';
import ResetPassword from './reset';
import { setCookie, getCookie, delCookie } from '../../../helpers/cookie';
import {
  Row,
  Col,
  Button,
  CardHeader,
  Progress,
  Card,
  CardBody,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledButtonDropdown,
} from 'reactstrap';

import LineChart from './lineChart';
import OrdersTable from './orders';
import { toast } from 'react-toastify';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import checkSubcriptionStatus from '../../../helpers/checkSuscriptionStatus';
import SubscriptionExpiredModal from '../../Components/subscription';

class MinimalDashboard1 extends Component {
  constructor(props) {
    super(props);

    this.togglePop1 = this.togglePop1.bind(this);

    this.state = {
      visible: true,
      popoverOpen1: false,
      modal: false,
      reset: false,

      optionsRadial: {
        chart: {
          height: 350,
          type: 'radialBar',
          toolbar: {
            show: true,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: '#fff',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: '#fff',
              strokeWidth: '67%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35,
              },
            },

            dataLabels: {
              showOn: 'always',
              name: {
                offsetY: -10,
                show: true,
                color: '#888',
                fontSize: '17px',
              },
              value: {
                formatter: function(val) {
                  return parseInt(val);
                },
                color: '#111',
                fontSize: '36px',
                show: true,
              },
            },
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#ABE5A1'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: 'round',
        },
        labels: ['Target'],
      },
      seriesRadial: [0],
      steps: [
        {
          selector: '[data-tut="dashboard_details"]',

          content: () => (
            <div>
              <h3>Dashboard</h3>
              <p>
                The Julla dashboard gives you a glimpse of the performance of
                your business all in one page. From your total revenue, weekly
                set targets to your average order value among others.
              </p>
            </div>
          ),
        },
      ],
      isTourOpen: false,
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    if (!CheckUser()) {
      toast.error('Your session has expired redirecting to Login');
      window.setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    }

    checkSubcriptionStatus();
     
    if (checkSubcriptionStatus()==='Expired'){
      console.log(checkSubcriptionStatus());
      window.location.href = '/expired-sub';
    } ;

    const cookie = getCookie('dash_tut');
    const resetCokie = getCookie('reset');

    // if (!resetCokie) {
    //   this.setState({ reset: true });
    // }

    const tut = localStorage.getItem('dash_tut');

    if (tut && tut === 'off') {
      this.closeTour();
    }
    
    localStorage.setItem('dash_tut', 'off');


    this.props.getStores();
    this.props.getUsers();
    this.props.getOrders();
  }

  componentWillUnmount() {
    // setCookie('dash_tut', 'off', 2000000);
    // setCookie('reset', 'off', 100000000);
    console.log('Unmountoooooooooooo');
    //localStorage.setItem('dash_tut', 'off');
  }

  togglePop1() {
    this.setState({
      popoverOpen1: !this.state.popoverOpen1,
    });
  }

  toggleReset = () => {
    this.setState({
      reset: !this.state.reset,
    });
  };

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
    const data = this.props.Orders.orders;
     
    const accentColor = '#007bff';
    const cookie = getCookie('dash_tut');
    const isOpen = cookie === 'off' ? false : true;
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
          {/* <PageTitleAlt3
                        heading="Minimal Dashboards"
                        subheading="This is an example dashboard created using build-in elements and components."
                        icon="lnr-apartment opacity-6"
                    /> */}
          {/* <Alert className="mbg-3" color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                            <span className="pr-2">
                                <FontAwesomeIcon icon={faQuestionCircle}/>
                            </span>
                        This dashboard example was created using only the available elements and components, no additional SCSS was written!
                    </Alert> */}
          <Row>
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

            {/* <SubscriptionExpiredModal /> */}
            <ResetPassword modal={this.state.reset} toggle={this.toggleReset} />
            <Col md='3' sm='3'>
              <Card className='widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-primary border-primary'>
                <div className='widget-chat-wrapper-outer'>
                  <div className='widget-chart-content'>
                    <div className='widget-title opacity-5 text-uppercase'>
                      Total Orders
                    </div>
                    <div className='widget-numbers mt-2 fsize-4 mb-0 w-100'>
                      <div className='widget-chart-flex align-items-center'>
                        <div>
                          <span className='opacity-10 text-success pr-2'>
                            {/* <FontAwesomeIcon icon={faAngleUp} /> */}
                          </span>
                          0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md='3' sm='3'>
              <Card className='widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-danger border-danger'>
                <div className='widget-chat-wrapper-outer'>
                  <div className='widget-chart-content'>
                    <div className='widget-title opacity-5 text-uppercase'>
                      Products Sold Today
                    </div>
                    <div className='widget-numbers mt-2 fsize-4 mb-0 w-100'>
                      <div className='widget-chart-flex align-items-center'>
                        <div>
                          <span className='opacity-10 text-danger pr-2'>
                            {/* <FontAwesomeIcon icon={faAngleDown} /> */}
                          </span>
                          0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md='3' sm='3'>
              <Card className='widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-primary border-primary'>
                <div className='widget-chat-wrapper-outer'>
                  <div className='widget-chart-content'>
                    <div className='widget-title opacity-5 text-uppercase'>
                      Top Product
                    </div>
                    <div className='widget-numbers mt-2 fsize-4 mb-0 w-100'>
                      <div className='widget-chart-flex align-items-center'>
                        <div>
                          <span className='opacity-10 text-success pr-2'>
                            {/* <FontAwesomeIcon icon={faAngleUp} /> */}
                          </span>
                          0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md='3' sm='3'>
              <Card className='widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-primary border-primary'>
                <div className='widget-chat-wrapper-outer'>
                  <div className='widget-chart-content'>
                    <div className='widget-title opacity-5 text-uppercase'>
                      Total Revenue
                    </div>
                    <div className='widget-numbers mt-2 fsize-4 mb-0 w-100'>
                      <div className='widget-chart-flex align-items-center'>
                        <div>
                          <span className='opacity-10 text-success pr-2'>
                            {/* <FontAwesomeIcon icon={faAngleUp} /> */}
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
          <Row>
            <Col md='3' lg='4'>
              <Card className='widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-danger border-success'>
                <div className='widget-chat-wrapper-outer'>
                  <div className='widget-chart-content'>
                    <div className='widget-title opacity-5 text-uppercase'>
                      Average Order Value
                    </div>
                    <div className='widget-numbers mt-2 fsize-4 mb-0 w-100'>
                      <div className='widget-chart-flex align-items-center'>
                        <div>
                          <span className='opacity-10 text-success pr-2'>
                            {/* <FontAwesomeIcon icon={faAngleUp} /> */}
                          </span>
                          0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col sm='3' lg='4'>
              <Card className='widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-success border-success'>
                <div className='widget-chat-wrapper-outer'>
                  <div className='widget-chart-content'>
                    <div className='widget-title opacity-5 text-uppercase'>
                      Website Visits
                    </div>
                    <div className='widget-numbers mt-2 fsize-4 mb-0 w-100'>
                      <div className='widget-chart-flex align-items-center'>
                        <div>0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col sm='3' lg='4'>
              <Card className='widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-warning border-warning'>
                <div className='widget-chat-wrapper-outer'>
                  <div className='widget-chart-content'>
                    <div className='widget-title opacity-5 text-uppercase'>
                      Customers who bought today
                    </div>
                    <div className='widget-numbers mt-2 fsize-4 mb-0 w-100'>
                      <div className='widget-chart-flex align-items-center'>
                        <div>0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm='12' md='7' lg='8'>
              <Card className='mb-3'>
                <CardHeader className='card-header-tab'>
                  <div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
                    Sales Income
                  </div>

                  <div className='btn-actions-pane-right text-capitalize'>
                    <Button color='warning'>Actions</Button>
                  </div>
                </CardHeader>
                <CardBody className='pt-0'>
                  <LineChart />
                </CardBody>
              </Card>
            </Col>
            <Col sm='12' md='5' lg='4'>
              <Card className='mb-3'>
                <CardHeader className='card-header-tab'>
                  <div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
                    Weekly Income Target
                  </div>
                  <div className='btn-actions-pane-right text-capitalize actions-icon-btn'>
                    <UncontrolledButtonDropdown>
                      <DropdownToggle
                        className='btn-icon btn-icon-only'
                        color='link'
                      >
                        <i className='lnr-cog btn-icon-wrapper' />
                      </DropdownToggle>
                      <DropdownMenu
                        right
                        className='dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link'
                      >
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem>
                          <i className='dropdown-icon lnr-inbox'> </i>
                          <span>Menus</span>
                        </DropdownItem>
                        <DropdownItem>
                          <i className='dropdown-icon lnr-file-empty'> </i>
                          <span>Settings</span>
                        </DropdownItem>
                        <DropdownItem>
                          <i className='dropdown-icon lnr-book'> </i>
                          <span>Actions</span>
                        </DropdownItem>
                        <DropdownItem divider />
                        <div className='p-1 text-right'>
                          <Button
                            className='mr-2 btn-shadow btn-sm'
                            color='link'
                          >
                            View Details
                          </Button>
                          <Button
                            className='mr-2 btn-shadow btn-sm'
                            color='primary'
                          >
                            Action
                          </Button>
                        </div>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </div>
                </CardHeader>
                <CardBody className='p-0'>
                  <Chart
                    options={this.state.optionsRadial}
                    series={this.state.seriesRadial}
                    type='radialBar'
                    height={270}
                  />
                  <div className='widget-content pt-0 w-100'>
                    <div className='widget-content-outer'>
                      <div className='widget-content-wrapper'>
                        <div className='widget-content-left pr-2 fsize-1'>
                          <div className='widget-numbers mt-0 fsize-3 text-warning'>
                            0%
                          </div>
                        </div>
                        <div className='widget-content-right w-100'>
                          <Progress
                            className='progress-bar-xs'
                            color='warning'
                            value='780000'
                          />
                        </div>
                      </div>
                      <div className='widget-content-left fsize-1'>
                        <div className='text-muted opacity-6'>Achieved</div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Card className='main-card mb-3'>
            <CardHeader>
              <div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
                Summary Transactions
              </div>
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
