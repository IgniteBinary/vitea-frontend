import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import uploadCoi from '../../../actions/uploadKyc/upload_coi';
import uploadC12 from '../../../actions/uploadKyc/upload_c12';
import { connect } from 'react-redux';
import {toast} from 'react-toastify';

class LoyaltyDividerModal extends Component {
  state = {
    c_12: [],
    coi: [],
  };

  onFileChange = (e) => {
    //const file = e.target.files[0];
    this.setState({
      [e.target.name]: e.target.files
    })
    console.log(this.state);
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    let Coi = new FormData()
    let C12 = new FormData()
    const {c_12} = this.state
    const {coi} = this.state
    for (let i = 0; i < c_12.length; i++) {
      C12.append(`kyc_document`, c_12[i]);
    }

    for (let i = 0; i < coi.length; i++) {
      Coi.append(`kyc_document`, coi[i]);
    }
    await Promise.all([this.props.uploadC12(C12), this.props.uploadCoi(Coi)]);

    if (this.props.Payment.success){
      toast.success('Your documents have been uploaded successfully')
      this.props.toggle();
    }
  }

  

  render() {
    return (
      <span className='d-inline-block mb-2 mr-2'>
        <Modal
          isOpen={this.props.modal}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader
            toggle={this.props.toggle}
            charCode='X'
            color='white'
            style={{
              fontSize: '0.95rem !important',
              backgroundColor: '#007bff',
              color: 'white',
            }}
          >
            Upload documents
          </ModalHeader>
          <ModalBody>
            <Label for='exampleAddress2'>CR-12 Documents</Label>
            <Input
              type='file'
              name='c_12'
              id='exampleAddress2'
              onChange={this.onFileChange}
            />
            <Label className='mt-2' for='exampleAddress2'>
              Certificate of incorperation
            </Label>
            <Input
              type='file'
              name='coi'
              id='exampleAddress2'
              onChange={this.onFileChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button color='link' onClick={this.props.toggle}>
              Cancel
            </Button>
            <Button
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
              }}
              onClick={this.handleSubmit}
            >
              Confirm
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
         uploadCoi: (file) => dispatch(uploadCoi(file)),
         uploadC12: (file) => dispatch(uploadC12(file)),
       });

export const mapStateToProps = (state) => ({
  ...state,
});


export default connect(mapStateToProps, mapDispatchToProps)(LoyaltyDividerModal);
