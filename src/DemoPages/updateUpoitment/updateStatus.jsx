import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import { 
    Button, Modal, ModalHeader, 
    ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import InputBox from '../../inputbox';
import DropDown from '../../dropDown';
import Validations from '../../../helpers/userValidations';
import createUserAction from '../../../actions/users/createUserAction';
import getAllStores from '../../../actions/stores/getAllStoresAction';
import './style.scss';
import getALLUsers from '../../../actions/users/getAllUsersAction';
import imageUpload from '../../../actions/apploadImageAction/';
import editAppointment from '../../../actions/appointments/editAppointment';
import Loader from 'react-loaders';

class ModalBackdrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasErrors: null,
            backdrop: true,
            error: {},
            doctor: {
              doctor:  null,
              status: 'Approved',
            }
        };   
    }
    
   

   handleDropChange = (e) => {
        const { user } = this.state;
        console.log(user)
        user.gender = e.target.value;
        this.setState({ user })
    }


    handleInputChange = (e) => {
        e.preventDefault();
        const data = { type: e.target.name, content: e.target.value };
        const errors = Validations(data, this.state.error);
        const { doctor } = this.state;
        console.log(doctor)
        this.setState({
            doctor: {
                ...doctor,
                doctor: e.target.value,
            },
            error: errors
        });
    }

    handleSubmit =  async () => {
      const { editAppointment } = this.props
      const { error } = this.state
      if (Object.keys(error).length > 0) {
        toast.error("Invalid Fields", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return false
      }

      const id = localStorage.getItem('appointment_id')

      const doctorObj = {
        ...this.state.doctor,
        id
      }

      await editAppointment(doctorObj)

      if (this.props.Products.success) {
         toast.success('Doctor  successfully assigned', {
           position: toast.POSITION.TOP_RIGHT,
         });
        this.props.toggle()
       
      
      }
    }
    
    
    
    hasError = () => Object.keys(this.state.error).length > 0

    render() {
       
        const closeBtn = <button className="close" type="submit" onClick={this.props.toggle}>&times;</button>;
        return (
          <span className="d-inline-block mb-2 mr-2 create-user-modal">
            <ToastContainer />
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} backdrop={this.state.backdrop}>
              <ModalHeader toggle={this.props.toggle} close={closeBtn}> Create Doctor </ModalHeader>
              <ModalBody>
                <Form >
                  {this.state.hasErrors && <div>Invalid Inputs</div>}
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
        <Button className="create-user"  onClick={() => this.handleSubmit(this.props.id)} type='submit'>{ this.props.Products.isLoading? <Loader type='ball-pulse-sync' color='#fff' /> : 'Create User'}</Button>
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
  editAppointment: (appointment) => dispatch(editAppointment(appointment)),
 
})
export const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalBackdrop);