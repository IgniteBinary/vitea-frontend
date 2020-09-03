import ReactTable from 'react-table';
import {
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

import React, { Component } from 'react';
import SearchBox from '../../SearchBox';
import matchSorter from 'match-sorter';

class ProductsTable extends Component {

     state = {
       filtered: [],
       filterAll: '',
     }


     onFilterChange = (filtered) => {
       if(filtered.length > 1 && this.state.filterAll.length){
         const filterAll = '';
         this.setState({filtered: filtered.filter((item)=> item.id != 'all'), filterAll })
       }
       else 
        this.setState({filtered});
     }

     filterAll = (e) => {
      console.log('yes')
       const {value} = e.target;
       const filterAll = value;
       const filtered = [{id: 'all', value: filterAll}];
       this.setState({filterAll, filtered});

     }
 
  render(){
     const { data, editProduct, viewProduct, deleteProduct } = this.props;
  return (
    <>
      <Col md='12'>
        <Card className='main-card mb-3'>
          <div className='mt-2 text-center ml-3' data-tut='search_product'>
            <SearchBox value={this.state.filterAll} onChange={this.filterAll} />
          </div>
          <CardBody>
            <ReactTable
              //getTrProps={(state, rowInfo) => {}}
              filtered={this.state.filtered}
              ref={(r) => (this.reactTable = r)}
              onFilteredChange={this.onFilterChange}
              defaultFilterMethod={(filter, column) =>
                String(column[filter.id]) === filter.value
              }
              //filterable
              data={data}
              columns={[
                {
                  columns: [

                    {
                      Header: 'Title',
                      accessor: 'title',
                      id: 'all',
                      minWidth: 150,
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, {
                          keys: ['title', 'description', 'price'],
                        }),
                      filterAll: true,
                    },
                    {
                      Header: 'Description',
                      accessor: 'description',
                      minWidth: 250,
                      filterMethod: (filter, row) => {
                        return row[filter.id].includes(filter.value);
                      },
                    },
                    {
                      Header: 'Doctor',
                      accessor: 'price',
                      minWidth: 100,
                    },
                    {
                      Header: 'Patient Name',
                      accessor: 'price',
                      minWidth: 100,
                    },
                    {
                      Header: 'Time',
                      accessor: 'quantity',
                    },
                    {
                      Header: 'Status',
                      accessor: 'weight',
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
                              <DropdownItem header>Manage Product</DropdownItem>
                              <DropdownItem>
                                <i className='dropdown-icon pe-7s-look'> </i>
                                <span onClick={viewProduct(row.value)}>View</span>
                              </DropdownItem>
                              <DropdownItem>
                                <i className='dropdown-icon pe-7s-pen'> </i>
                                <span onClick={editProduct(row.value)}>
                                  Edit
                                </span>
                              </DropdownItem>
                              <DropdownItem>
                                <i className='dropdown-icon pe-7s-x'> </i>
                                <span onClick={deleteProduct(row.value)}>
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
              defaultPageSize={5}
              className='-striped -highlight'
            />
          </CardBody>
        </Card>
      </Col>
    </>
  );
            }
};

export default ProductsTable;
