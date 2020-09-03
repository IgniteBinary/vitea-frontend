import React, { Component, Fragment } from 'react';

// import CKEditor from "react-ckeditor-component";
import CKEditor from 'ckeditor4-react';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { Label, CardTitle } from 'reactstrap';
import TextareaAutosize from 'react-textarea-autosize';

export default class FormCkEditorEditor extends Component {
  constructor(props) {
    super(props);

    //State initialization
    this.state = {
      content: 'Hello World',
    };
    this.setContent = this.setContent.bind(this);
  }

  //------ Test for race condition ------ //
  setContent() {
    console.log('yess')
    this.setState({
      content: 'Hello World ' + Math.random(),
    });
  }

  onChange(evt) {}

  onBlur(evt) {}

  afterPaste(evt) {}

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
          <CardTitle className='mt-2'>
            Description <span className='text-danger'>*</span>
          </CardTitle>
          <TextareaAutosize
            className='form-control'
            name='description'
            onChange={this.props.onChange}
            minRows={5}
            maxRows={6}
            //defaultValue='product description...'
            value={this.props.product && this.props.product.description}
            disabled={this.props.disabled}
          />
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
