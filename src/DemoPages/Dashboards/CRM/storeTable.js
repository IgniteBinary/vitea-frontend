import ReactTable from 'react-table';
import SearchBox from '../../SearchBox';
import matchSorter from 'match-sorter';
import {
  Col,
  Card,
  CardBody,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledButtonDropdown,
  CardTitle,
} from 'reactstrap';

import React, { Component } from 'react';

class StoresTable extends Component {
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
    const { data } = this.props;
    console.log(data, 'table data');
    return (
      <Col md='12'>
        {data.length !== 0 ? (
          <Card className='main-card mb-3'>
            <div className='mt-2 text-center ml-3' data-tut='search_store'>
              <SearchBox
                value={this.state.filterAll}
                onChange={this.filterAll}
              />
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
                        Header: 'Name',
                        accessor: 'name',
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, {
                            keys: [
                              'name',
                              'handle',
                              'email',
                              'address',
                              'active',
                            ],
                          }),
                        filterAll: true,

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
                        Header: 'Handle',
                        accessor: 'handle',
                      },
                      {
                        Header: 'Email',
                        accessor: 'email',
                        minWidth: 200,
                      },
                      {
                        Header: 'Address',
                        accessor: 'address',
                      },
                      {
                        Header: 'Mobile',
                        accessor: 'mobile_no',
                      },
                      {
                        Header: 'Status',
                        accessor: 'active',
                        Cell: (row) => (
                          <div
                            className={
                              row.value
                                ? 'badge badge-success'
                                : 'badge badge-danger'
                            }
                          >
                            {row.value ? 'ACTIVE' : 'INACTIVE'}
                          </div>
                        ),
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        Header: 'Actions',
                        accessor: 'id',
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
                                <DropdownItem header>Manage store</DropdownItem>
                                <DropdownItem>
                                  <i className='dropdown-icon lnr-inbox'> </i>
                                  <span
                                    onClick={this.props.editStore(row.value)}
                                  >
                                    Edit store
                                  </span>
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledButtonDropdown>
                          </div>
                        ),
                      },
                    ],
                  },
                ]}
                defaultPageSize={data.length < 10 ? data.length : 10}
                className='-striped'
              />
            </CardBody>
          </Card>
        ) : (
          <CardTitle className='text-center'>
            You currently do not have any stores{' '}
          </CardTitle>
        )}
      </Col>
    );
  }
}

export default StoresTable;
