import React, { Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import  moment from 'moment'
import MultiStep from './Wizard';
import createSuperAdmin from '../../../../actions/facility/createSuperAdmin';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step4';

export class MerchantManagement extends React.Component {
  state = {
    superAdmin: {
      email: null,
      first_name: null,
      last_name: null,
      user_name: null,
      gender: null,
      phone_no: null,
      dob: new Date(),
      password: null,
    },
    errors: {},
    superAdminSuccess: null,
  };

  handleValidation() {
    let fields = this.state.superAdmin;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields['first_name']) {
      formIsValid = false;
      errors['first_name'] = 'First name is required';
    }

    if (fields['last_name'] === null) {
      formIsValid = false;
      errors['last_name'] = ' Last name is required';
    }

    if (fields['gender'] === null) {
      formIsValid = false;
      errors['gender'] = 'Gender is required';
    }

    if (fields['email'] === null) {
      formIsValid = false;
      errors['email'] = 'Please enter a valid email';
    }

    if (fields['phone_no'] === null) {
      formIsValid = false;
      errors['msisdn'] = 'Phone number is required';
    }

    if (fields['user_name'] === null) {
      formIsValid = false;
      errors['user_name'] = 'Username is required';
    }

    if (fields['password'] === null) {
      formIsValid = false;
      errors['password'] = 'Password cannot be empty';
    }

    if(fields['dob'] === null){
      formIsValid =false;
      errors['dob'] = 'Date of birth is required'

    }

    // if (fields['msisdn'] !== null) {
    //   if (fields['msisdn'].match(/^[a-zA-Z]+$/)) {
    //     formIsValid = false;
    //     errors['msidn'] = 'Please enter only numbers';
    //   }
    // }

    //Email
    if (!fields['email']) {
      formIsValid = false;
      errors['email'] = 'Email Cannot be empty';
    }

    if (fields['email'] !== null) {
      let lastAtPos = fields['email'].lastIndexOf('@');
      let lastDotPos = fields['email'].lastIndexOf('.');

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields['email'].indexOf('@@') == -1 &&
          lastDotPos > 2 &&
          fields['email'].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors['email'] = 'Email is not valid';
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  //Handles input change
  handleInputChange = (e) => {
    e.preventDefault();
    // const data = {
    //   type: e.target.name,
    //   content: e.target.value,
    // };
    //const errors = Validations(data, this.state.error);
    const { superAdmin } = this.state;
    console.log(this.state);
    this.setState({
      superAdmin: {
        ...superAdmin,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleDateChange = (date) => {
    const { superAdmin } = this.state;
        this.setState({
          superAdmin: {
            ...superAdmin,
            dob:date
          }
        });
    }

  handleSubmit = async () => {
    const { createSuperAdmin } = this.props;
    const { superAdmin } = this.state;
    if (!this.handleValidation()) {
      toast.error('Invalid fields kindly fix the errors');
      return false;
    }

    await createSuperAdmin(superAdmin);
    if (this.props.Facility.success) {
      this.setState({
        superAdminSuccess: true,
      });
    }
    //  if (this.props.Merchant.success) {
    //    toast.success(
    //      'Account created successfully. Check email for login details. Redirecting to login ...'
    //    );
    //    ///setTimeout(() => (window.location.href = '/'), 4000);
    //  }
  };

  steps = () => [
    {
      name: 'Facility Details',
      component: (
        <Step1
          handleInputChange={this.props.handleInputChange}
          onDropLogo={this.props.onDropLogo}
          onDropImage={this.props.onDropImage}
          onDropCert={this.props.onDropCert}
          handleSubmit={this.props.handleSubmit}
          onCancel={this.props.onCancel}
          success={this.props.success}
          Imagefiles={this.props.ImageFiles}
          Logofiles={this.props.LogoFiles}
          errors={this.props.errors}
          handleCheck={this.props.handleCheck}
          handleChange={this.props.handleChange}
          handleSelect={this.props.handleSelect}
          handleCloseClick={this.props.handleCloseClick}
          address={this.props.address}
          isGeocoding={this.props.isGeocoding}
          errorMessage={this.props.errorMessage}
          handleError={this.props.handleError}
          Certfiles={this.props.Certfiles}
        />
      ),
    },
    {
      name: 'Super Admin Creation',
      component: (
        <Step2
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
          handleDateChange={this.handleDateChange}
          selected={this.state.superAdmin.dob}
        />
      ),
    },
    {
      name: 'Complete process',
      component: <Step3 />,
    },
  ];

  render() {
    return (
      <Fragment>
        <Card className='main-card mb-3'>
          <CardBody>
            <MultiStep
              showNavigation={true}
              steps={this.steps()}
              handleInputChange={this.props.handleInputChange}
              handleSubmit={this.props.handleSubmit}
              handleCreateSuperAdmin={this.handleSubmit}
              onDropLogo={this.props.onDropLogo}
              onDropImage={this.props.onDropImage}
              onCancel={this.props.onCancel}
              success={this.props.success}
              superAdminSuccess={this.state.superAdminSuccess}
              errors={this.state.errors}
            />
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createSuperAdmin: (superAdmin) => dispatch(createSuperAdmin(superAdmin)),
});
const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(MerchantManagement);
