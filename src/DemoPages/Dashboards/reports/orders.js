import ReactTable from "react-table";
import {
  Col,
  Card,
  CardBody,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledButtonDropdown,

} from 'reactstrap';

import React from 'react'


const OrdersTable = ({data, activateUser, deactivateUser}) => {
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
                      Header: 'Description',
                      accessor: 'description',
                      minWidth: 200,
                      Cell: (row) => (
                        <div>
                          <div className='widget-content p-0'>
                            <div className='widget-content-wrapper'>
                              <div className='widget-content-left mr-3'></div>
                              <div className='widget-content-left flex2'>
                                <div >
                                  {row.value}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      Header: 'Order number',
                      accessor: 'orderNumber',
                    },
                    {
                      Header: 'Date',
                      accessor: 'date',
                    },
                    {
                      Header: 'Price',
                      accessor: 'price',
                    },
                    {
                      Header: 'Status',
                      accessor: 'status',
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
                                // onClick={deactivateUser({
                                //   staff_id: row.value,
                                // })}
                                >
                                  Deactivate user
                                </span>
                              </DropdownItem>
                              <DropdownItem>
                                <i className='dropdown-icon lnr-file-empty'>
                                  {' '}
                                </i>
                                <span
                                // onClick={activateUser({
                                //   staff_id: row.value,
                                // })}
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
              defaultPageSize={7}
              className='-striped'
            />
          </CardBody>
        </Card>
      </Col>
    );
}

export default OrdersTable
