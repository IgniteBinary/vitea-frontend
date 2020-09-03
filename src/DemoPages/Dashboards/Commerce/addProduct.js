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
import createProduct from '../../../actions/products/createProductAction';
import getALLStores from '../../../actions/stores/getAllStoresAction';
import getAllCategories from '../../../actions/categories/getCategories';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import CheckUser from '../../../helpers/authorization';
import ProductSerialNo from './productSerial';
import LoadingOverlay from 'react-loading-overlay';
export class AddProduct extends Component {
         state = {
           product: {
             store_id: '',
             category: '',
             sub_category: '',
             sub_sub_category: '',
             title: '',
             description: '',
             price: '',
             compare_at_price: '',
             cost_per_item: '',
             quantity: '',
             stock_keeping_unit: '',
             barcode: '',
             weight: '',
            //  serial_no: []
           },
           error: {},
           product_image: [],
           files: [],
           serial_no: {},
           steps: [
             {
               selector: '[data-tut="product_details"]',
               content:
                 'Add product details here, including; product name, description, and photos ',
             },
             {
               selector: '[data-tut="product_price_details"]',
               content:
                 '  Input the pricing, stock unit, quantity, weight and the barcode or the product',
             },
             {
               selector: '[data-tut="save_product"]',
               content:
                 'Click Save to add product or cancel to cancel product creation',
             },
           ],
           isTourOpen: false,
         };

         componentDidMount() {
           if (!CheckUser()) {
             toast.error('Your session has expired redirecting to Login');
             window.setTimeout(() => {
               window.location.href = '/';
             }, 4000);
           }

           const tut = localStorage.getItem('add_product_tut');
           if (tut && tut === 'off') {
             this.closeTour();
           }

           localStorage.setItem('add_product_tut', 'off');
           this.props.getStores();
           this.props.getAllCategories();
         }

         // onDrop = (files) => {
         //   console.log(this.state);
         //   this.setState({
         //     product_image: this.state.product_image.concat(files),
         //   });
         // };
         disableBody = (target) => disableBodyScroll(target);
         enableBody = (target) => enableBodyScroll(target);

         closeTour = () => {
           this.setState({ isTourOpen: false });
         };

         openTour = () => {
           this.setState({ isTourOpen: true });
         };

         onDrop = (files) => {
           this.setState({
             files: files.map((file) =>
               Object.assign(file, {
                 preview: URL.createObjectURL(file),
               })
             ),
           });
         };

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

         cancle = () => this.props.history.push('/dashboard/products');

         handleChangeSerialNo = (e) => {
           e.preventDefault();
           const data = { type: e.target.name, content: e.target.value };
           const errors = Validations(data, this.state.error);
           const { product } = this.state;
           const { serial_no } = this.state;
           console.log(this.state.serial_no);
           this.setState({
               serial_no: {
                 ...serial_no,
                 [e.target.name]: e.target.value,
               },
             error: errors,
           });
         };

         handleInputChange = (e) => {
           e.preventDefault();
           const data = { type: e.target.name, content: e.target.value };
           const errors = Validations(data, this.state.error);
           const { product } = this.state;
           console.log(this.state);
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
           const { createProduct } = this.props;
           const { error } = this.state;
           const { product } = this.state;
           const { product_image } = this.state;
           const { files } = this.state;
           const serial_numbers = Object.values(this.state.serial_no)
           //product.serial_no = serial_numbers;
           //console.log(serial_numbers)

          //  if (Object.values(this.state.product).indexOf(null) > -1) {
          //    console.log(this.state.error);
          //    toast.error('Missing or invalid fields', {
          //      position: toast.POSITION.TOP_RIGHT,
          //    });
          //    return false;
          //  }

           if (this.state.product.store_id.length === 0) {
             toast.error('Please select store', {
               position: toast.POSITION.TOP_RIGHT,
             });
             return false;
           }
          //  if (serial_numbers.length !== 0) {
          //    this.setState({
          //      product: {
          //        ...product,
          //        serial_no: serial_numbers,
          //      },
          //    });
          //  }
           if (this.state.product.category.length === 0) {
             toast.error('Please select product category', {
               position: toast.POSITION.TOP_RIGHT,
             });
             return false;
           } else {
             let data = new FormData();
             for (let i in product) {
               data.append(i, product[i]);
             }
             for (let i = 0; i < files.length; i++) {
               data.append(`product_image`, files[i]);
             }

             for (let i = 0; i < serial_numbers.length; i++) {
               data.append(`serial_numbers`, serial_numbers[i]);
             }

             for (var pair of data.entries()) {
               console.log(pair[0] + ', ' + pair[1]);
             }
             console.log(product)
             await createProduct(data);
            //  if (this.props.Products.createProductError) {
            //    toast.error('Product with this barcode already exists');
            //  }
             if (this.props.Products.success) {
               toast.success('Product added successfully');
               this.props.history.push('/dashboard/products');
             } else {
               return false;
             }
           }

           //console.log(product_image);

           // for (let img = 0; img < product_image.length; img++) {
           //   //product_photos.push(product_image[img]);
           //   data.append('product_image', product_image[0]);
           // }

           // data.append('product_image', JSON.stringify(product_image));
         };

         render() {
           const categories = this.props.Categories.categories;
           const accentColor = '#007bff';
           const stores = this.props.Stores.stores;
           console.log(stores);
           return (
             <Fragment>
               <LoadingOverlay
                 active={this.props.Products.isLoading}
                 spinner
                 text='Adding product...'
               >
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
                     subheading='Add product'
                     icon='pe-7s-shopbag icon-gradient bg-ripe-malin'
                     toggle={this.handleSubmit}
                     cancle={this.cancle}
                     data_tut='save_product'
                   />

                   <Row>
                     <ToastContainer />
                     {this.state.isTourOpen && <Tour
                       steps={this.state.steps}
                       isOpen={this.state.isTourOpen}
                       onRequestClose={this.closeTour}
                       rounded={5}
                       accentColor={accentColor}
                       onAfterOpen={this.false}
                       onBeforeClose={this.enableBody}
                     /> }
                     <Col md='8'>
                       <ProductDescription
                         onDrop={this.onPreviewDrop}
                         onCancel={this.onCancel}
                         files={this.state.files}
                         onChange={this.handleInputChange}
                       />
                       <Pricing onChange={this.handleInputChange} />
                     </Col>
                     <Col md='4'>
                       <TagsAndVariation
                         categories={categories}
                         stores={stores}
                         onChange={this.handleInputChange}
                       />
                       <ProductSerialNo
                         quantity={this.state.product.quantity}
                         onChange={this.handleChangeSerialNo}
                       />
                     </Col>
                   </Row>
                 </CSSTransitionGroup>
               </LoadingOverlay>
             </Fragment>
           );
         }
       }

const mapDispatchToProps = (dispatch) => ({
  createProduct: (product) => dispatch(createProduct(product)),
  getAllCategories: () => dispatch(getAllCategories()),
  getStores: () => dispatch(getALLStores()),
});
const mapStateToProps = (state) => ({
  ...state,
});
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
