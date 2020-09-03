import React, { Fragment } from 'react';

import { Row, Col, ListGroup, ListGroupItem, Button, CardTitle } from 'reactstrap';

import Dropzone from 'react-dropzone';

class FormDropZone extends React.Component {
  constructor() {
    super();
    this.state = {
      files: [],
    };
  }

  onDrop = (files) => {
    this.setState({
      files: files.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    });
  };

  onCancel() {
    this.setState({
      files: [],
    });
  }

  render() {
      const previewStyle = {
        width: 140,
        height: 100,
      };
    const files = this.state.files.map((file) => (
      <ListGroupItem key={file.name}>
        <img src={file.preview} style={previewStyle} />
      </ListGroupItem>
    ));
    return (
      <Fragment>
        <Row>
          <Col md='12' className='card' data-tut='upload_store_photo'>
            <CardTitle className='mt-1'>Store Logo </CardTitle>
            <div
              className='dropzone-wrapper dropzone-wrapper-lg mb-2'
              style={{ height: '250px' }}
            >
              <Dropzone
                onDrop={this.onDrop.bind(this)}
                onFileDialogCancel={this.onCancel.bind(this)}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className='dropzone-content'>
                      {files.length === 0 && (
                        <i
                          className='pe-7s-file'
                          style={{
                            fontSize: '60px',
                            marginBottom: '10px'
                          }}
                        ></i>
                      )}
                      <ListGroup>{files}</ListGroup>
                      <Button className='mb-2 mr-2 mt-2' color='primary'>
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
