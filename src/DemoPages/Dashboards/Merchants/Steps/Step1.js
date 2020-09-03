import React, { Fragment } from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import ImageUpload from '../imageDropZone';

export default class WizardStep1 extends React.Component {
  render() {
    return (
      <Fragment>
        <div className='form-wizard-content'>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for='exampleAddress'>Name of business*</Label>
                <Input type='text' name='address' id='exampleAddress' />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='exampleAddress2'>Phone Number*</Label>
                <Input type='text' name='address2' id='exampleAddress2' />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for='exampleAddress'>Business Tag Line*</Label>
                <Input type='text' name='address' id='exampleAddress' />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='exampleAddress2'>Business Email*</Label>
                <Input type='email' name='address2' id='exampleAddress2' />
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for='exampleState'>Business Logo*</Label>
                <ImageUpload />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='exampleState'>Description*</Label>
                <Input type='textarea' name='state' id='exampleState' style={{height: "90px"}} />
              </FormGroup>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
