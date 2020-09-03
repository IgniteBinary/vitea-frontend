import React from 'react';
import ReactDOM from 'react-dom';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} from 'react-google-maps';


class Map extends React.Component {
  path = [
       this.props.cordinates
      // { lat: -1.2634904, lng: 36.781447 },
      // {lat: -1.26349, lng: 36.78363569999999 }
    ];
 
  render = () => {
      const icon = {
        url:
          'https://res.cloudinary.com/dy1bghrrm/image/upload/v1593779911/ij.png',
        scaledSize: new window.google.maps.Size(29, 29),
        anchor: { x: 10, y: 10 },
      };

      const lat = this.props.cordinates && parseFloat(this.props.cordinates.lat);
      const lng = this.props.cordinates && parseFloat(this.props.cordinates.lng);
      console.log(lat, lng)
       console.log('My cordinates', this.path);
    return (
      <GoogleMap defaultZoom={16} defaultCenter={{ lat: lat, lng: lng }}>
        {/* <Polyline path={this.path} options={{ strokeColor: '#FF0000 ' }} /> */}
        <Marker position={this.path[this.path.length - 1]} icon={icon} />
      </GoogleMap>
    );
  };
}

const MapComponent = withScriptjs(withGoogleMap(props => <Map {...props}/>));

export default MapComponent;

// export default () => (
//   <MapComponent
//     googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyBD1Ky1ylP6Hlgid6o3X3fAJcrDml1Ub6Q&v=3.exp&libraries=geometry,drawing,places'
//     loadingElement={<div style={{ height: `100%` }} />}
//     containerElement={<div style={{ height: `400px`}} />}
//     mapElement={<div style={{ height: `100%` }} />}
//     larry= 'larry'
//   />
// );