import React from 'react';
import {Card, CardBody, CardTitle, Col, Row, Label, FormGroup, Input} from 'reactstrap';
import { Multiselect, DropdownList } from 'react-widgets';
import DropDown from '../../dropDown';


const TagsAndVariation = ({categories, onChange, stores, disabled, product}) => {
 const tags = ['Electronics', 'Clothing', 'Utensils', 'furniture']
  return (
    <div>
      <Card className='main-card mb-3'>
        <CardBody>
          <Row form>
            <Col md={12}>
              <CardTitle>
                Store <span className='text-danger'>*</span>
              </CardTitle>
              <DropDown
                placeholder='Select product store'
                options={stores}
                itemValue='id'
                name='store_id'
                onChange={onChange}
                disabled={disabled && disabled}
              />
              <CardTitle>
                Categories <span className='text-danger'>*</span>
              </CardTitle>
              <DropDown
                placeholder='Select product  Category'
                options={categories}
                itemValue='_id'
                name='category'
                onChange={onChange}
                disabled={disabled && disabled}
              />
              <CardTitle>
                Subcategories <span className='text-danger'>*</span>
              </CardTitle>
              <Input
                name='sub_category'
                onChange={onChange}
                value={product && product.sub_category && product.sub_category}
                disabled={disabled && disabled}
              />
              <CardTitle>
                Sub Subcategories <span className='text-danger'>*</span>
              </CardTitle>
              <Input
                name='sub_sub_category'
                onChange={onChange}
                value={
                  product &&
                  product.sub_sub_category &&
                  product.sub_sub_category
                }
                disabled={disabled && disabled}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default TagsAndVariation;
