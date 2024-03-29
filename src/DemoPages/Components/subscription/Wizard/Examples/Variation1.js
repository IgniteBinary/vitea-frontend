import React, {Fragment} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {
    Card, CardBody, Row, Col
} from 'reactstrap';

import MultiStep from '../Wizard';

import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step4 from './Steps/Step4';

import PageTitle from '../../../../../Layout/AppMain/PageTitle';
import img from '../../../../../assets/utils/images/app_logo.png';

const steps = [
    {name: 'Account Information', component: <Step1/>},
    {name: 'Payment Information', component: <Step2/>},
    {name: 'Finish Wizard', component: <Step4/>}
];


export default class FormWizardVar1 extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);

        this.state = {
            cSelected: [],
            dropdownOpen: false
        };

        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    onMouseEnter() {
        this.setState({dropdownOpen: true});
    }

    onMouseLeave() {
        this.setState({dropdownOpen: false});
    }

    onCheckboxBtnClick(selected) {
        const index = this.state.cSelected.indexOf(selected);
        if (index < 0) {
            this.state.cSelected.push(selected);
        } else {
            this.state.cSelected.splice(index, 1);
        }
        this.setState({cSelected: [...this.state.cSelected]});
    }
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
              <div>
                <PageTitle
                  heading='Subscription'
                  subheading='Make subscription payments'
                  img={img}
                />
                <Row
                  style={{
                    width: '80%',
                    margin: '0 auto',
                  }}
                  className=' no-gutters'
                >
                  <Col md='12' lg='12'>
                    <Card className='main-card mb-3'>
                      <CardBody>
                        <MultiStep showNavigation={true} steps={steps} />
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
