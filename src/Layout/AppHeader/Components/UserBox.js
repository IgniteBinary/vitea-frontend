import React, { Fragment } from 'react';

// import Ionicon from 'react-ionicons';

import { IoIosCalendar } from 'react-icons/io';

import PerfectScrollbar from 'react-perfect-scrollbar';


import {
  DropdownToggle,
  DropdownMenu,
  Nav,
  Col,
  Row,
  Button,
  NavItem,
  NavLink,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
} from 'reactstrap';

import { toast, Bounce, ToastContainer} from 'react-toastify';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import city3 from '../../../assets/utils/images/dropdown-header/city3.jpg';


class UserBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  logOut = () => {
      toast.success('Logout Successfull redirecting to home page');
      window.setTimeout(
          () => {
              window.location.href = '/';
              localStorage.clear();

          },
          2000
      )

  }


  notify2 = () =>
    (this.toastId = toast(
      "You don't have any new items in your calendar for today! Go out and play!",
      {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success',
      }
    ));

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      <Fragment>
        <div className='header-btn-lg pr-0'>
          <div className='widget-content p-0'>
            <div className='widget-content-wrapper'>
              <div className='widget-content-left'>
                <UncontrolledButtonDropdown>
                  <DropdownToggle color='link' className='p-0'>
                    <img
                      width={90}
                      height={72}
                      className='rounded-circle'
                      src={'https://res.cloudinary.com/dy1bghrrm/image/upload/v1597390093/igniteFacilityPortal/k52xzumrc1adwlxp2igm.png'}
                      alt=''
                    />
                    <FontAwesomeIcon
                      className='ml-2 opacity-8'
                      icon={faAngleDown}
                    />
                  </DropdownToggle>

                  <DropdownMenu right className='rm-pointers dropdown-menu-lg'>
                    <div className='dropdown-menu-header'>
                      <div className='dropdown-menu-header-inner bg-info'>
                        <div
                          className='menu-header-image opacity-2'
                          style={{
                            backgroundImage: 'url(' + city3 + ')',
                          }}
                        />
                        <div className='menu-header-content text-left'>
                          <div className='widget-content p-0'>
                            <div className='widget-content-wrapper'>
                              <div className='widget-content-left mr-3'>
                                <img
                                  width={42}
                                  className='rounded-circle'
                                  src={'https://res.cloudinary.com/dy1bghrrm/image/upload/v1597390093/igniteFacilityPortal/k52xzumrc1adwlxp2igm.png'}
                                  alt=''
                                />
                              </div>
                              <div className='widget-content-left'>
                                <div className='widget-heading'>
                                  {user.first_name} {user.last_name}
                                </div>
                                <div className='widget-subheading opacity-8'>
                                  {user.role}
                                </div>
                              </div>
                              <div className='widget-content-right mr-2'>
                                <Button
                                  className='btn-pill btn-shadow btn-shine'
                                  color='warning'
                                  onClick={this.props.toggle}
                                >
                                  Change password
                                </Button>
                                <Button
                                  className='btn-pill btn-shadow btn-shine'
                                  color='focus'
                                  onClick={this.logOut}
                                >
                                  Logout
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div
                      className='scroll-area-xs'
                      style={{
                        height: '150px',
                      }}
                    >
                      <PerfectScrollbar>
                        <Nav vertical>
                          <NavItem className='nav-item-header'>
                            Activity
                          </NavItem>
                          <NavItem>
                            <NavLink href='#'>
                              Chat
                              <div className='ml-auto badge badge-pill badge-info'>
                                8
                              </div>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink href='#'>Recover Password</NavLink>
                          </NavItem>
                          <NavItem className='nav-item-header'>
                            My Account
                          </NavItem>
                          <NavItem>
                            <NavLink href='#'>
                              Settings
                              <div className='ml-auto badge badge-success'>
                                New
                              </div>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink href='#'>
                              Messages
                              <div className='ml-auto badge badge-warning'>
                                512
                              </div>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink href='#'>Logs</NavLink>
                          </NavItem>
                        </Nav>
                      </PerfectScrollbar>
                    </div>
                    <Nav vertical>
                      <NavItem className='nav-item-divider mb-0' />
                    </Nav>
                    <div className='grid-menu grid-menu-2col'>
                      <Row className='no-gutters'>
                        <Col sm='6'>
                          <Button
                            className='btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2'
                            outline
                            color='warning'
                          >
                            <i className='pe-7s-chat icon-gradient bg-amy-crisp btn-icon-wrapper mb-2'>
                              {' '}
                            </i>
                            Message Inbox
                          </Button>
                        </Col>
                        <Col sm='6'>
                          <Button
                            className='btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2'
                            outline
                            color='danger'
                          >
                            <i className='pe-7s-ticket icon-gradient bg-love-kiss btn-icon-wrapper mb-2'>
                              {' '}
                            </i>
                            <b>Support Tickets</b>
                          </Button>
                        </Col>
                      </Row>
                    </div> */}
                    {/* <Nav vertical>
                      <NavItem className='nav-item-divider' />
                      <NavItem className='nav-item-btn text-center'>
                        <Button size='sm' className='btn-wide' color='primary'>
                          Open Messages
                        </Button>
                      </NavItem>
                    </Nav> */}
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
              <div className='widget-content-left  ml-3 header-user-info d-block'>
                <div className='widget-heading'>{user.first_name}</div>
                <div className='widget-subheading'>{user.role}</div>
              </div>
              {/* <div className='widget-content-right header-user-info ml-3'>
                <Button
                  className='btn-shadow p-1'
                  size='sm'
                  onClick={this.notify2}
                  color='info'
                  id='Tooltip-1'
                >
                  <IoIosCalendar color='#ffffff' fontSize='20px' />
                </Button>
                <UncontrolledTooltip placement='bottom' target={'Tooltip-1'}>
                  Click for Toastify Notifications!
                </UncontrolledTooltip>
              </div> */}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UserBox;
