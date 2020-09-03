import React, { Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { Row, Col, Card, CardBody, CardTitle, Container } from 'reactstrap';
import axios from 'axios';
const mapStyles = {
  width: '100%',
  height: '100%',
};

class GoogleMaps extends React.Component {
  
  state = {
    currentLocation: {},
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) => {
    console.log(this.state);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onClick = async (t, map, coord) => {
    const { latLng } = coord;
    const lat = await latLng.lat();
    const lng = await latLng.lng();

    console.log(lat, lng);
    // call reverse geolocation here

    // this.setState((previousState) => {
    //   return {
    //     markers: [
    //       ...previousState.markers,
    //       {
    //         title: '',
    //         name: '',
    //         position: { lat, lng },
    //       },
    //     ],
    //   };
    // });
  };

  handleClick(event) {
    var lat = event.latLng.lat(),
      lng = event.latLng.lng();
    console.log(lat, lng);
  }

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <Fragment>
        <CSSTransitionGroup
          component='div'
          transitionName='TabsAnimation'
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Container fluid>
            <Row>
              <Col md='12'>
                <Card className='main-card mb-3 100-vh vh-100 100-h h-100'>
                  <CardTitle>Basic</CardTitle>

                  <Map
                    onClick={this.props.onClick}
                    style={mapStyles}
                    google={this.props.google}
                    zoom={11}
                    initialCenter={{
                      lat: -1.2884,
                      lng: 36.8233,
                    }}
                  >
                    <Marker
                      onClick={this.onMarkerClick}
                      name={'Kenyatta International Convention Center'}
                    />
                    <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                      onClose={this.onClose}
                    >
                      <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                      </div>
                    </InfoWindow>
                  </Map>
                </Card>
              </Col>
            </Row>
          </Container>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGE_MAPS_API,
})(GoogleMaps);
