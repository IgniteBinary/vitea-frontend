import ReactTable from 'react-table';
import Loader from 'react-loaders';
import {
  Col,
  Card,
  CardBody,
  Modal,
  CardHeader,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

import React, {Component} from 'react';
import { data } from 'jquery';

class OrderTable extends Component{
  state = {
    data: []

  }

  async componentDidMount(){
    await this.setState({
      data: this.props.data
    })
  }

  
 
  render(){
  //const { data } = this.state
  const { data, modal, toggle, cancelModal } = this.props
  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      backdrop={true}
      size='lg'
      style={{ maxWidth: '1600px', width: '80%' }}
    >
      <Col md='12' className='mb-2'>
        <button className='close' type='submit' onClick={cancelModal}>
          &times;
        </button>
       
        <ReactTable
          data={data.products}
          columns={[
            {
              columns: [
                {
                  Header: 'Item',
                  accessor: 'image',
                  width: 120,
                  Cell: (row) => {
                    return (
                      <div>
                        <div className='widget-content p-0'>
                          <div className='widget-content-wrapper'>
                            <div className='widget-content-left mr-3'>
                              <div className='widget-content-left'>
                                <img
                                  width={102}
                                  height={80}
                                  src={row.value[0]}
                                  alt=''
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  },
                },
                {
                  Header: 'Title',
                  accessor: 'title',
                  minWidth: 150,
                },
                {
                  Header: 'Description',
                  accessor: 'description',
                  minWidth: 150,
                },
                {
                  Header: 'Price',
                  accessor: 'price',
                },

                // {
                //   Header: 'Serial NO',
                //   width: 200,
                //   accessor: 'serial_no',
                //   Cell: (row) => {
                //     console.log(row.index);
                //     return (
                //       <div>
                //         <FormGroup>
                //           <Input
                //             type='text'
                //             id='exampleEmail'
                //             name={row.index}
                //             placeholder='Enter product S/N'
                //             value={row.value && row.value}
                //             onChange={this.props.editSerialNo}
                //           />
                //         </FormGroup>
                //       </div>
                //     );
                //   },
                // },
              ],
            },
          ]}
          defaultPageSize={4}
        />
      </Col>
    </Modal>
  );
  }
};

export default OrderTable;
