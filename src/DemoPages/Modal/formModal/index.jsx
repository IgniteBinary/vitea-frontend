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
    Button, Modal, ModalHeader, 
    ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import InputBox from '../../inputbox';
import DropDown from '../../dropDown';
import Validations from '../../../helpers/userValidations';
import createUserAction from '../../../actions/users/createUserAction';
import getAllStores from '../../../actions/stores/getAllStoresAction';
import './style.scss';
import getALLUsers from '../../../actions/users/getAllUsersAction';
import Loader from 'react-loaders';
import DatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-input-2';

class ModalBackdrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasErrors: null,
            backdrop: true,
            error: {},
            user: {
              first_name: '',
              last_name: '',
              gender: '',
              phone_no: '',
              email: '',
              dob: '',
              user_name: ''

            }
        };   
    }
    
    handlePhoneInput = phone => {
        const {user} = this.state
        this.setState({
            user:{
                ...user,
               phone_no: `+${phone}`
            }}
        )
    }

   handleDropChange = (e) => {
        const { user } = this.state;
        console.log(user)
        user.gender = e.target.value;
        this.setState({ user })
    }


    handleDatePicking = date => {
        const { user } = this.state
        user['dob'] = date
        console.log(user, 'yess')
        this.setState({ user })
    }



    handleInputChange = (e) => {
        e.preventDefault();
        const data = { type: e.target.name, content: e.target.value };
        const errors = Validations(data, this.state.error);
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [e.target.name]: e.target.value,
            },
            error: errors
        });
    }

    handleSubmit =  async (e) => {
      e.preventDefault();
      const { createUser } = this.props
      const { error } = this.state
      if (Object.keys(error).length > 0) {
        toast.error("Invalid Fields", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return false
      }
      await createUser(this.state.user)
      if (this.props.Users.success) {
         toast.success('User successfully created', {
           position: toast.POSITION.TOP_RIGHT,
         });
        this.props.toggle()
       
    
      }
    }
    
      


    hasError = () => Object.keys(this.state.error).length > 0

    render() {
        const {error} = this.state;
        const stores = JSON.parse(localStorage.getItem('stores'))

        const closeBtn = <button className="close" type="submit" onClick={this.props.toggle}>&times;</button>;
        return (
          <span className="d-inline-block mb-2 mr-2 create-user-modal">
            <ToastContainer />
            <Modal isOpen={this.props.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
              <ModalHeader toggle={this.toggle} close={closeBtn}> Create Doctor </ModalHeader>
              <ModalBody>
                <Form onSubmit={this.handleSubmit}>
                  {this.state.hasErrors && <div>Invalid Inputs</div>}
                  <InputBox
                    classes="create-user-input"
                    label="Email"
                    placeholder="doe@mail.com"
                    name="email"
                    type="email"
                    inputValue={this.state.email}
                    onchange={this.handleInputChange}
                    required={true}
                    error={error.email}
                  />
                  <InputBox
                    classes="create-user-input"
                    label="First Name"
                    placeholder="Doe"
                    name="first_name"
                    type="text"
                    inputValue={this.state.firstName}
                    required={true}
                    onchange={this.handleInputChange}
                    error={error.firstName}
                  />
                  <InputBox
                    classes="create-user-input"
                    label="Last Name"
                    placeholder="John"
                    name="last_name"
                    type="text"
                    inputValue={this.state.lastName}
                    required={true}
                    onchange={this.handleInputChange}
                    error={error.lastName}
                  />
                   <InputBox
                    classes="create-user-input"
                    label="Username"
                    placeholder="John"
                    name="user_name"
                    type="text"
                    inputValue={this.state.user_name}
                    required={true}
                    onchange={this.handleInputChange}
                    error={error.lastName}
                  />
                <FormGroup>
                  <Label for="exampleSelect">Date Of birth</Label>
                  <DatePicker
                    selected={Date.parse(this.state.user.dob)}
                    onChange={this.handleDatePicking}
                    className="form-control"
                  />
                </FormGroup>

                  <FormGroup>
                    <Label for="exampleAddress2">Phone Number*</Label>
                    <PhoneInput
                      country="ke"
                      name="phone_no"
                      onChange={this.handlePhoneInput}
                      class="form-control"
                      placeholder="254700002985"
                      value={this.state.user.phone_no}
                    />
                    <p style={{ color: 'red' }}>{this.state.error.phone}</p>
                </FormGroup>
                 
                  <DropDown
                    classes="create-user-input"
                    label="Gender"
                    placeholder="Select Gender"
                    name="gender"
                    options={[{name:'Male'}, {name:'Female'}]}
                    onChange={this.handleInputChange}
                    itemValue="name"
                  />
                 
                  <ModalFooter>
                    <span
                      className="text-secondary cancel-link"
                      onClick={this.props.toggle}
                    >
                      Cancel

                    </span>
        <Button className="create-user" type='submit'>{ this.props.Users.isLoading? <Loader type='ball-pulse-sync' color='#fff' /> : 'Create User'}</Button>
                    {' '}
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
  getUsers: () => dispatch(getALLUsers)
})
export const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalBackdrop);