import React, { Fragment, Component } from 'react';

import Slider from 'react-slick';

import bg1 from '../../../assets/utils/images/originals/data.png';
import bg2 from '../../../assets/utils/images/originals/doctor2.png';
import bg3 from '../../../assets/utils/images/originals/doctor3.png';
import Intercom from 'react-intercom';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import loginAction from '../../../actions/auth/loginActions';
import Loader from 'react-loaders';
import Validations from '../../../helpers/userValidations';
import { connect } from 'react-redux';
import ResetPassword from '../../Dashboards/Minimal/reset'
import Logo from '../../../assets/utils/images/app_logo.png'
class Login extends Component {
  state = {
    error: {},
    user: {
      user_name: '',
      password: '',
    },
    reset: false
  };

  componentDidMount() {
    localStorage.clear()
  }

  /**
   * @param {object} e - The Event object
   * @returns {void} - No return
   * @memberof Login
   * @description Handles input changes
   */
  handleInputChange = (e) => {
    console.log(this.state.user);
    e.preventDefault();
    let errors;

    if (e.target.name === 'email') {
      const data = { type: e.target.name, content: e.target.value };
      errors = Validations(data, this.state.error);
    } else {
      errors = {};
    }

    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [e.target.name]: e.target.value,
      },
      error: errors,
    });
  };

  toggleReset = () => {
    this.setState({
      reset: !this.state.reset,
    });
  }


  handleSubmit = async (e) => {
    console.log('item');
    e.preventDefault();
    const { login } = this.props;
    const { error } = this.state;
    if (Object.keys(error).length > 0) {
      toast.error('The email field is invalid', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
    await login(this.state.user);
    if (this.props.success) {
      this.props.history.push('/dashboard');
    }
  };

  registerMechant = () => this.props.history.push('/facility/register');

  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      initialSlide: 0,
      autoplay: true,
      adaptiveHeight: true,
    };
    return (
      <Fragment>
        <div className='h-100'>
          <Intercom appID='wz6k5k91' />
          <ToastContainer />
          <ResetPassword modal={this.state.reset} toggle={this.toggleReset} />
          <Row className='h-100 no-gutters'>
            <Col lg='5' className='d-none d-lg-block'>
              <div className='slider-light'>
                <Slider {...settings}>
                  <div className='h-100 d-flex justify-content-center align-items-center bg-plum-plate'>
                    <div
                      className='slide-img-bg'
                      style={{
                        backgroundImage: 'url(' + bg1 + ')',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                      }}
                    />
                    <div
                      className='slider-content'
                      style={{ marginTop: '68%' }}
                    >
                      <h3>Appointment Management</h3>
                      <p>
                        Manage all online appointments under your facilty.
                      </p>
                    </div>
                  </div>
                  <div className='h-100 d-flex justify-content-center align-items-center bg-plum-plate'>
                    <div
                      className='slide-img-bg'
                      style={{
                        backgroundImage: 'url(' + bg2 + ')',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                      }}
                    />
                    <div
                      className='slider-content'
                      style={{ marginTop: '68%' }}
                    >
                      <h3>Data driven reports and Analytics</h3>
                      <p>
                        Make informed business decisions by unlocking patients
                        data and insights that will help you understand your
                         patients better
                      </p>
                    </div>
                  </div>
                  <div className='h-100 d-flex justify-content-center align-items-center bg-plum-plate'>
                    <div
                      className='slide-img-bg'
                      style={{
                        backgroundImage: 'url(' + bg3 + ')',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                      }}
                    />
                    <div
                      className='slider-content'
                      style={{ marginTop: '68%' }}
                    >
                      <h3>Staff Management</h3>
                      <p>
                        Manage the doctors and nurses under your facility.
                      </p>
                    </div>
                  </div>
                  {/* <div className='h-100 d-flex justify-content-center bg-winter-neva align-items-center'>
                    <div
                      className='slide-img-bg opacity-6'
                      style={{
                        backgroundImage: 'url(' + bg3 + ')',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                    <div
                      className='slider-content '
                      style={{ marginTop: '68%' }}
                    >
                      <h3>Centralized Order management</h3>
                      <p>
                        Rest easy knowing that our unparalleled software removes
                        operational complexities giving you the power to serve
                        all your clients from one central place and convert high
                        value orders
                      </p>
                    </div>
                  </div> */}
                </Slider>
              </div>
            </Col>
            <Col
              lg='7'
              md='12'
              className='h-100 d-flex bg-white justify-content-center align-items-center'
            >
              <Col lg='9' md='10' sm='12' className='mx-auto app-login-box'>
                <div>
                  <Form
                    style={{ width: '70%', margin: '0 auto' }}
                    onSubmit={this.handleSubmit}
                  >  
                    <img src={Logo} width="180px" className="text-center" style={{ width: '70%', margin: '0 auto' }}/>
                    <div className='text-center mb-3'>
                      {this.props.isLoading && (
                        <Loader
                          className='align-self-center'
                          type='ball-pulse-sync'
                          color='#00a1ff'
                        />
                      )}
                    </div>

                    <Row form className='d-flex flex-column '>
                      <FormGroup className='d-block'>
                        <Label for='exampleEmail'>Username</Label>
                        <Input

                          type='text'
                          name='user_name'
                          id='exampleEmail'
                          required
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>

                      <FormGroup className='d-block'>
                        <Label for='examplePassword'>Password</Label>
                        <Input
                          value={this.state.user.password}
                          type='password'
                          name='password'
                          id='examplePassword'
                          onChange={this.handleInputChange}
                          required
                        />
                      </FormGroup>
                    </Row>
                    <FormGroup>
                      <Button
                        type='submit'
                        color='primary'
                        className='border-0'
                        size='lg'
                        style={{
                          width: '100%',
                          backgroundColor: '#2db5a5',
                          fontSize: '17px',
                          height: '50px',
                        }}
                      >
                        Login
                      </Button>
                    </FormGroup>
                    <div>
                      <div className='text-left'>
                        <a
                          onClick={this.toggleReset}
                          className='btn-lg btn btn-link'
                          style={{ color: '#2db5a5', marginLeft: 'auto' }}
                        >
                          Forgot Password
                        </a>{' '}
                      </div>
                    </div>
                    <div>
                      <div className=''>
                        <a
                          onClick={this.registerMechant}
                          className='btn-lg btn btn-link'
                          style={{ color: '#2db5a5' }}
                        >
                          Dont have an account? Create account
                        </a>{' '}
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
export const mapStateToProps = (state) => ({
  ...state.Login,
});
export const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(loginAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
