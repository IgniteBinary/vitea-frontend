import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
} from 'reactstrap';


const ShippingDetails = ({modal, toggle, details}) => {
  return (
    <Modal
      isOpen={modal}
      modalTransition={{ timeout: 700 }}
      backdropTransition={{ timeout: 1300 }}
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>Shipping details</ModalHeader>
      <ModalBody>
        <h4>
          Heading <Badge color='success'>{details && details.state}</Badge>
        </h4>
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ShippingDetails;
