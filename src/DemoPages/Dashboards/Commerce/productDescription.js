import React from 'react';
import {Card, CardBody, Form, FormGroup, Label, CardTitle, Input} from 'reactstrap';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import FormCkEditorEditor from './productMeta';
import FormDropZone from './dropZone';
const ProductDescription = ({onChange, files, onDrop, onCancel, product, toggle, disabled}) => {
    return (
      <Card className='main-card mb-3' data-tut='product_details'>
        <CardBody>
          <CSSTransitionGroup
            component='div'
            transitionName='TabsAnimation'
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Form>
              <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
                <CardTitle className='mt-3'>
                  Product Name <span className='text-danger'>*</span>
                </CardTitle>
                <Input
                  type='text'
                  name='title'
                  id='exampleEmail22'
                  onChange={onChange}
                  value={product && product.title}
                  disabled={disabled && disabled}
                />
              </FormGroup>
            </Form>
            <FormCkEditorEditor
              onChange={onChange}
              product={product}
              disabled={disabled && disabled}
            />
            <FormDropZone
              files={files}
              onDrop={onDrop}
              onCancel={onCancel}
              product={product}
              toggle={toggle}
              disabled={disabled && disabled}
            />
          </CSSTransitionGroup>
        </CardBody>
      </Card>
    );
}

export default ProductDescription;
