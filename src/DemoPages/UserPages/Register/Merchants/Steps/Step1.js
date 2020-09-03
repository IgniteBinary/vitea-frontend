import React, { Fragment } from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import ImageUpload from '../imageDropZone';
import { Errors } from 'react-redux-form';
import {classnames}  from './helpers';
import './style.scss';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export default class WizardStep1 extends React.Component {

  render() {
    const {address, handleChange, handleSelect, handleCloseClick, errorMessage, handleError, onDropCert} = this.props
    return (
      <Fragment>
        <div className='form-wizard-content'>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for='exampleAddress'>Facility Name*</Label>
                <Input
                  type='text'
                  name='name'
                  id='exampleAddress'
                  onChange={this.props.handleInputChange}
                  required
                />
                <p style={{ color: 'red' }}>{this.props.errors && this.props.errors.name}</p>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='exampleAddress2'>Owner*</Label>
                <Input
                  type='text'
                  name='owner'
                  id='exampleAddress2'
                  onChange={this.props.handleInputChange}
                  required
                />
                <p style={{ color: 'red' }}>{this.props.errors && this.props.errors.phone}</p>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for='exampleAddress'>Facility Tag Line*</Label>
                <Input
                  type='text'
                  name='tagline'
                  id='exampleAddress'
                  onChange={this.props.handleInputChange}
                  required
                />
                <p style={{ color: 'red' }}>{this.props.errors && this.props.errors.tagline}</p>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='exampleAddress2'>
                  Facility Email*
                </Label>
                <Input
                  type='email'
                  name='email'
                  id='exampleAddress2'
                  onChange={this.props.handleInputChange}
                  required
                />
                <p style={{ color: 'red' }}>{this.props.errors && this.props.errors.email}</p>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for='exampleAddress'>Facility Location*</Label>
                <PlacesAutocomplete
                  onChange={handleChange}
                  value={address}
                  onSelect={handleSelect}
                  onError={handleError}
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
                          {address.length > 0 && (
                            <button
                              className='Demo__clear-button'
                              onClick={handleCloseClick}
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
                    {errorMessage}
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='exampleAddress2'>
                  Facility Phone Number*
                </Label>
                <Input
                  type='text'
                  name='phone_no'
                  id='exampleAddress2'
                  onChange={this.props.handleInputChange}
                  required
                />
                <p style={{ color: 'red' }}>{this.props.errors && this.props.errors.email}</p>
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for='exampleState'>Facility Logo*</Label>
                <ImageUpload
                  onDrop={this.props.onDropLogo}
                  files={this.props.Logofiles}
                />
                <p style={{ color: 'red' }}>{this.props.errors && this.props.errors.image}</p>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='exampleState'>Description*</Label>
                <Input
                  type='textarea'
                  name='description'
                  id='exampleState'
                  style={{ height: '150px' }}
                  onChange={this.props.handleInputChange}
                  required
                />
                <p style={{ color: 'red' }}>{this.props.errors && this.props.errors.email}</p>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for='exampleState'>Facility Image*</Label>
                <ImageUpload
                  onDrop={this.props.onDropImage}
                  files={this.props.Imagefiles}
                />
                <p style={{ color: 'red' }}>{this.props.errors && this.props.errors.image}</p>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='exampleState'>Facility Certifications*</Label>
                <ImageUpload
                  onDrop={this.props.onDropCert}
                  files={this.props.Certfiles}
                />
                <p style={{ color: 'red' }}>{this.props.errors && this.props.errors.image}</p>
              </FormGroup>
            </Col>
          </Row>

          <FormGroup check className=''>
            <Input type='checkbox' name='check' id='exampleCheck' required  onChange={this.props.handleCheck}/>
            <a
              for='exampleCheck'
              className='active'
              name="accept_terms"
              href='https://docs.zoho.com/file/11vwgd64357adcc524563ab588abbd57f821f'
              target='blank'
            >
              Accept terms and conditions
            </a>
          </FormGroup>
        </div>
      </Fragment>
    );
  }
}
