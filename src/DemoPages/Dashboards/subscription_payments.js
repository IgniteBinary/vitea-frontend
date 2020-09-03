import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';
import InputBox from '../inputbox';
import DropDown from '../dropDown';
import Validations from '../../helpers/userValidations';
import createUserAction from '../../actions/users/createUserAction';
import makePayments from '../../actions/subscription/payments_sub';
import getAllPayments from '../../actions/subscription/get_subscriptions';
import getAllStores from '../../actions/stores/getAllStoresAction';
import './subscription.scss';
import getALLUsers from '../../actions/users/getAllUsersAction';
import Loader from 'react-loaders';

class ModalBackdrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrors: null,
      backdrop: true,
      error: {},
      user: {
        subscription_mode: '',
        subscription_id: '',
      },
    };
  }

  handleInputChange = (e) => {
    e.preventDefault();
    const data = { type: e.target.name, content: e.target.value };
    const errors = Validations(data, this.state.error);
    const { user } = this.state;
    console.log(this.state)
    this.setState({
      user: {
        ...user,
        [e.target.name]: e.target.value,
      },
      error: errors,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { pay } = this.props;
    const { error } = this.state;
    if (Object.keys(error).length > 0) {
      toast.error('Invalid Fields', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
    await pay(this.state.user);
    if (this.props.Subscription.success) {
      toast.success('Payment request initiated successfully kindly confirm the MPESA payment pop up request', {
        position: toast.POSITION.TOP_RIGHT,
      });
      this.props.toggle();
    }
  };

  hasError = () => Object.keys(this.state.error).length > 0;

  render() {
    const { error } = this.state;
    const stores = JSON.parse(localStorage.getItem('stores'));
    const {subs} = this.props
    const closeBtn = (
      <button className='close' type='submit' onClick={this.props.toggle}>
        &times;
      </button>
    );
    return (
      <span className='d-inline-block mb-2 mr-2 create-user-modal'>
        <ToastContainer />
        <Modal
          isOpen={this.props.modal}
          toggle={this.props.toggle}
          className={this.props.className}
          backdrop={this.state.backdrop}
        >
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            Make Payments
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              {this.state.hasErrors && <div>Invalid Inputs</div>}

              <DropDown
                classes='create-user-input'
                label='Subscription Type'
                name='subscription_id'
                itemValue='_id'
                options={subs}
                onChange={this.handleInputChange}
              />
              <DropDown
                classes='create-user-input'
                label='Subscription Period'
                name='subscription_mode'
                options={[{ name: 'monthly' }, { name: 'yearly' }]}
                onChange={this.handleInputChange}
              />
              <ModalFooter>
                <span
                  className='text-secondary cancel-link'
                  onClick={this.props.toggle}
                >
                  Cancel
                </span>
                <Button className='create-user' type='submit'>
                  {this.props.Subscription.isLoading ? (
                    <Loader type='ball-pulse-sync' color='#fff' />
                  ) : (
                    'Submit'
                  )}
                </Button>{' '}
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      </span>
    );
  }
}
export const mapDispatchToProps = (dispatch) => ({
  createUser: (user) => dispatch(createUserAction(user)),
  pay: (payment) => dispatch(makePayments(payment)),
  getUsers: () => dispatch(getALLUsers),
});
export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalBackdrop);
