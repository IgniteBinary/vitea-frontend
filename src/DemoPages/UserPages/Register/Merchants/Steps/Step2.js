import React, {Fragment} from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import Dropdown from '../../../../dropDown';
import DatePicker from './example1'
export default class WizardStep2 extends React.Component {
    render() {
       const {errors} = this.props
        return (
          <Fragment>
            <div className='form-wizard-content'>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for='exampleAddress'>Personal email</Label>
                    <Input
                      onChange={this.props.handleInputChange}
                      type='email'
                      name='email'
                      id='exampleAddress'
                      required
                    />
                    <p style={{ color: 'red' }}>{errors.email}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for='exampleAddress2'>Personal Phone Number</Label>
                    <Input
                      onChange={this.props.handleInputChange}
                      type='text'
                      name='phone_no'
                      id='exampleAddress2'
                      required
                    />
                    <p style={{ color: 'red' }}>{errors.phone_no}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for='exampleAddress'>First Name</Label>
                    <Input
                      onChange={this.props.handleInputChange}
                      type='text'
                      name='first_name'
                      id='exampleAddress'
                      required
                    />
                    <p style={{ color: 'red' }}>{errors.first_name}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for='exampleAddress2'>Last Name</Label>
                    <Input
                      onChange={this.props.handleInputChange}
                      type='email'
                      name='last_name'
                      id='exampleAddress2'
                      required
                    />
                    <p style={{ color: 'red' }}>{errors.last_name}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for='exampleAddress'>Username</Label>
                    <Input
                      onChange={this.props.handleInputChange}
                      type='text'
                      name='user_name'
                      id='exampleAddress'
                      required
                    />
                    <p style={{ color: 'red' }}>{errors.user_name}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for='exampleAddress'>Password</Label>
                    <Input
                      onChange={this.props.handleInputChange}
                      type='text'
                      name='password'
                      id='exampleAddress'
                      required
                    />
                    <p style={{ color: 'red' }}>{errors.password}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Dropdown
                      onChange={this.props.handleInputChange}
                      label={'Gender'}
                      name='gender'
                      options={[
                        { name: 'Male', itemValue: 'Male' },
                        { name: 'Female', itemValue: 'Female' },
                      ]}
                    />
                    <p style={{ color: 'red' }}>{errors.gender}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for='exampleAddress2'>Date of birth</Label>
                    <DatePicker onDateChange={this.props.handleDateChange} selected={Date.parse(this.props.selected)}/>
                    <p style={{ color: 'red' }}>{errors.last_name}</p>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Fragment>
        );
    }
}
