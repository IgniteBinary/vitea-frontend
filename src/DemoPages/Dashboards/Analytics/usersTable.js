import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import SearchBox from '../../SearchBox';
import {
  Col,
  Card,
  CardBody,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledButtonDropdown,

} from 'reactstrap';

import React, {Component} from 'react'

class UsersTable extends Component {
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
    const { data, deactivateUser, activateUser} = this.props;
    return (
      <Col md='12'>
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
              data={data}
              columns={[
                {
                  columns: [
                    {
                      Header: 'Name',
                      accessor: 'first_name',
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
                      Header: 'Username',
                      accessor: 'last_name',
                    },
                    {
                      Header: 'Email',
                      accessor: 'email',
                      minWidth: 200,
                    },
                    {
                      Header: 'Phone Number',
                      accessor: 'phone_no',
                      minWidth: 150,
                      id: 'all',
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, {
                          keys: ['email', 'last_name', 'first_name', 'status'],
                        }),
                      filterAll: true,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      Header: 'Actions',
                      accessor: '_id',
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
                              <DropdownItem header>Manage users</DropdownItem>
                              <DropdownItem>
                                <i className='dropdown-icon lnr-inbox'> </i>
                                <span
                                  onClick={deactivateUser({
                                    staff_id: row.value,
                                  })}
                                >
                                  Deactivate user
                                </span>
                              </DropdownItem>
                              <DropdownItem>
                                <i className='dropdown-icon lnr-file-empty'>
                                  {' '}
                                </i>
                                <span
                                  onClick={activateUser({
                                    staff_id: row.value,
                                  })}
                                >
                                  Activate User
                                </span>
                              </DropdownItem>
                              <DropdownItem>
                                <i className='dropdown-icon lnr-book'> </i>
                                <span>Actions</span>
                              </DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem>
                                <i className='dropdown-icon lnr-picture'> </i>
                                <span>Dividers</span>
                              </DropdownItem>
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

export default UsersTable
