import React, {Fragment} from 'react';

// import Ionicon from 'react-ionicons';
import { IoIosGrid, IoIosNotificationsOutline, IoIosAnalytics } from "react-icons/io";

import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu,
    Nav, Col, Row, Button, NavItem, DropdownItem
} from 'reactstrap';

import {
    AreaChart, Area,
    ResponsiveContainer,
} from 'recharts';

import {
    faArrowLeft,
    faCog,
} from '@fortawesome/free-solid-svg-icons';

import CountUp from 'react-countup';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import bg4 from '../../../assets/utils/images/dropdown-header/abstract4.jpg';
import city2 from '../../../assets/utils/images/dropdown-header/city2.jpg';
import city3 from '../../../assets/utils/images/dropdown-header/city3.jpg';

import Flag from 'react-flagkit';

import Tabs from 'react-responsive-tabs';

// Dropdown Tabs Content
import ChatExample from './TabsContent/ChatExample';
import TimelineEx from './TabsContent/TimelineExample';
import SysErrEx from './TabsContent/SystemExample';

const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Page C', uv: 2000, pv: 6800, amt: 2290},
    {name: 'Page D', uv: 4780, pv: 7908, amt: 2000},
    {name: 'Page E', uv: 2890, pv: 9800, amt: 2181},
    {name: 'Page F', uv: 1390, pv: 3800, amt: 1500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const tabsContent = [
    {
        title: 'Messages',
        content: <ChatExample/>
    },
    {
        title: 'Events',
        content: <TimelineEx/>
    },
    {
        title: 'System Errors',
        content: <SysErrEx/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

class HeaderDots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            icons: [
                'pe-7s-wallet',
                'pe-7s-shopbag',
                'bell'
            ]
        };

    }

    render() {
        return (
          <Fragment>
            <div className='header-dots'>
              <UncontrolledDropdown>
                <DropdownToggle className='p-0 mr-2' color='link'>
                  <div className='nav-link item-1'>
                    <i className='pe-7s-wallet' style={{ fontSize: '24px' }} />
                    <div
                      className='mt-0 ml-2 mt-4'
                      data-tut='top_market_credit'
                    >
                      <p
                        className='mb-0 wallet-b text-secondary'
                        style={{ fontSize: '10px' }}
                      >
                        Marketing Credit
                      </p>
                      <p
                        className='balance text-secondary'
                        style={{ fontSize: '10px' }}
                      >
                        Ksh 0
                      </p>
                    </div>
                  </div>
                </DropdownToggle>
                {/* <DropdownMenu right className="dropdown-menu-xl rm-pointers">
                            <div className="dropdown-menu-header">
                                <div className="dropdown-menu-header-inner bg-plum-plate">
                                    <div className="menu-header-image"
                                         style={{
                                             backgroundImage: 'url(' + bg4 + ')'
                                         }}
                                    />
                                    <div className="menu-header-content text-white">
                                        <h5 className="menu-header-title">Grid Dashboard</h5>
                                        <h6 className="menu-header-subtitle">Easy grid navigation inside dropdowns</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-menu grid-menu-xl grid-menu-3col">
                                <Row className="no-gutters">
                                    <Col xl="4" sm="6">
                                        <Button
                                            className="btn-icon-vertical btn-square btn-transition"
                                            outline color="link">
                                            <i className="pe-7s-world icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Automation
                                        </Button>
                                    </Col>
                                    <Col xl="4" sm="6">
                                        <Button
                                            className="btn-icon-vertical btn-square btn-transition"
                                            outline color="link">
                                            <i className="pe-7s-piggy icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Reports
                                        </Button>
                                    </Col>
                                    <Col xl="4" sm="6">
                                        <Button
                                            className="btn-icon-vertical btn-square btn-transition"
                                            outline color="link">
                                            <i className="pe-7s-config icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Settings
                                        </Button>
                                    </Col>
                                    <Col xl="4" sm="6">
                                        <Button
                                            className="btn-icon-vertical btn-square btn-transition"
                                            outline color="link">
                                            <i className="pe-7s-browser icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Content
                                        </Button>
                                    </Col>
                                    <Col xl="4" sm="6">
                                        <Button
                                            className="btn-icon-vertical btn-square btn-transition"
                                            outline color="link">
                                            <i className="pe-7s-hourglass icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Activity
                                        </Button>
                                    </Col>
                                    <Col xl="4" sm="6">
                                        <Button
                                            className="btn-icon-vertical btn-square btn-transition"
                                            outline color="link">
                                            <i className="pe-7s-world icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Contacts
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                            <Nav vertical>
                                <NavItem className="nav-item-divider"/>
                                <NavItem className="nav-item-btn text-center">
                                    <Button size="sm" className="btn-shadow" color="primary">
                                        Follow-ups
                                    </Button>
                                </NavItem>
                            </Nav>
                        </DropdownMenu> */}
              </UncontrolledDropdown>
              <UncontrolledDropdown>
                <DropdownToggle className='p-0 mr-2' color='link'>
                  <div className='nav-link item-1'>
                    <i
                      className='pe-7s-shopbag text-secondary'
                      style={{ fontSize: '24px' }}
                    />
                    <div className='badge badge-dot badge-dot-sm badge-danger'>
                      Notifications
                    </div>
                    <div className='mt-0 ml-2 mt-4'>
                      <p
                        className='mb-0 wallet-b text-secondary'
                        data-tut='new_orders'
                        style={{ fontSize: '10px' }}
                      >
                        New Orders
                      </p>
                      <p
                        className='balance text-secondary'
                        style={{ fontSize: '10px' }}
                      >
                        0
                      </p>
                    </div>
                  </div>
                </DropdownToggle>
                {/* <DropdownMenu right className="dropdown-menu-xl rm-pointers">
                            <div className="dropdown-menu-header mb-0">
                                <div className="dropdown-menu-header-inner bg-deep-blue">
                                    <div className="menu-header-image opacity-1"
                                         style={{
                                             backgroundImage: 'url(' + city3 + ')'
                                         }}
                                    />
                                    <div className="menu-header-content text-dark">
                                        <h5 className="menu-header-title">Notifications</h5>
                                        <h6 className="menu-header-subtitle">You have <b>21</b> unread messages</h6>
                                    </div>
                                </div>
                            </div>
                            <Tabs tabsWrapperClass="body-tabs body-tabs-alt" transform={false} showInkBar={true}
                                  items={getTabs()}/>
                            <Nav vertical>
                                <NavItem className="nav-item-divider"/>
                                <NavItem className="nav-item-btn text-center">
                                    <Button size="sm" className="btn-shadow btn-wide btn-pill" color="focus">
                                        View Latest Changes
                                    </Button>
                                </NavItem>
                            </Nav>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown>
                        <DropdownToggle className="p-0 mr-2" color="link">
                            <div className="nav-link item-1">
                                <i className='pe-7s-bell text-secondary' style={{ fontSize: "24px" }} />
                                <div className="badge badge-dot badge-dot-sm badge-danger">Notifications</div>
                            </div>
                        </DropdownToggle>
                        <DropdownMenu right className="rm-pointers">
                            <div className="dropdown-menu-header">
                                <div className="dropdown-menu-header-inner pt-4 pb-4 bg-focus">
                                    <div className="menu-header-image opacity-05"
                                         style={{
                                             backgroundImage: 'url(' + city2 + ')'
                                         }}
                                    />
                                    <div className="menu-header-content text-center text-white">
                                        <h6 className="menu-header-subtitle mt-0">Choose Language</h6>
                                    </div>
                                </div>
                            </div>
                            <DropdownItem header>Popular Languages</DropdownItem>
                            <DropdownItem>
                                <Flag className="mr-3 opacity-8" country="US"/>
                                USA
                            </DropdownItem>
                            <DropdownItem>
                                <Flag className="mr-3 opacity-8" country="CH"/>
                                Switzerland
                            </DropdownItem>
                            <DropdownItem>
                                <Flag className="mr-3 opacity-8" country="FR"/>
                                France
                            </DropdownItem>
                            <DropdownItem>
                                <Flag className="mr-3 opacity-8" country="ES"/>
                                Spain
                            </DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem header>Others</DropdownItem>
                            <DropdownItem active>
                                <Flag className="mr-3 opacity-8" country="DE"/>
                                Germany
                            </DropdownItem>
                            <DropdownItem>
                                <Flag className="mr-3 opacity-8" country="IT"/>
                                Italy
                            </DropdownItem>
                        </DropdownMenu>*/}
              </UncontrolledDropdown>
            </div>
          </Fragment>
        );
    }
}

export default HeaderDots;
