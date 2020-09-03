import React, { Fragment } from 'react';

import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  CardTitle,
} from 'reactstrap';

import Dropzone from 'react-dropzone';
import ImagePreview from './photoPreview';
class FormDropZone extends React.Component {
  render() {
    const previewStyle = {
      width: 140,
      height: 140,
    };

    console.log(this.props.product)

    const files = this.props.files.map((file, index) => (
      <ListGroupItem
        key={file.name}
        style={{ marginBottom: '10px', paddingTop: '0px' }}
      >
        <button
          className='close'
          type='submit'
          onClick={() => this.props.onCancel(index)}
          style={{ marginBottom: '10px', marginTop: '0px' }}
        >
          &times;
        </button>
        <img src={file.preview} style={previewStyle} />
      </ListGroupItem>
    ));
    return (
      <Fragment>
        {this.props.product ? (
          <ImagePreview
            product={this.props.product}
            toggle={this.props.toggle}
            disabled={this.props.disabled}
          />
        ) : (
          <Row className='mt-3' data-tut='upload_product_photos'>
            <Col md='8 p-3'>
              <CardTitle className=''>
                Product Photos (Different side views ){' '}
                <span className='text-danger'>*</span>
              </CardTitle>
              <div className='dropzone-wrapper dropzone-wrapper-lg'>
                <Dropzone
                  onDrop={this.props.onDrop}
                  //onFileDialogCancel={this.props.onCancel}
                  multiple={true}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className='dropzone-content'>
                        <i
                          className='pe-7s-file'
                          style={{
                            fontSize: '60px',
                          }}
                        ></i>
                        <p>
                          Drag or Drop Files , or click to select files to
                          upload. Only PNG, JPEG and JPG allowed
                        </p>
                        <Button className='mb-2 mr-2' color='primary'>
                          Browse File
                        </Button>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
            </Col>
            <Col md='4 pt-3'>
              <b className='mb-2 d-block'>Product Images</b>
              <ListGroup>{files}</ListGroup>
            </Col>
          </Row>
        )}
      </Fragment>
    );
  }
}

export default FormDropZone;
