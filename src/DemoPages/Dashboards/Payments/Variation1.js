import React, { Component, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import LoyaltyDivider from './dividerModal';
import Validations from '../../../helpers/userValidations';
import LoyaltyTable from './Variation';
import getALLStores from '../../../actions/stores/getAllStoresAction';
import getALLUsers from '../../../actions/users/getAllUsersAction';
import getAllOrders from '../../../actions/orders/getAllOrdersAction';
import optinLoyalty from '../../../actions/loyalty/optinLoyalty';
import checkOptinStatus from '../../../actions/loyalty/isOptin';
import loyaltyReports from '../../../actions/loyalty/loyaltyReports';
import CheckUser from '../../../helpers/authorization';
import Background from '../../../assets/utils/images/pay.svg';
import getPayments from '../../../actions/uploadKyc/payments';
import PageTitle from '../../../Layout/AppMain/PageTitle';

import { Row, Col, Button, CardTitle, Alert } from 'reactstrap';

import { ToastContainer, toast } from 'react-toastify';
//import getPayments from '../../../actions/uploadKyc/payments';

class Loyalty extends Component {
  state = {
    visible: true,
    popoverOpen1: false,
    showModal: false,
    subscribed: false,
    divider: '',
    errors: {},
  };

  componentDidMount() {
    if (!CheckUser()) {
      toast.error('Your session has expired redirecting to Login');
      window.setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    }
    this.props.getPayments()
    //console.log(this.props.Loyalty.isSubscribed, 'Here');
  }

  toggleShowModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  handleInputChange = (e) => {
    e.preventDefault();
    console.log(this.state.divider);
    this.setState({
      [e.target.name]: parseInt(e.target.value),
    });
  };

  handleSubmit = async () => {
    await this.setState({
      subscribed: true,
    });
    await this.props.loyaltyOptin({ divider: this.state.divider });

    if (this.props.Loyalty.success) {
      this.toggleShowModal();
    }
  };

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    const payments = this.props.Payment.payments[1];
    const { response, reports, kyc_uploaded} = this.props.Payment;

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
          {kyc_uploaded && kyc_uploaded && (
            <LoyaltyTable data={payments} reports={reports} />
          )}
          <LoyaltyDivider
            modal={this.state.showModal}
            toggle={this.toggleShowModal}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
          />
          <ToastContainer />
          {!kyc_uploaded && (
            <>
              <PageTitle
                heading='Payments'
                subheading='Payment management'
                icon='pe-7s-cash icon-gradient bg-happy-fisher'
                toggle={this.addNewProduct}
              />
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
                        {this.props.Payment.response &&
                          this.props.Payment.response.message ===
                            'Merchant payments account not verified' && (
                              
                            <Alert color="warning">
                              Your account is yet to be verified. Kindly wait as
                              your KYC documents undergo verifications
                            </Alert>
                          )}
                        {this.props.Payment.response && this.props.Payment.response
                          .message !==
                          'Merchant payments account not verified' && (
                          <Alert color="danger">
                            To activate your account Kindly upload, CR-12 document and
                            Certificate of incorporation documents
                          </Alert>
                        )}

                        <Button
                          className='mb-2 mr-2 mt-3 pr-4 pl-4'
                          onClick={this.toggleShowModal}
                          style={{
                            backgroundColor: '#00a0ff',
                            color: '#ffffff',
                            border: 'none',
                          }}
                        >
                          <i className='lnr-file-add btn-icon-wrapper'> </i>
                          {'Upload Documents'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getPayments: () => dispatch(getPayments()),
  getStores: () => dispatch(getALLStores()),
  getUsers: () => dispatch(getALLUsers()),
  getOrders: () => dispatch(getAllOrders()),
  loyaltyOptin: (divider) => dispatch(optinLoyalty(divider)),
  getLoyaltyReports: () => dispatch(loyaltyReports()),
  checkOptin: () => dispatch(checkOptinStatus()),
});

export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Loyalty);
