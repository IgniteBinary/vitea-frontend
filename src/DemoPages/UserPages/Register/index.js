import React, { Fragment, Component } from 'react';
 import Intercom from 'react-intercom';
import Slider from 'react-slick';

import img from '../../../assets/utils/images/app_logo.png';
import axios from 'axios';
import { Col, Row } from 'reactstrap';
import MerchantOnbording from './Merchants/Variation1';
import createFacility from '../../../actions/facility/createFacility';
import imageUpload from '../../../actions/apploadImageAction/';
import logoUpload from '../../../actions/apploadImageAction/image_url';
import certUpload from '../../../actions/apploadImageAction/certification';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
export class Register extends Component {
         
         state = {
           facility: {
             name: null,
             location: {
               lat: null,
               lng: null
             },
             owner: null,
             description: null,
             tagline: null,
             image_url: null,
             logo_url: null,
             certifications: null,
             phone_no: null,
             email: null,
           },
           address: '',
           errorMessage: '',
           isGeocoding: true, 
           errors: {},
           success: false
         };

         onDropLogo = (files) => {
           const {facility} = this.state
           this.setState({
             facility: {
               ...facility,
                logo_url: files.map((file) =>
                  Object.assign(file, {
                    preview: URL.createObjectURL(file),
                  })
                ),

             }
           });
           console.log(this.state.facility)
         };

        onDropImage = (files) => {
          const { facility } = this.state
          this.setState({
            facility: {
              ...facility,
              image_url: files.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              ),

            }
          });
        };

    onDropCert = (files) => {
      const { facility } = this.state
      console.log(facility)
      this.setState({
        facility: {
          ...facility,
          certifications: files.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),

        }
      });
    };

        handleChange = (address) => {
          const { facility } = this.state;
          this.setState({
            facility: {
              ...facility,
              location: {
                lat: null,
                lng: null
              }
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
              const { facility } = this.state;
              this.setState({
                facility: {
                  ...facility,
                  location: {
                    lat,
                    lng
                  }
                  
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
          const { facility } = this.state;
          this.setState({
           
            facility: {
              ...facility,
              location: {
                lat: null,
                lng: null,
              }
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


         cancle = () => this.props.history.push('/dashboard/products');

         //Handle validation

         handleValidation() {
           let fields = this.state.facility;
           let errors = {};
           let formIsValid = true;

           //Name
           if (!fields['name']) {
             formIsValid = false;
             errors['name'] = 'Business name is required';
           }

           if (fields['tagline'] === null) {
             formIsValid = false;
             errors['tagline'] = ' Tag line is required';
           }

           if (fields['details'] === null) {
             formIsValid = false;
             errors['details'] = 'Please enter a description';
           }

           if (fields['phone'] === null) {
             formIsValid = false;
             errors['phone'] = 'Please enter a valid phone number';
           }

           if (fields['owner'] === null) {
             formIsValid = false;
             errors['owner'] = 'Owner cannot be empty';
           }

           //  if (fields['name'] !== null ) {
           //    if (!fields['name'].match(/^[a-zA-Z]+$/)) {
           //      formIsValid = false;
           //      errors['name'] = 'Only letters';
           //    }
           //  }

           if (!this.state.facility.certifications || this.state.facility.certifications.length === 0) {
             formIsValid = false;
             errors['image'] = 'Image is required';
           }

           //Email
           if (!fields['email']) {
             formIsValid = false;
             errors['email'] = 'Email Cannot be empty';
           }

           if (fields['email'] !== null) {
             let lastAtPos = fields['email'].lastIndexOf('@');
             let lastDotPos = fields['email'].lastIndexOf('.');

             if (
               !(
                 lastAtPos < lastDotPos &&
                 lastAtPos > 0 &&
                 fields['email'].indexOf('@@') == -1 &&
                 lastDotPos > 2 &&
                 fields['email'].length - lastDotPos > 2
               )
             ) {
               formIsValid = false;
               errors['email'] = 'Email is not valid';
             }
           }

           this.setState({ errors: errors });
           return formIsValid;
         }

         handleCheck= () => {
           console.log('yess')
           this.setState({ terms: !this.state.terms });
         };

         uploadImageHandler = async () => {
           const { image_url, logo_url, certifications } = this.state.facility
           const {imageUpload, logoUpload, certUpload} = this.props
           const imageformData = new FormData();
           const certformData = new FormData();
           const logoformData = new FormData();

           imageformData.append('file', image_url[0]);
           imageformData.append('upload_preset', 'tqqaksss');
          
           certformData.append('file', certifications[0]);
           certformData.append('upload_preset', 'tqqaksss');

           logoformData.append('file', logo_url[0]);
           logoformData.append('upload_preset', 'tqqaksss');

           let first_image = imageUpload(imageformData)
           let sec_image = logoUpload(logoformData)
           let third_image = certUpload(certformData)

           await Promise.all([first_image, sec_image, third_image])
           
           
         }

         //Handles input change
         handleInputChange = (e) => {
           e.preventDefault();
           // const data = {
           //   type: e.target.name,
           //   content: e.target.value,
           // };
           //const errors = Validations(data, this.state.error);
           const { facility } = this.state;
           console.log(this.state);
           this.setState({
             facility: {
               ...facility,
               [e.target.name]: e.target.value,
             },
           });
         };

         handleSubmit = async () => {
           const {name, location, tagline, owner, description, phone_no, email} = this.state.facility;
           if (Object.keys(this.state.errors).length > 0) {
             toast.error('Invalid Fields', {
               position: toast.POSITION.TOP_RIGHT,
             });
             return false;
           }
           if (!this.handleValidation()) {
             toast.error('Invalid fields kindly fix the errors');
             return false;
           }

           if (!this.state.terms) {
             toast.error('Kindly accept the terms and conditions to proceed');
             return false;
           }

           if (this.state.facility.certifications.length === 0) {
             toast.error('Kindly upload at least one surppoting document');
             return false;
           }
           if(this.state.facility.image_url.length === 0){
             toast.error('Kindly upload facility image')
             return false
           }

           if (this.state.facility.logo_url.length === 0) {
             toast.error('Kindly upload facility logo')
             return false
           }

           const facilityObject = {

             name,
             location,
             tagline,
             owner,
             description,
             phone_no,
             email,
             image_url: this.props.Image.img_url,
             certifications: this.props.Certifications.cert_url,
             logo_url: this.props.Logo.logo_url

           }

           let imageUploader = this.uploadImageHandler()
           let createFacility = this.props.createFacility(facilityObject)

           await Promise.all([imageUploader, createFacility])
           // data.append('product_image', JSON.stringify(product_image));
          //  createMerchant(data);
           console.log(this.props.Facility.success);
           if (this.props.Facility.success) {
             console.log(this.props.Facility.success);
             this.setState({
               success: true,
             });
           }
         };
         render() {
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
                 <Intercom appID='wz6k5k91' />
                 <Row
                   style={{
                     width: '80%',
                     margin: '0 auto',
                   }}
                   className=' no-gutters'
                 >
                   <Col lg='12' md='12'>
                     <PageTitle
                       heading='Facility Self Onboarding'
                       subheading='Create Account'
                       img={img}
                     />
                   </Col>
                 </Row>

                 <Row
                   style={{
                     width: '80%',
                     margin: '0 auto',
                   }}
                 >
                   <Col
                     lg='12'
                     md='12'
                     className=' mt-4 d-md-flex d-sm-block'
                   >
                     <MerchantOnbording
                       errors={this.state.errors}
                       handleInputChange={this.handleInputChange}
                       handleSubmit={this.handleSubmit}
                       onDropLogo={this.onDropLogo}
                       onDropImage={this.onDropImage}
                       onDropCert={this.onDropCert}
                       onCancel={this.onCancel}
                       success={this.state.success}
                       LogoFiles={this.state.facility.logo_url}
                       ImageFiles={this.state.facility.image_url}
                       Certfiles ={this.state.facility.certifications}
                       handleCheck={this.handleCheck}
                       address={this.state.address}
                       isGeocoding={this.state.isGeocoding}
                       errorMessage={this.state.errorMessage}
                       handleChange={this.handleChange}
                       handleSelect={this.handleSelect}
                       handleCloseClick={this.handleCloseClick}
                       handleError={this.handleError}
                     />
                   </Col>
                 </Row>
               </CSSTransitionGroup>
             </Fragment>
           );
         }
       }

const mapDispatchToProps = (dispatch) => ({
  createFacility: (facility) => dispatch(createFacility(facility)),
  imageUpload: (image) => dispatch(imageUpload(image)),
  certUpload: (cert) => dispatch(certUpload(cert)),
  logoUpload: (logo) => dispatch(logoUpload(logo))
});
const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
