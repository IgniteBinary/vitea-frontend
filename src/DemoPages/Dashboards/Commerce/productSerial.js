import React, {useState} from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Input,
  FormGroup
} from 'reactstrap';

const ProductSerialNo = ({
  
  onChange,
  quantity
 
}) => {
  
  const n = quantity && parseInt(quantity);
  console.log(n)
  const inputs = [...Array(n)].map((index, item) => (
    <FormGroup>
      <Input name={`serial_no_${item}`} onChange={onChange} />
    </FormGroup>
  ));
  const [hasSerialNo, toggleHasSerial] = useState(false);
  const handleCheck = () => {console.log(hasSerialNo); toggleHasSerial(!hasSerialNo);};
  
  return (
    <div>
      <Card className='main-card mb-3'>
        <CardBody>
          <Row form>
            <Col md={12}>
              <CardTitle>Serial Numbers</CardTitle>

              <FormGroup check className='mb-2'>
                <Input
                  type='checkbox'
                  name='check'
                  id='exampleCheck'
                  required
                  onChange={handleCheck}
                />
                My products have serial numbers?
              </FormGroup>
              {hasSerialNo && (
                <CardTitle>Enter Serial Number for each product</CardTitle>
              )}
              {hasSerialNo && inputs}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};


export default ProductSerialNo;
