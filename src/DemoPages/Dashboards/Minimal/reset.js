/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
import createUserAction from '../../../actions/users/createUserAction';
import getAllStores from '../../../actions/stores/getAllStoresAction';
import resetPassword from '../../../actions/users/reset_password';
import './reset.scss';
import getALLUsers from '../../../actions/users/getAllUsersAction';
import Loader from 'react-loaders';

class ModalBackdrop extends React.Component {
  
    state = {
        email: false,
        password: false,
        confirmPassWord: false,
      }
  


  handleInputChange = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.setState({
        [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if(!this.state.email || !this.state.password || !this.state.confirmPassWord ){
        toast.error('Invalid or missing fields')
        return 
    }
    if(this.state.confirmPassWord !== this.state.password){
        toast.error('Passwords do not match')
        return
    }

    const data = {}
    data.email = this.state.email
    data.password = this.state.password

    await this.props.resetPassword(data)
    if(this.props.ResetPassword.success){
        toast.success('Password changed successfully')
        this.props.toggle()
    }
  };

  hasError = () => Object.keys(this.state.error).length > 0;

  render() {
    
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
            Create a new password for your account
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              {this.state.hasErrors && <div>Invalid Inputs</div>}
              <InputBox
                classes='create-user-input'
                label='Email'
                placeholder='your account email'
                name='email'
                type='email'
                //inputValue={this.state.email}
                onchange={this.handleInputChange}
                required={true}
              />
              <InputBox
                classes='create-user-input'
                label='Password'
                name='password'
                type='password'
                //inputValue={this.state.password}
                required={true}
                onchange={this.handleInputChange}
              />
              <InputBox
                classes='create-user-input'
                label='Confirm password'
                name='confirmPassWord'
                type='password'
                // inputValue={this.state.confirmPassWord}
                required={true}
                onchange={this.handleInputChange}
              />
              <ModalFooter>
                <span
                  className='text-secondary cancel-link'
                  onClick={this.props.toggle}
                >
                  Cancel
                </span>
                <Button className='create-user' type='submit'>
                  {this.props.ResetPassword.isLoading ? (
                    <Loader type='ball-pulse-sync' color='#fff' />
                  ) : (
                    'Confirm'
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
  getUsers: () => dispatch(getALLUsers),
  resetPassword: (payload) => dispatch(resetPassword(payload))
});
export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalBackdrop);
