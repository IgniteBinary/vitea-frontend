import React, { Fragment, useState, useEffect, Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import Modal from './subscription_payments';
import getAllSubscriptions from '../../actions/subscription/get_subscriptions'
import checkSubcriptionStatus from '../../helpers/checkSuscriptionStatus';

export class ExpiredSubscription extends Component {
    state = {
        isOpen: false,
        subscriptions: []
    }

    componentDidMount(){
       if (checkSubcriptionStatus()!=='Expired'){
      window.location.href = '/';
    } ;
        this.props.getSubscription();

    }

    toggle = () => this.setState({isOpen: !this.state.isOpen})
    render() {
        return (
          <Fragment>
            <Modal subs ={this.props.Subscription.subscriptions} toggle={this.toggle} modal={this.state.isOpen} />

            <div className='h-100 bg-plum-plate bg-animation'>
              <div className='d-flex h-100 justify-content-center align-items-center'>
                <Col md='8' className='mx-auto app-login-box'>
                  <div
                    className='app-logo-inverse mx-auto '
                    style={{
                      height: '35px',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                  <div className='modal-dialog w-100 mx-auto' size='lg'>
                    <div className='modal-content'>
                      <div className='modal-body'>
                        <div className='h5 modal-title text-center'>
                          <h4 className='mt-2'>
                            <div>Your subscription has expired</div>
                            <span>
                              Kindly make payments to continue using julla
                              merchant portal services.
                            </span>
                          </h4>
                        </div>
                      </div>
                      <div className='modal-footer clearfix'>
                        <div className='float-left'>
                          <a
                            href='https://julla.co/pricing'
                            target='blank'
                            className='btn-lg btn btn-link'
                          >
                            View Pricing
                          </a>
                        </div>
                        <div className='float-right'>
                          <Button color='primary' size='lg' onClick={this.toggle}>
                            Make Payments
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='text-center text-white opacity-8 mt-3'>
                    Copyright &copy; Julla 2020
                  </div>
                </Col>
              </div>
            </div>
          </Fragment>
        );
    }
}

export const mapDispatchToProps = (dispatch) => ({
    getSubscription: () => dispatch(getAllSubscriptions())
})

export const mapStateToProps= (state) => ({
    ...state
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpiredSubscription);



