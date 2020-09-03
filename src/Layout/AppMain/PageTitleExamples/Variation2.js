import React, {Component, Fragment} from 'react';

import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu, Nav, NavItem, NavLink,
    Button,
    UncontrolledTooltip
} from 'reactstrap';

import {
  
    faPlus

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    toast,
    Slide
} from 'react-toastify';

export default class TitleComponent2 extends Component {
    toggle(name) {
        this.setState({
            [name]: !this.state[name],
            progress: 0.5,
        })
    }

    notify22 = () => this.toastId = toast("Another toastify example!!!", {
        transition: Slide,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    });

    render() {
        return (
          <Fragment>
            {this.props.useCase && (
              <div>
                <UncontrolledTooltip placement='left' target={'Tooltip-123'}>
                  {this.props.tag}
                </UncontrolledTooltip>
                <Button
                  className='btn-shadow mr-3'
                  onClick={this.props.toggle}
                  data-tut={this.props.data_tut}
                  color='info'
                  id='Tooltip-123'
                >
                  {this.props.rightIcon? <i className={this.props.rightIcon} style={{fontSize: '15px', fontWeight:'bold'}}></i>:<FontAwesomeIcon icon={faPlus}/>} {this.props.useCase}
                </Button>
              </div>
            )}
          </Fragment>
        );
    }
}