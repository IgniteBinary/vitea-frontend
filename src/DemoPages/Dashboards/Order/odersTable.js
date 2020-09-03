import ReactTable from 'react-table';
import moment from 'moment';
import SearchBox from '../../SearchBox';
import matchSorter from 'match-sorter';
import {connect} from 'react-redux';
import {
  Col,
  Card,
  CardBody,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledButtonDropdown,
  Button
} from 'reactstrap';

import React, { Component } from 'react';

class OrdersTable extends Component {
  state = {
    filtered: [],
    filterAll: '',
  };

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

  viewOrder = (order_no) => async () => {
    const order = await this.props.data.find((x) => x.order_no === order_no);
    localStorage.setItem('orderData', JSON.stringify(order));
    this.setState({
      order: order,
    });

    window.location.href = '/dashboard/order-invoice';
  };

  render() {
    const {
      data,
      getPrice,
      activateUser,
      viewOrder,
      checkPaymentStatus,
    } = this.props;
    return (
      <Col md='12'>
        <Card className='main-card mb-3'>
          <div className='mt-2 text-center ml-3' data-tut='search_order'>
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
              data={data}
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
                        const options = {month: 'long'}
                        const dateObject = new Date(unixTime);
                        const test = dateObject.toLocaleDateString(
                          'en-US'
                        );
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
                      minWidth: 130,
                      Cell: (row) => (
                        <div>
                          {row.value.first_name} {row.value.last_name}
                        </div>
                      ),
                    },

                    {
                      Header: 'Email',
                      accessor: 'customer',
                      minWidth: 200,
                      Cell: (row) => <div>{row.value.email}</div>,
                    },

                    {
                      Header: 'Phone Number',
                      accessor: 'customer',
                      minWidth: 150,
                      Cell: (row) => <div>{row.value.msisdn}</div>,
                    },

                    {
                      Header: 'Payment Status',
                      accessor: 'payments',
                      Cell: (row) => (
                        <div
                          className={
                            checkPaymentStatus(row.original) === 'Paid'
                              ? 'text-center badge badge-success'
                              : checkPaymentStatus(row.original) === 'Patial'
                              ? 'badge badge-warning'
                              : 'badge badge-danger'
                          }
                        >
                          {console.log(row, 'am the row')}
                          {checkPaymentStatus(row.original)}
                        </div>
                      ),
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
                              <DropdownItem header>Manage Order</DropdownItem>
                              {
                                this.props.viewOrder && 
                                <DropdownItem>
                                <i className='dropdown-icon pe-7s-look'> </i>
                                <span onClick={viewOrder(row.original._id)}>
                                  View Order Products
                                </span>
                              </DropdownItem>
                              }
                              
                              { this.props.printOrder && 
                                <DropdownItem>
                                  <i className='dropdown-icon pe-7s-look'> </i>
                                  <span
                                    onClick={this.props.printOrder(row.value)}
                                  >
                                    Print receipt
                                  </span>
                                </DropdownItem>
                              }
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
}


export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, null)(OrdersTable);

