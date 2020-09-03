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
import InputBox from '../../inputbox';
import DropDown from '../../dropDown';
import Validations from '../../../helpers/userValidations';
import './subscription.scss';
import Loader from 'react-loaders';

import switchDomains from '../../../actions/domains/switchDomain';

class ModalBackdrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrors: null,
      backdrop: true,
      error: {},
      user: {
        url: '',
        store_id: '',
      },
    };
  }

  handleInputChange = (e) => {
    e.preventDefault();
    const data = { type: e.target.name, content: e.target.value };
    const errors = Validations(data, this.state.error);
    const { user } = this.state;
    console.log(this.state.user);
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
    const { switchDomains } = this.props;
    const { error } = this.state;
    if (Object.keys(error).length > 0) {
      toast.error('Invalid Fields', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }

    if (
      this.state.user.url.indexOf('http://') === 0 ||
      this.state.user.url.indexOf('http://') === 0 ||
      this.state.user.url.indexOf('www') > -1
    ) {
      toast.error('Domain name should not contain http , https or www', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
    await switchDomains(this.state.user);
    if (this.props.DNS.success) {
      toast.success('Domain for your store has been successfully switched', {
        position: toast.POSITION.TOP_RIGHT,
      });
      this.props.toggle();
    }
  };

  hasError = () => Object.keys(this.state.error).length > 0;

  render() {
    const { subs } = this.props;
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
            Connect existing domain
          </ModalHeader>
          <ModalBody>
            <ModalBody>
              <p>
                To connect your domain you need to log in to your
                NetworkSolutions account and change your settings. Follow the
                step by step instructions to get started
              </p>
              <a>
                <Button color='info'>
                  View Network solutions instructions
                </Button>
              </a>
            </ModalBody>
            <div className='divider'></div>
            <Form onSubmit={this.handleSubmit}>
              {this.state.hasErrors && <div>Invalid Inputs</div>}

              <DropDown
                classes='create-user-input'
                label='Select the store you want to link'
                name='store_id'
                itemValue='id'
                options={subs}
                onChange={this.handleInputChange}
              />
              <InputBox
                label='Domain (eg business.com)'
                onchange={this.handleInputChange}
                name='url'
              />
              <ModalFooter className='mt-4'>
                <span
                  className='text-secondary cancel-link'
                  onClick={this.props.toggle}
                >
                  Cancel
                </span>
                <Button className='create-user' type='submit'>
                  {this.props.DNS.isLoading ? (
                    <Loader type='ball-pulse-sync' color='#fff' />
                  ) : (
                    'Verify'
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
  switchDomains: (data) => dispatch(switchDomains(data)),
});
export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalBackdrop);
