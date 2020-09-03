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

class FormDropZone extends React.Component {
  constructor() {
    super();
    this.state = {
      files: [],
    };
  }

  onDrop(files) {
    this.setState({ files });
  }

  onCancel() {
    this.setState({
      files: [],
    });
  }

  render() {
    const files = this.state.files.map((file) => (
      <ListGroupItem key={file.name}>
        {file.name} - {file.size} bytes
      </ListGroupItem>
    ));
    return (
      <Fragment>
        <Row>
          <Col md='12' className=''>
            <div
              className='dropzone-wrapper dropzone-wrapper-lg mb-2'
              style={{ height: '90px' }}
            >
              <Dropzone
                onDrop={this.onDrop.bind(this)}
                onFileDialogCancel={this.onCancel.bind(this)}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className='dropzone-content pt-3 pb-3'>
                      <p>
                        Drag or Drop Files , or click to select files to upload.
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
        </Row>
      </Fragment>
    );
  }
}

export default FormDropZone;
