import React, {Fragment} from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

export default class WizardStep2 extends React.Component {
    render() {
        return (
          <Fragment>
            <div className='form-wizard-content'>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for='exampleAddress'>Personal email*(password will be sent here)</Label>
                    <Input type='email' name='address' id='exampleAddress' required/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for='exampleAddress2'>Personal Phone Number*</Label>
                    <Input type='text' name='address2' id='exampleAddress2' required/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for='exampleAddress'>First Name*</Label>
                    <Input type='text' name='address' id='exampleAddress' required/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for='exampleAddress2'>Last Name*</Label>
                    <Input type='email' name='address2' id='exampleAddress2' required />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for='exampleAddress'>National ID*</Label>
                    <Input type='text' name='address' id='exampleAddress' required/>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Fragment>
        );
    }
}
