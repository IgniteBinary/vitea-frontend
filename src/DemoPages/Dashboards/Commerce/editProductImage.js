import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';
import InputBox from '../../inputbox';
import DropDown from '../../dropDown';
import Validations from '../../../helpers/userValidations';
import createUserAction from '../../../actions/users/createUserAction';
import getAllStores from '../../../actions/stores/getAllStoresAction';
import getALLUsers from '../../../actions/users/getAllUsersAction';
import updateImage from '../../../actions/products/editPhoto';
import Loader from 'react-loaders';
import ImageDropZone from './dropZone';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';

class ModalBackdrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  onPreviewDrop = (files) => {
    this.setState({
      files: this.state.files.concat(
        files.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      ),
    });
  };

  onCancel = (img_index) => {
    const { files } = this.state;
    console.log(files);
    files.splice(img_index, 1);
    console.log(files);
    this.setState({
      files,
    });
  };

  handleSubmit = async (e) => {
     const { files } = this.state;
    e.preventDefault();
    if (files.length === 0){
        toast.error('Please select at least one image', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return false;
    }
    let data = new FormData();
    for (let i = 0; i< files.length; i++){
        data.append(`product_image`, files[i])
    }
    await this.props.editPhoto(data)
    if(this.props.Products.success){
      toast.success('Product image updated successfuly')
      this.props.toggle()
    }
  };


  render() {
    const { files } = this.state;
    const closeBtn = (
      <button className='close' type='submit' onClick={this.props.toggle}>
        &times;
      </button>
    );
    return (
      <span className='d-inline-block mb-2 mr-2 create-user-modal'>
        <ToastContainer />
        <Modal
          isOpen={this.props.modal}
          toggle={this.props.toggle}
          className={this.props.className}
          backdrop={this.state.backdrop}
          size="lg"
        >
          <ModalHeader toggle={this.props.toggle} close={closeBtn}>
            Edit product photos
          </ModalHeader>
          <ModalBody>

              <ImageDropZone onDrop={this.onPreviewDrop} onCancel={this.onCancel} files={files}/>
              <ModalFooter>
                <span
                  className='text-secondary cancel-link'
                  onClick={this.props.toggle}
                >
                  Cancel
                </span>
                <Button className='create-user' type='submit' onClick={this.handleSubmit}>
                  {this.props.Products.isLoading ? (
                    <Loader type='ball-pulse-sync' color='#fff' />
                  ) : (
                    'Submit'
                  )}
                </Button>{' '}
              </ModalFooter>
          </ModalBody>
        </Modal>
      </span>
    );
  }
}
export const mapDispatchToProps = (dispatch) => ({
  editPhoto: (photo) => dispatch(updateImage(photo)),
  createUser: (user) => dispatch(createUserAction(user)),
  getUsers: () => dispatch(getALLUsers),
});
export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalBackdrop);
