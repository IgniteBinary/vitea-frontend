import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import TitleComponent1 from './PageTitleExamples/Variation1';

class PageTitle extends Component {
  randomize(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
  }

  render() {
    let {
      enablePageTitleIcon,
      enablePageTitleSubheading,

      heading,
      icon,
      subheading,
    } = this.props;

    

    return (
      <div className='app-page-title'>
        <div className='page-title-wrapper'>
          <div className='page-title-heading'>
            <div
              className={cx('page-title-icon', {
                'd-none': !enablePageTitleIcon,
              })}
            >
              <i className={icon} />
            </div>
            <div>
              {heading}
              <div
                className={cx('page-title-subheading', {
                  'd-none': !enablePageTitleSubheading,
                })}
              >
                {subheading}
              </div>
            </div>
          </div>
          <div className='page-title-actions' data-tut={this.props.data_tut}>
            <TitleComponent1
              fOption={this.props.fOption}
              toggle={this.props.toggle}
              useCase={this.props.useCase}
              tag={this.props.tag}
              cancle={this.props.cancle}          />
            {/* {this.randomize(arr)} */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  enablePageTitleIcon: state.ThemeOptions.enablePageTitleIcon,
  enablePageTitleSubheading: state.ThemeOptions.enablePageTitleSubheading,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle);
