import React from 'react';
import {CardTitle, Button} from 'reactstrap'

const photoPreview = ({ product, toggle, disabled }) => {
  return (
    <div className=' pd-4 text-center mt-3'>
      <CardTitle>Product photos</CardTitle>
      {!disabled && (
        <Button color='primary' onClick={toggle}>
          Edit photos
        </Button>
      )}

      <div className='row  mt-2 pt-2 pb-2'>
        {product.product_image &&
          product.product_image.map((img_src) => (
            <div className='col-md-4 ml-2 card'>
              <div className='thumbnail'>
                <img src={img_src} alt='Lights' style={{ width: '100%' }} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default photoPreview;
