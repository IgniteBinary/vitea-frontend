import React, { Component, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import LoyaltyDivider from './dividerModal';
import Validations from '../../../helpers/userValidations';
import LoyaltyTable from './Variation'
import getALLStores from '../../../actions/stores/getAllStoresAction';
import getALLUsers from '../../../actions/users/getAllUsersAction';
import getAllOrders from '../../../actions/orders/getAllOrdersAction';
import optinLoyalty from '../../../actions/loyalty/optinLoyalty';
import checkOptinStatus from '../../../actions/loyalty/isOptin';
import loyaltyReports from '../../../actions/loyalty/loyaltyReports';
import CheckUser from '../../../helpers/authorization'
import Background from '../../../assets/utils/images/loyalty_bg.png';


import {
  Row,
  Col,
  Button,
  CardTitle,
} from 'reactstrap';


import { ToastContainer, toast } from 'react-toastify';


class Loyalty extends Component {
  state = {
    visible: true,
    popoverOpen1: false,
    showModal: false,
    subscribed: false,
    divider: '',
    errors: {}
  };

  componentDidMount() {
    if (!CheckUser()) {
      toast.error('Your session has expired redirecting to Login');
      window.setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    }
    //console.log(this.props.Loyalty.isSubscribed, 'Here');
    this.props.checkOptin()
    this.props.getLoyaltyReports()
  }

  toggleShowModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  handleInputChange = (e) => {
    e.preventDefault();
    console.log(this.state.divider)
    this.setState({
      
        [e.target.name]: parseInt(e.target.value),
      },);
  };

  handleSubmit = async () => {
    await this.setState({
      subscribed: true,
    });
    await this.props.loyaltyOptin({divider: this.state.divider})

    if(this.props.Loyalty.success){
      this.toggleShowModal();
    }
  };

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    const { orders } = this.props.Orders;
    const { response, reports } = this.props.Loyalty;
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
          {response && response.status === "200" && <LoyaltyTable reports={reports} />}
          <LoyaltyDivider
            modal={this.state.showModal}
            toggle={this.toggleShowModal}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
          />
          <ToastContainer />
          {!response || response.status !== "200" && (
            <Row
              style={{
                background: '#fff',
              }}
            >
              <Col sm='6' md='6' lg='6'>
                <div className='mb-3'>
                  <div className='pt-0'>
                    <div
                      style={{
                        backgroundImage: 'url(' + Background + ')',
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        paddingTop: '50px',
                        height: '370px',
                      }}
                    ></div>
                  </div>
                </div>
              </Col>
              <Col sm='6' md='6' lg='6'>
                <div className='mb-3 mt-5'>
                  <div className='pt-0'>
                    <div
                      className='text-center'
                      style={{
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        paddingTop: '50px',
                        height: '370px',
                      }}
                    >
                      <CardTitle
                        className='mt-3'
                        style={{
                          mrginTop: '50px !important',
                        }}
                      >
                        Loyalty Management
                      </CardTitle>
                      <h6>
                        A happy customer is a loyal customer. Award your
                        customers redeemable points for shoping with you
                      </h6>
                      <Button
                        className='mb-2 mr-2 mt-3 pr-4 pl-4'
                        color={
                          !this.props.Loyalty.isSubscribed
                            ? 'success'
                            : 'danger'
                        }
                        //onClick={this.props.loyaltyOptin}
                        onClick={this.toggleShowModal}
                      >
                        <i className='lnr-gift btn-icon-wrapper'> </i>
                        {!this.props.Loyalty.isSubscribed
                          ? 'Opt in'
                          : 'Opt out'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getStores: () => dispatch(getALLStores()),
  getUsers: () => dispatch(getALLUsers()),
  getOrders: () => dispatch(getAllOrders()),
  loyaltyOptin: (divider) => dispatch(optinLoyalty(divider)),
  getLoyaltyReports: ()=> dispatch(loyaltyReports()),
  checkOptin: ()=> dispatch(checkOptinStatus())

});

export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Loyalty);
