import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import { 
    Button, Modal, ModalHeader, 
    ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import DropDown from '../dropDown';
import Validations from '../../helpers/userValidations';
import createUserAction from '../../actions/users/createUserAction';
import './style.scss';
import getALLUsers from '../../actions/users/getAllUsersAction';
import Loader from 'react-loaders';
import editAppointment from '../../actions/appointments/editAppointment';
class ModalBackdrop extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
            hasErrors: null,
            backdrop: true,
            error: {},
            doctor: {
              doctor:  null,
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

    handleSubmit =  async (e) => {
      e.preventDefault();
      const { editAppointment } = this.props
      const { error } = this.state
      console.log(error)
      // if (this.state.doctor.doctor.length < 0) {
      //   toast.error("Invalid Fields", {
      //     position: toast.POSITION.TOP_RIGHT,
      //   });
      //   return false
      // }

      const id = localStorage.getItem('appointment_id')

      const doctorObj = {
        ...this.state.doctor,
        id
      }

      await editAppointment(doctorObj)

      // if (this.props.Products.success) {
      //    toast.success('Doctor  successfully assigned', {
      //      position: toast.POSITION.TOP_RIGHT,
      //    });
      //   this.props.toggle()
       
      
      // }
    }
    
    
    hasError = () => Object.keys(this.state.error).length > 0

    render() {
        const {error} = this.state;
        const stores = JSON.parse(localStorage.getItem('stores'))
        const {doctors }= this.props
        console.log(doctors, 'yess')
        const closeBtn = <button className="close" type="submit" onClick={this.props.toggle}>&times;</button>;
        return (
          <span className="d-inline-block mb-2 mr-2 create-user-modal">
            <ToastContainer />
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} backdrop={this.state.backdrop}>
              <ModalHeader toggle={this.props.toggle} close={closeBtn}> Assign Doctor </ModalHeader>
              <ModalBody>
                <Form >
                  {this.state.hasErrors && <div>Invalid Inputs</div>}
                  {
                  doctors.length > 0 &&
                  <DropDown
                    classes="create-user-input"
                    label="Doctors"
                    placeholder="Select Doctors"
                    name="last_name"
                    options={doctors}
                    onChange={this.handleInputChange}
                    itemValue="id"
                  />
                  }

                  <ModalFooter>
                    <span
                      className="text-secondary cancel-link"
                      onClick={this.props.toggle}
                    >
                      Cancel

                    </span>
        <Button className="create-user"  onClick={this.handleSubmit} type='submit'>{ this.props.Users.isLoading? <Loader type='ball-pulse-sync' color='#fff' /> : 'Asign Doctor'}</Button>
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
  getUsers: () => dispatch(getALLUsers),
 
})
export const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalBackdrop);