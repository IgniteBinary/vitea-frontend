import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';

class LoyaltyDividerModal extends Component {

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
            Set loyalty divider (This will be used to calculate the loyalty
            points i.e points = totalPrice/divider)
          </ModalHeader>
          <ModalBody>
            <Label for='exampleAddress2'>Divider</Label>
            <Input
              type='number'
              name='divider'
              id='exampleAddress2'
              onChange={this.props.handleInputChange}
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
                border: 'none'
              }}
              onClick={this.props.handleSubmit}
            >
              Confirm
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}

export default LoyaltyDividerModal;
