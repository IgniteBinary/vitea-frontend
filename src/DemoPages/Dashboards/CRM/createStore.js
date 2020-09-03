import React, { Component, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Col, Row, Card, CardTitle } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import StoreDetails from './storeDetails';
import ImageUpload from './dropZone';
import Geolocation from './googleMap';
import GetLocation from '../../../actions/location/getGeolocation';
import createStore from '../../../actions/stores/createStore';
import Validations from '../../../helpers/userValidations';
import { classnames } from './helpers';
import DropDown from '../../dropDown';
import './style.scss';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export class CreateStore extends Component {
         state = {
           store: {
             name: null,
             handle: null,
             address: null,
             mobile_no: null,
             email: null,
             lat: null,
             lng: null,
             store_type: null,
             image_url: 'image',
           },
           error: {},
           steps: [
             {
               selector: '[data-tut="store_details"]',
               content:
                 ' Fill in your store details. Kindly note that the details entered in your "handle" will be part of your store url and cannot be changed after. click on the arrow pointing to your right for the next tutorial or close to skip',
             },
             {
               selector: '[data-tut="select_store_location"]',
               content:
                 ' On the search bar  provided, kindly input the name of the location where your store is located then select from the list that pops bellow the search bar your store location.',
             },
             {
               selector: '[data-tut="upload_store_photo"]',
               content: 'Upload your company logo in JPEG or PNG format. ',
             },
             {
               selector: '[data-tut="save_store"]',
               content:
                 'Click Save to complete the store creation process or cancel to cancel store creation',
             },

             // ...
           ],
           isTourOpen: false,
           address: '',
           isGeocoding: true,
           errorMessage: '',
         };

         componentDidMount() {
          //  if (!CheckUser()) {
          //    toast.error('Your session has expired redirecting to Login');
          //    window.setTimeout(() => {
          //      window.location.href = '/';
          //    }, 4000);
          //  }
           const tut = localStorage.getItem('create_store_tut');
           if (tut && tut === 'off') {
             this.closeTour();
           }

           localStorage.setItem('create_store_tut', 'off');

         }

         handleChange = (address) => {
           const { store } = this.state;
           this.setState({
             store: {
               ...store,
               lat: null,
               lng: null,
             },
             address,
             errorMessage: '',
           });
         };

         handleSelect = (selected) => {
           this.setState({ isGeocoding: true, address: selected });
           geocodeByAddress(selected)
             .then((res) => getLatLng(res[0]))
             .then(({ lat, lng }) => {
               const { store } = this.state;
               this.setState({
                 store: {
                   ...store,
                   lat,
                   lng,
                 },
                 isGeocoding: false,
               });
             })
             .catch((error) => {
               this.setState({ isGeocoding: false });
               console.error('Error', error);
             });
         };

         handleCloseClick = () => {
           const { store } = this.state;
           this.setState({
             ...store,
             store: {
               lat: null,
               lng: null,
             },
             address: '',
           });
         };

         cancle = () => this.props.history.push('/dashboard/stores');

         handleError = (status, clearSuggestions) => {
           toast.error('Error from Google Maps API');
           this.setState({ errorMessage: status }, () => {
             clearSuggestions();
           });
         };

         disableBody = (target) => disableBodyScroll(target);
         enableBody = (target) => enableBodyScroll(target);

         closeTour = () => {
           this.setState({ isTourOpen: false });
         };

         openTour = () => {
           this.setState({ isTourOpen: true });
         };

         handleInputChange = (e) => {
           e.preventDefault();
           const data = { type: e.target.name, content: e.target.value };
           const errors = Validations(data, this.state.error);
           const { store } = this.state;
           console.log(store);
           this.setState({
             store: {
               ...store,
               [e.target.name]: e.target.value,
             },
             error: errors,
           });
         };

         testF = () => {
           console.log('paper work');
         };

         handleSelectLocation = async (t, map, coord) => {
           const { latLng } = coord;
           const lat = await latLng.lat();
           const lng = await latLng.lng();
           this.setState({
             store: {
               ...this.state.store,
               lat: lat,
               lng: lng,
             },
           });

           console.log(lat, lng);
           // call reverse geolocation here
           this.props.getGeolocation(lat, lng);
         };

         handleSubmit = async (e) => {
           e.preventDefault();
           const { createStore } = this.props;
           const { error } = this.state;
           if (Object.keys(error).length > 0) {
             toast.error('Invalid Fields', {
               position: toast.POSITION.TOP_RIGHT,
             });
             return false;
           }

           if (this.state.store.store_type === null) {
             toast.error('Store type cannot be empty', {
               position: toast.POSITION.TOP_RIGHT,
             });
             return false;
           }
           await createStore(this.state.store);
           if (this.props.Stores.success) {
             this.props.history.push('/dashboard/stores');
             if(this.state.store.store_type === 'online'){
                 window.open(`http://${this.state.store.handle}.myjulla.shop`);
             }else {
                toast.success('Offline store created successfully', {
                  position: toast.POSITION.TOP_RIGHT,
                });

             }
           
           }
         };

         render() {
           const accentColor = '#007bff';
           const { lat, lng } = this.state.store;
           const { errorMessage, address, isGeocoding } = this.state;
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
                   toggle={this.handleSubmit}
                   useCase='Save'
                   data_tut='save_store'
                   heading='Stores'
                   subheading='Create Store'
                   icon='pe-7s-shopbag icon-gradient bg-ripe-malin'
                   cancle={this.cancle}
                 />

                 <Row>
                   <ToastContainer />
                   {this.state.isTourOpen && (
                     <Tour
                       steps={this.state.steps}
                       isOpen={this.state.isTourOpen}
                       onRequestClose={this.closeTour}
                       rounded={5}
                       accentColor={accentColor}
                       onAfterOpen={false}
                       onBeforeClose={this.enableBody}
                     />
                   )}

                   <Col md='8'>
                     <StoreDetails onChange={this.handleInputChange} />
                     <Card
                       className='pt-3 mb-3'
                       data-tut='select_store_location'
                     >
                       {this.props.Geolocation.location ? (
                         <div className='text-center mb-3'>
                           Selected Location:{' '}
                           <span className='text-danger'>
                             {this.props.Geolocation.location}
                           </span>
                         </div>
                       ) : (
                         <CardTitle className='ml-3'>
                           Search Store location{' '}
                           <span className='text-danger'>*</span>
                         </CardTitle>
                       )}
                       {/* <Geolocation onClick={this.handleSelectLocation} /> */}
                       <PlacesAutocomplete
                         onChange={this.handleChange}
                         value={address}
                         onSelect={this.handleSelect}
                         onError={this.handleError}
                         shouldFetchSuggestions={address.length > 2}
                       >
                         {({
                           getInputProps,
                           suggestions,
                           getSuggestionItemProps,
                         }) => {
                           return (
                             <div className='Demo__search-bar-container'>
                               <div className='Demo__search-input-container'>
                                 <input
                                   {...getInputProps({
                                     placeholder:
                                       'Search your store location here ...',
                                     className: 'Demo__search-input',
                                   })}
                                 />
                                 {this.state.address.length > 0 && (
                                   <button
                                     className='Demo__clear-button'
                                     onClick={this.handleCloseClick}
                                   >
                                     x
                                   </button>
                                 )}
                               </div>
                               {suggestions.length > 0 && (
                                 <div className='Demo__autocomplete-container'>
                                   {suggestions.map((suggestion) => {
                                     const className = classnames(
                                       'Demo__suggestion-item',
                                       {
                                         'Demo__suggestion-item--active':
                                           suggestion.active,
                                       }
                                     );

                                     return (
                                       /* eslint-disable react/jsx-key */
                                       <div
                                         {...getSuggestionItemProps(
                                           suggestion,
                                           {
                                             className,
                                           }
                                         )}
                                       >
                                         <strong>
                                           {
                                             suggestion.formattedSuggestion
                                               .mainText
                                           }
                                         </strong>{' '}
                                         <small>
                                           {
                                             suggestion.formattedSuggestion
                                               .secondaryText
                                           }
                                         </small>
                                       </div>
                                     );
                                     /* eslint-enable react/jsx-key */
                                   })}
                                 </div>
                               )}
                             </div>
                           );
                         }}
                       </PlacesAutocomplete>
                       {errorMessage.length > 0 && (
                         <div className='Demo__error-message'>
                           {this.state.errorMessage}
                         </div>
                       )}
                     </Card>
                   </Col>
                   <Col md='4'>
                     <ImageUpload />
                   </Col>
                 </Row>
               </CSSTransitionGroup>
             </Fragment>
           );
         }
       }

export const mapDispatchToProps = (dispatch) => ({
  getGeolocation: (lat, lng) => dispatch(GetLocation(lat, lng)),
  createStore: (store) => dispatch(createStore(store)),
});

export const mapStateToProps = (state) => ({
  ...state,
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateStore);
