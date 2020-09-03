import ReactTable from "react-table";
import {
  Col,
  Card,
  CardBody,

} from 'reactstrap';

import React from 'react'
import { Component } from "react";
import SearchBox from '../../SearchBox';
import matchSorter from 'match-sorter';

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
    const data  = this.props.reports;
    return (
      <Col md='12'>
        <Card className='main-card mb-3'>
          <div className='mt-2 text-center ml-3' data-tut='search_store'>
            <SearchBox value={this.state.filterAll} onChange={this.filterAll} />
          </div>
          <CardBody>
            <ReactTable
              data={data}
              filtered={this.state.filtered}
              ref={(r) => (this.reactTable = r)}
              onFilteredChange={this.onFilterChange}
              defaultFilterMethod={(filter, column) =>
                String(column[filter.id]) === filter.value
              }
              columns={[
                {
                  columns: [
                    {
                      Header: 'First Name',
                      accessor: 'first_name',
                      minWidth: 200,
                      Cell: (row) => (
                        <div>
                          <div className='widget-content p-0'>
                            <div className='widget-content-wrapper'>
                              <div className='widget-content-left mr-3'></div>
                              <div className='widget-content-left flex2'>
                                <div>{row.value}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      Header: 'Last Name',
                      accessor: 'last_name',
                    },
                    {
                      Header: 'Email',
                      accessor: 'email',
                    },
                    {
                      Header: 'Points Balance',
                      accessor: 'points_balance',
                    },
                    {
                      Header: 'Status',
                      accessor: 'statuss',
                      Cell: (row) => (
                        <div
                          className={
                            row.value === 'Successful'
                              ? 'badge badge-success'
                              : 'badge badge-danger'
                          }
                        >
                          {row.value}
                        </div>
                      ),
                    },
                  ],
                },
              ]}
              defaultPageSize={7}
              className='-striped'
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default OrdersTable
