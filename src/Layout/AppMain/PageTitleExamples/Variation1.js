import React, {Component, Fragment} from 'react';

import {
    Button,
    UncontrolledTooltip
} from 'reactstrap';

import {
    toast,
    Slide
} from 'react-toastify';

import {
    faBatteryThreeQuarters,

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


export default class TitleComponent1 extends Component {

    state = {
        expZoomIn: false,
    }

    toggle(name) {
        this.setState({
            [name]: !this.state[name],
            progress: 0.5,
        })
    }

    notify22 = () => this.toastId = toast("You can add whatever element in this section.", {
        transition: Slide,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'default'
    });

    render() {
        return (
          <Fragment>
            <Button
              className='btn-shadow mr-3'
              onClick={this.props.cancle}
              color='light'
              id='Tooltip-123'
            >
              {this.props.fOption}
            </Button>
            <UncontrolledTooltip placement='left' target={'Tooltip-123'} data_tut={this.props.data_tut}>
              Save Product
            </UncontrolledTooltip>
            <Button
              className='btn-shadow mr-3 pl-4 pr-4'
              onClick={this.props.toggle}
              color='info'
              id='Tooltip-123'
            >
              {this.props.useCase}
            </Button>
          </Fragment>
        );
    }
}