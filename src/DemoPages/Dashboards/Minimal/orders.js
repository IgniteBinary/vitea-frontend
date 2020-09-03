import ReactTable from 'react-table';
import moment from 'moment';
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

import React from 'react';


const getOrder = (_id) => async () => {
  const order = await this.props.Orders.orders.find((x) => x._id === _id);
  console.log(order, 'Larry');
  this.setState({
    order: order.products,
    modal: !this.state.modal,
  });
};

const orderTotal = (products) => {
  // const total = products.reduce((a,b) => ({price: a.price + b.price}))
  let totalPrice = 0;
  products.map((product) => {
    product.price ? (totalPrice += product.price) : (totalPrice += 0);
  });
  // return total
  return totalPrice;
};

const checkPaymentStatus = (order) => {
  let status = 'Unpaid';
  let actualPay = 0;
  const totalPrice = orderTotal(order.products);
  if (order.payments && order.payments.length > 0) {
    order.payments.forEach((payment) => {
      actualPay += payment.amount;
    });

    if (actualPay >= totalPrice) {
      status = 'Paid';
    } else {
      status = 'Patial';
    }
  }

  return status;
};

const getPrice = (products) => {
  // const total = products.reduce((a,b) => ({price: a.price + b.price}))
  let totalPrice = 0;
  products.map((product) => {
    product.price ? (totalPrice += product.price) : (totalPrice += 0);
  });
  // return total
  return totalPrice;
};

const OrdersTable = ({ data, activateUser, viewOrder }) => {
  console.log(data);
    const order = data && data.filter((order) => {
      return checkPaymentStatus(order) === 'Paid';
    });
  return (
    <Col md='12'>
      {!data || data.length === 0 ? (
        <CardTitle className='pt-3'>
          You currently dont have any transaction history
        </CardTitle>
      ) : (
        <Card className='main-card mb-3'>
          <CardBody>
            <ReactTable
              data={order}
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
                      minWidth: 180,
                      Cell: (row) => <div>{row.value.email}</div>,
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
                    ,
                    {
                      Header: 'Amount',
                      accessor: 'products',
                      Cell: (row) => <div>{getPrice(row.value)}</div>,
                    },
                  ],
                },
                // {
                //   columns: [
                //     {
                //       Header: 'Actions',
                //       accessor: '_id',
                //       Cell: (row) => (
                //         <div className='d-block w-100 text-center'>
                //           <UncontrolledButtonDropdown>
                //             <DropdownToggle
                //               caret
                //               className='btn-icon btn-icon-only btn btn-link'
                //               color='link'
                //             >
                //               <i className='lnr-menu-circle btn-icon-wrapper' />
                //             </DropdownToggle>
                //             {/* <DropdownMenu className='rm-pointers dropdown-menu-hover-link'>
                //               <DropdownItem header>Manage Order</DropdownItem>
                //               <DropdownItem>
                //                 <i className='dropdown-icon pe-7s-look'> </i>
                //                 <span onClick={viewOrder(row.value)}>View</span>
                //               </DropdownItem>
                //               <DropdownItem>
                //                 <i className='pe-7s-pen dropdown-icon'> </i>
                //                 <span
                //                   onClick={activateUser({
                //                     staff_id: row.value,
                //                   })}
                //                 >
                //                   Edit
                //                 </span>
                //               </DropdownItem>
                //             </DropdownMenu> */}
                //           </UncontrolledButtonDropdown>
                //         </div>
                //       ),
                //     },
                //   ],
                // },
              ]}
              defaultPageSize={5}
              className='-striped'
            />
          </CardBody>
        </Card>
      )}
    </Col>
  );
};

export default OrdersTable;
