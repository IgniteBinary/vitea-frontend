import React , {useState} from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const Prizing = ({onChange, product, disabled}) => {
  const [hasSerialNo, toggleHasSerial] = useState(false);
  const handleCheck = () => {
    console.log(hasSerialNo);
    toggleHasSerial(!hasSerialNo);
  };
  return (
    <Card className='main-card mb-3' data-tut='product_price_details'>
      <CardBody>
        <CardTitle>Pricing</CardTitle>
        <CSSTransitionGroup
          component='div'
          transitionName='TabsAnimation'
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Form
            className='d-grid'
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridGap: '10px',
            }}
          >
            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
              <Label for='exampleEmail22' className='mr-sm-2'>
                Price <span className='text-danger'>*</span>
              </Label>
              <Input
                type='number'
                name='price'
                id='exampleEmail22'
                placeholder='ksh'
                onChange={onChange}
                value={product && product.price}
                disabled={disabled && disabled}
              />
            </FormGroup>
            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
              <Label for='examplePassword22' className='mr-sm-2 '>
                Compare at price <span className='text-danger'>*</span>
              </Label>
              <Input
                type='number'
                name='compare_at_price'
                id='examplePassword22'
                placeholder='ksh'
                onChange={onChange}
                value={product && product.compare_at_price}
                disabled={disabled && disabled}
              />
            </FormGroup>
            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
              <Label for='examplePassword22' className='mr-sm-2'>
                Stock keeping unit <span className='text-danger'>*</span>
              </Label>
              <Input
                type='number'
                name='stock_keeping_unit'
                id='examplePassword22'
                onChange={onChange}
                value={product && product.stock_keeping_unit}
                disabled={disabled && disabled}
              />
            </FormGroup>
            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
              <Label for='examplePassword22' className='mr-sm-2'>
                Cost per item <span className='text-danger'>*</span>
              </Label>
              <Input
                type='number'
                name='cost_per_item'
                id='examplePassword22'
                placeholder='ksh'
                onChange={onChange}
                value={product && product.cost_per_item}
                disabled={disabled && disabled}
              />
            </FormGroup>
            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
              <Label for='examplePassword22' className='mr-sm-2'>
                Quantity <span className='text-danger'>*</span>
              </Label>
              <Input
                type='number'
                name='quantity'
                id='examplePassword22'
                onChange={onChange}
                value={product && product.quantity}
                disabled={disabled && disabled}
              />
            </FormGroup>
            <FormGroup check className='mb-2'>
              <Input
                type='checkbox'
                name='check'
                id='exampleCheck'
                required
                onChange={handleCheck}
              />
              Barcode?
              {hasSerialNo && (
                <Input
                  type='text'
                  name='text'
                  id='examplePassword22'
                  placeholder='Enter barcode number'
                  onChange={onChange}
                  value={product && product.barcode}
                  disabled={disabled && disabled}
                />
              )}
            </FormGroup>

            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
              <Label for='examplePassword22' className='mr-sm-2'>
                Weight (kgs) <span className='text-danger'>*</span>
              </Label>
              <Input
                type='number'
                name='weight'
                id='examplePassword22'
                onChange={onChange}
                value={product && product.weight}
                disabled={disabled && disabled}
              />
            </FormGroup>
          </Form>
          {/* <div className='divider' />
          <Form>
            <FormGroup check>
              <Label check>
                <Input type='checkbox' /> Charge tax on this product
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type='checkbox' /> Track Product quantity
              </Label>
            </FormGroup>
          </Form>
          <div className='divider' /> */}
        </CSSTransitionGroup>
      </CardBody>
    </Card>
  );
};

export default Prizing;
