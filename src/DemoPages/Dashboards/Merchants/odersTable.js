import ReactTable from 'react-table';
import moment from 'moment'
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
  faRocket, faTrash
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const UsersTable = ({ data, activateUser, deactivateUser, getPrice}) => {
  return (
    <Col md='12'>
      <Card className='main-card mb-3'>
        <CardBody>
          <ReactTable
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
                              <div className='widget-heading'>{row.value}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    Header: 'Date',
                    accessor: 'createdOn',
                    minWidth: 150,
                    Cell: (row) => (
                      <div>
                        {moment(Date(row.value)).format('MMMM Do YYYY, h:mm a')}
                      </div>
                    ),
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
                    Header: 'Email',
                    accessor: 'customer',
                    minWidth: 140,
                    Cell: (row) => <div>{row.value.email}</div>,
                  },

                  {
                    Header: 'Shipping Status',
                    accessor: 'order_stage',
                    Cell: (row) => (
                      <div
                        className={
                          row.value === 'Shipped'
                            ? 'text-center badge badge-success'
                            : row.value === 'cart'
                            ? 'badge badge-warning'
                            : 'badge badge-danger'
                        }
                      >
                        {row.value === 'Cart' ? 'Pending' : 'Pending'}
                      </div>
                    ),
                  },
                  {
                    Header: 'Amount',
                    accessor: 'products',
                    Cell: (row) => <div>{getPrice(row.value)}</div>,
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
                            <DropdownItem header>Manage Orders</DropdownItem>
                            <DropdownItem>
                              <FontAwesomeIcon
                                icon={faRocket}
                                className='lnr-inbox'
                              />
                              <span
                                className='ml-2'
                                onClick={deactivateUser}
                              >
                                Track Order
                              </span>
                            </DropdownItem>
                            <DropdownItem>
                              <FontAwesomeIcon
                                icon={faTrash}
                                className='lnr-inbox'
                              />
                              <span
                                className="ml-2"
                                onClick={activateUser({
                                  staff_id: row.value,
                                })}
                              >
                                Delete
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
            defaultPageSize={10}
            className='-striped'
          />
        </CardBody>
      </Card>
    </Col>
  );
};

export default UsersTable;
