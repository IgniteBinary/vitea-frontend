import React, { Fragment } from 'react';

import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';

import Dropzone from 'react-dropzone';

class FormDropZone extends React.Component {
  render() {
    const previewStyle = {
      width: 140,
      height: 100,
    };
    const files = this.props.files && this.props.files.map((file) => (
      <ListGroupItem key={file.name}>
        <img src={file.preview} style={previewStyle} />
      </ListGroupItem>
    ));
    return (
      <Fragment>
        <Row>
          <Col md='12' className=''>
            <div
              className='dropzone-wrapper dropzone-wrapper-lg mb-2'
              style={{ height: '150px' }}
            >
              <Dropzone
                onDrop={this.props.onDrop}
                onFileDialogCancel={this.props.onCancel}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className='dropzone-content'>
                      { files && files.length === 0 && (
                        <i
                          className='pe-7s-file'
                          style={{
                            fontSize: '50px',
                            marginBottom: '10px',
                          }}
                        ></i>
                      )}
                      <ListGroup>{files}</ListGroup>
                      <Button className='mb-2 mr-2 mt-2' color='primary'>
                        {files && files.length > 0 ? 'Change Image' : 'Browse File'}
                      </Button>
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default FormDropZone;
