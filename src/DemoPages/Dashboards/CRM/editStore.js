import React, { Component, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Col, Row, Card, CardBody, CardTitle } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import { connect } from 'react-redux';
import getALLStores from '../../../actions/stores/getAllStoresAction';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import PageTitle from '../../../Layout/AppMain/productTitle';
import StoreDetails from './storeDetails';
import ImageUpload from './dropZone';
import Geolocation from './googleMap';
import GetLocation from '../../../actions/location/getGeolocation';
import editStore from '../../../actions/stores/editStore';
import Validations from '../../../helpers/userValidations';
import { classnames } from './helpers';
import './style.scss';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
export class CreateStore extends Component {
         state = {
           store: {},
           update: {},
           error: {},
           isTourOpen: true,
           address: '',
           isGeocoding: true,
           errorMessage: '',
         };

         async componentDidMount() {
           const store = JSON.parse(localStorage.getItem('store'));
           this.props.getStores();
           await this.setState({
             store,
           });
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
           const {update} = this.state;

           console.log(update);
           this.setState({
             update: {
               ...update,
               [e.target.name]: e.target.value,
             },
           });
           this.setState({
             store: {
               ...store,
               [e.target.name]: e.target.value,
             },
             error: errors,
           });
           this.setState({
             ...update,
             [e.target.name]: e.target.value,
           });
         };

         testF = () => {
           console.log('paper work');
         };

         cancle = () => this.props.history.push('/dashboard/stores');

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
           const {update} = this.state
           update.id = this.state.store.id
           const { error } = this.state;
           if (Object.keys(error).length > 0) {
             toast.error('Invalid Fields', {
               position: toast.POSITION.TOP_RIGHT,
             });
             return false;
           }
           await this.props.editStore(update);
           if (this.props.Stores.success) {
             this.props.history.push('/dashboard/stores');
             //window.open(`http://${this.state.store.handle}.myjulla.shop`);
           }
         };

         render() {
           const accentColor = '#007bff';
           const { lat, lng } = this.state.store;
           const { errorMessage, address, isGeocoding } = this.state;
           const { store } = this.state;
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
                   subheading='Edit store'
                   icon='pe-7s-shopbag icon-gradient bg-ripe-malin'
                   cancle={this.cancle}
                 />

                 <Row>
                   <ToastContainer />
                   <Col md='8'>
                     <StoreDetails
                       onChange={this.handleInputChange}
                       store={store}
                     />
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
                           Search Store location
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
         editStore: (store) => dispatch(editStore(store)),
         getStores: () => dispatch(getALLStores()),
       });

export const mapStateToProps = (state) => ({
  ...state,
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateStore);
