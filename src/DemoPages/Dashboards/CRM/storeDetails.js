import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import ImageUploader from './dropZone';
import DropDown from '../../dropDown';

const Prizing = ({ onChange, store}) => {
  return (
    <Card className='main-card mb-3'>
      <CardBody data-tut='store_details'>
        <CardTitle>Store details</CardTitle>
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
            <FormGroup
              className='mb-2 mr-sm-2 mb-sm-0'
              style={{ marginTop: '22px' }}
            >
              <Label for='exampleEmail22' className='mr-sm-2'>
                Store Name <span className='text-danger'>*</span>
              </Label>
              <Input
                type='text'
                name='name'
                id='exampleEmail22'
                onChange={onChange}
                value={store && store.name}
              />
            </FormGroup>
            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
              <Label for='examplePassword22' className='mr-sm-2'>
                Handle (this will be your online store name e.g
                http://handle.myjulla.shop){' '}
                <span className='text-danger'>*</span>
              </Label>
              <Input
                type='text'
                name='handle'
                id='examplePassword22'
                onChange={onChange}
                value={store && store.handle}
              />
            </FormGroup>
            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
              <Label for='examplePassword22' className='mr-sm-2'>
                Address (Location name) <span className='text-danger'>*</span>
              </Label>
              <Input
                type='text'
                name='address'
                id='examplePassword22'
                onChange={onChange}
                value={store && store.address}
              />
            </FormGroup>
            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
              <Label for='examplePassword22' className='mr-sm-2'>
                Mobile Number <span className='text-danger'>*</span>
              </Label>
              <Input
                type='text'
                name='mobile_no'
                id='examplePassword22'
                onChange={onChange}
                value={store && store.mobile_no}
              />
            </FormGroup>
            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
              <Label for='examplePassword22' className='mr-sm-2'>
                Email <span className='text-danger'>*</span>
              </Label>
              <Input
                type='email'
                name='email'
                id='examplePassword22'
                placeholder='store@mail.com'
                onChange={onChange}
                value={store && store.email}
              />
            </FormGroup>

            <FormGroup>
              <DropDown
                classes='create-user-input'
                label={`Store type *`}
                name='store_type'
                options={[{ name: 'online' }, { name: 'offline' }]}
                onChange={onChange}
                itemValue='name'
              />
            </FormGroup>
          </Form>
        </CSSTransitionGroup>
      </CardBody>
    </Card>
  );
};

export default Prizing;
