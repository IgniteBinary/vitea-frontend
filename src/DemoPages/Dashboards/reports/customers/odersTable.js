import ReactTable from 'react-table';
import moment from 'moment';
import SearchBox from '../../../SearchBox';
import matchSorter from 'match-sorter';
import {connect} from 'react-redux';
import {
  Col,
  Card,
  CardBody,
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

  render() {
    const {
      data,
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
                      Header: 'Customer Name',
                      accessor: 'first_name',
                      minWidth: 200,
                      Cell: (row) => (
                        <div>
                          <div className='widget-content p-0'>
                            <div className='widget-content-wrapper'>
                              <div className='widget-content-left mr-3'></div>
                              <div className='widget-content-left flex2'>
                                <div className='widget-heading'>
                                  {row.original.first_name}{' '}
                                  {row.original.last_name}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      Header: 'Phone Number',
                      accessor: 'msisdn',
                      minWidth: 170,
                      Cell: (row) => <div>{row.value}</div>,
                    },
                    {
                      Header: 'Email',
                      accessor: 'email',
                      minWidth: 200,
                      id: 'all',
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, {
                          keys: [
                            'email',
                            'date_of_most_recent_order',
                            'totalOrderValue',
                            'products',
                            'first_name',
                            'last_name'
                          ],
                        }),
                      filterAll: true,
                      Cell: (row) => <div>{row.value}</div>,
                    },

                    {
                      Header: 'Date of first order',
                      accessor: 'date_of_most_recent_order',
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
                      Header: 'Date of most recent order',
                      accessor: 'date_of_first_order',
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
                      Header: 'Number of orders placed',
                      accessor: 'number_of_orders_placed',
                      minWidth: 130,
                      Cell: (row) => <div>{row.value}</div>,
                    },

                    {
                      Header: 'Total Order Value',
                      accessor: 'totalOrderValue',
                      minWidth: 150,
                      Cell: (row) => <div>{row.value}</div>,
                    },
                    {
                      Header: 'Average Order Value',
                      accessor: 'average_order_value',
                      minWidth: 150,
                      Cell: (row) => (
                        <div>{parseFloat(row.value.toFixed(2))}</div>
                      ),
                    },
                  ],
                },
              ]}
              defaultPageSize={5}
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

