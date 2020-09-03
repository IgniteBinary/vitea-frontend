import ReactTable from 'react-table';
import moment from 'moment';
import SearchBox from '../../SearchBox';
import matchSorter from 'match-sorter';
import { connect } from 'react-redux';
import viewShipping from '../../../actions/shipping/getShipping'
import ShippingDetails from './shippingDetails';
import {
  Col,
  Card,
  CardBody,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledButtonDropdown,
} from 'reactstrap';
import {
  faRocket, faEye
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Component } from 'react';

class OrdersTable extends Component {
  state = {
    filtered: [],
    filterAll: '',
    modal: false,
  };


  toggleModal = () => this.setState({modal: !this.state.modal})

  

  onFilterChange = (filtered) => {
    if (filtered.length > 1 && this.state.filterAll.length) {
      const filterAll = '';
      this.setState({
        filtered: filtered.filter((item) => item.id != 'all'),
        filterAll,
      });
    } else this.setState({ filtered });
  };

  filterAll = (e) => {
    console.log('yes');
    const { value } = e.target;
    const filterAll = value;
    const filtered = [{ id: 'all', value: filterAll }];
    this.setState({ filterAll, filtered });
  };

  render() {
    const { data, getPrice, activateUser, deactivateUser } = this.props;
    const onlineOrders = data.filter((order) => order.order_type === 'online');
    return (
      <Col md='12'>
        {/* <ShippingDetails modal={this.state.modal} toggle={this.toggleModal} details={this.props.Shipping.response.message}/> */}
        <Card className='main-card mb-3'>
          <div className='mt-2 text-center ml-3'>
            <SearchBox value={this.state.filterAll} onChange={this.filterAll} />
          </div>
          <CardBody>
            <ReactTable
              filtered={this.state.filtered}
              ref={(r) => (this.reactTable = r)}
              onFilteredChange={this.onFilterChange}
              defaultFilterMethod={(filter, column) =>
                String(column[filter.id]) === filter.value
              }
              data={onlineOrders}
              columns={[
                {
                  columns: [
                    {
                      Header: '#Order',
                      accessor: 'order_no',
                      Cell: (row) => (
                        <div>
                          <div className='widget-content p-0'>
                            <div className='widget-content-wrapper'>
                              <div className='widget-content-left mr-3'></div>
                              <div className='widget-content-left flex2'>
                                <div className='widget-heading'>
                                  {row.value}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      Header: 'Date',
                      accessor: 'createdOn',
                      minWidth: 170,
                      Cell: (row) => {
                        const unixTime = row.value;
                        console.log(row.value);
                        const dateObject = new Date(unixTime);

                        const humanDateFormat = dateObject.toLocaleString(
                          'en-GB',
                          { timeZone: 'UTC' }
                        );
                        return <div>{humanDateFormat}</div>;
                      },
                    },
                    {
                      Header: 'Customer',
                      accessor: 'customer',
                      Cell: (row) => (
                        <div>
                          {row.value.first_name} {row.value.last_name}
                        </div>
                      ),
                    },
                    {
                      Header: 'Phone Number',
                      accessor: 'customer',
                      minWidth: 140,
                      Cell: (row) => (
                        <div>
                          {row.value.msisdn}
                        </div>
                      ),
                    },

                    {
                      Header: 'Email',
                      accessor: 'customer',
                      minWidth: 240,
                      Cell: (row) => <div>{row.value.email}</div>,
                    },
                    {
                      Header: 'Amount',
                      accessor: 'products',
                      id: 'all',
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, {
                          keys: [
                            'customer',
                            'order_no',
                            'order_stage',
                            'products',
                          ],
                        }),
                      filterAll: true,
                      Cell: (row) => <div>{getPrice(row.value)}</div>,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      Header: 'Actions',
                      accessor: 'order_no',
                      Cell: (row) => (
                        <div className='d-block w-100 text-center'>
                          <UncontrolledButtonDropdown>
                            <DropdownToggle
                              caret
                              className='btn-icon btn-icon-only btn btn-link'
                              color='link'
                            >
                              <i className='lnr-menu-circle btn-icon-wrapper' />
                            </DropdownToggle>
                            <DropdownMenu className='rm-pointers dropdown-menu-hover-link'>
                              <DropdownItem header>Manage Orders</DropdownItem>
                              <DropdownItem>
                                <FontAwesomeIcon
                                  icon={faRocket}
                                  className='lnr-inbox'
                                />
                                <span
                                  className='ml-2'
                                  onClick={this.props.handleViewDetails(
                                    row.value
                                  )}
                                >
                                  Track Order
                                </span>
                              </DropdownItem>
                              {/* <DropdownItem>
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className='lnr-inbox'
                                />
                                <span
                                  className='ml-2'
                                  onClick={this.handleViewDetails(row.value)}
                                >
                                  Shipping Details
                                </span>
                              </DropdownItem> */}
                            </DropdownMenu>
                          </UncontrolledButtonDropdown>
                        </div>
                      ),
                    },
                  ],
                },
              ]}
              defaultPageSize={10}
              className='-striped'
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
};

export const mapDispatchToProps = (dispatch) => ({
         viewShipping: (order_no) => dispatch(viewShipping(order_no)),
       });

export const mapStateToProps = (state) => ({
  ...state,
});
export default connect(mapStateToProps,mapDispatchToProps )(OrdersTable);
