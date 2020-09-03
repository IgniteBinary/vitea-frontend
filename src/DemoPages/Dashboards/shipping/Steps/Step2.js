import React, { Fragment } from 'react';
import { FormGroup, Label, CustomInput } from 'reactstrap';
import MapComponent from './map';

export default class WizardStep2 extends React.Component {
  render() {
    console.log(this.props.cordinates);
    return (
      <Fragment>
        <div className='form-wizard-content'>
          <MapComponent
            googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyBD1Ky1ylP6Hlgid6o3X3fAJcrDml1Ub6Q&v=3.exp&libraries=geometry,drawing,places'
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            larry='larry'
            cordinates = {this.props.cordinates}
          />
        </div>
      </Fragment>
    );
  }
}
