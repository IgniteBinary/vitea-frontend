import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import checkSubcriptionStatus from '../../../helpers/checkSuscriptionStatus';

const SubscriptionExpiredModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(checkSubcriptionStatus());

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader
          style={{
            backgroundColor: '#00a0ff',
            color: '#ffffff',
          }}
          toggle={toggle}
        >
          Subscription Expired
        </ModalHeader>
        <ModalBody>
          Your Julla subscription has expired kindly make payments to continue
          using the Julla merchant portal services.
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            onClick={toggle}
            style={{
              backgroundColor: '#00a0ff',
              color: '#ffffff',
              border: 'none'
            }}
          >
            Make Payments
          </Button>{' '}
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SubscriptionExpiredModal;
