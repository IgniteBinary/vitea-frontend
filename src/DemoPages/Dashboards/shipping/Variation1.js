import React, {Fragment} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {
    Card, CardBody, Row, Col,
} from 'reactstrap';
import { connect } from 'react-redux';

import MultiStep from './Wizard';

import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step4 from './Steps/Step4';


import PageTitle from '../../../Layout/AppMain/PageTitle';
import trackOrder from '../../../actions/shipping/trackShipping'




class TrackOrder extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    this.state = {
      cSelected: [],
      dropdownOpen: false,
      shippingDetails: {},
    };

    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
  }

  componentDidMount() {
    const shippingDetails = JSON.parse(localStorage.getItem('shipping'));
    this.setState({ shippingDetails });
    this.trackOrder();
    this.interval = setInterval(this.trackOrder, 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  trackOrder = () => {
    const shippingDetails = JSON.parse(localStorage.getItem('shipping'));
    console.log(shippingDetails.reference.id, 'Shipping');
    const order_no = shippingDetails && shippingDetails.reference.id;
    this.props.trackOrder(order_no);
  };

  returnCordinates = () => {
    const data =
      this.props.TrackShipping.response &&
      this.props.TrackShipping.response.message;
    const cordinates = {};
    cordinates.lat = data && data.lat;
    cordinates.lng = data && data.lon;
    return cordinates;
  };

  steps = () => [
    {
      name: 'SCHEDULED',
      component: <Step1 />,
    },
    {
      name: 'ACTIVE',
      component: (
        <Step2
          shippingDetails={this.props.shippingDetails}
          cordinates={this.returnCordinates()}
        />
      ),
    },
    { name: 'DELIVERED', component: <Step4 /> },
  ];

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  onMouseEnter() {
    this.setState({ dropdownOpen: true });
  }

  onMouseLeave() {
    this.setState({ dropdownOpen: false });
  }

  onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
  }
  render() {
    const { shippingDetails } = this.state;
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
          <div>
            <PageTitle
              heading='Shipping'
              subheading='Order Tracking'
              icon='lnr-rocket text-info'
            />
            <Row>
              <Col md='12' lg='12'>
                <Card className='main-card mb-3'>
                  <CardBody>
                    <MultiStep
                      showNavigation={false}
                      steps={this.steps()}
                      shippingDetails={shippingDetails}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
         trackOrder: (order_no) => dispatch(trackOrder(order_no)),
       });

export const mapStateToProps = (state) => ({
  ...state,
});
export default connect(mapStateToProps, mapDispatchToProps)(TrackOrder);