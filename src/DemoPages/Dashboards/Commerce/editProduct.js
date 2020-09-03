import React, { Component, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Col, Row } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import PageTitle from '../../../Layout/AppMain/productTitle';
import Pricing from './prizing';
import ProductDescription from './productDescription';
import TagsAndVariation from './tagsAndVariation';
import Validations from '../../../helpers/userValidations';
import { connect } from 'react-redux';
import editProduct from '../../../actions/products/editProduct';
import getALLStores from '../../../actions/stores/getAllStoresAction';
import EditPhotos from './editProductImage';
import getALLProducts from '../../../actions/products/getAllProductsAction';
export class EditProduct extends Component {
  state = {
    product: {},
    error: {},
    product_image: [],
    modal: false
  };

  handleToggle = () => this.setState({modal: !this.state.modal})

  onDrop = (files) => {
    console.log(this.state);
    this.setState({
      product_image: files,
    });
  };

  onCancel = () => {
    this.setState({
      product_image: [],
    });
  };

  async componentDidMount (){
    const product = JSON.parse(localStorage.getItem('product'))
    this.props.getStores()
    this.props.getAllProducts();
    await this.setState({
      product
    })
  }

  cancle = () => this.props.history.push('/dashboard/products');

  handleInputChange = (e) => {
    e.preventDefault();
    const data = { type: e.target.name, content: e.target.value };
    const errors = Validations(data, this.state.error);
    const { product } = this.state;
    console.log(this.state, 'Hello is me again');
    this.setState({
      product: {
        ...product,
        [e.target.name]: e.target.value,
      },
      error: errors,
    });
  };

  handleDescriptionChange = (e) => {
    console.log(this.state);
    this.setState({
      description: e.editor.getData(),
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = this.state;
    const { product } = this.state;
    if (Object.keys(error).length > 0) {
      toast.error('Invalid Fields', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
    // let data = new FormData();
    // for (let i in product) {
    //   data.append(i, product[i]);
    // }

    // const product_photos = [];

    // console.log(product_image);
    // for (let img = 0; img < product_image.length; img++) {
    //   //product_photos.push(product_image[img]);
    //   data.append('product_image', product_image[0]);
    // }
    
    await this.props.editProduct(product);
    console.log(product, 'my data')
    if (this.props.Products.success) {
      console.log('I succeeded')
      this.props.history.push('/dashboard/products');
    }
  };

  render() {
    const categories = this.props.Categories.categories;
    const stores = this.props.Stores.stores;
    const {product, modal} = this.state
    return (
      <Fragment>
        <CSSTransitionGroup
          component='div'
          transitionName='TabsAnimation'
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <PageTitle
            fOption='Cancel'
            tag='Adds new product'
            useCase='Save'
            heading='Products'
            subheading='Edit product'
            icon='pe-7s-shopbag icon-gradient bg-ripe-malin'
            toggle={this.handleSubmit}
            cancle={this.cancle}
          />

          <Row>
            <EditPhotos toggle={this.handleToggle} modal={modal}/>
            <ToastContainer />
            <Col md='8'>
              <ProductDescription
                onDrop={this.onDrop}
                product={product}
                onCancel={this.onCancel}
                files={this.state.product_image}
                onChange={this.handleInputChange}
                toggle={this.handleToggle}
              />
              <Pricing onChange={this.handleInputChange} product={product}/>
            </Col>
            <Col md='4'>
              <TagsAndVariation
                product={product}
                categories={categories}
                stores={stores}
                onChange={this.handleInputChange}
              />
            </Col>
          </Row>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  editProduct: (product) => dispatch(editProduct(product)),
  getStores: () => dispatch(getALLStores()),
  getAllProducts: () => dispatch(getALLProducts()),
});
const mapStateToProps = (state) => ({
  ...state,
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
