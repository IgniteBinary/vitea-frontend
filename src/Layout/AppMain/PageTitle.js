import React, {Component} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';

import TitleComponent1 from './PageTitleExamples/Variation1'
import TitleComponent2 from './PageTitleExamples/Variation2'
import TitleComponent3 from './PageTitleExamples/Variation3'

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
            img
        } = this.props;

        var arr = [<TitleComponent1 />, <TitleComponent2 />, <TitleComponent3 />]

        return (
          <div className='app-page-title'>
            <div className='page-title-wrapper'>
              <div className='page-title-heading'>
                <div
                  className={cx('page-title-icon', {
                    'd-none': !enablePageTitleIcon,
                  })}
                >  
                  {img && <img alt='...' src={img} style={{
                    width: '40px'
                  }}/>}
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
              <div className='page-title-actions'>
                <TitleComponent2 toggle={this.props.toggle} useCase={this.props.useCase} tag={this.props.tag} data_tut={this.props.data_tut} rightIcon={this.props.rightIcon}/>
                {/* {this.randomize(arr)} */}
              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = state => ({
    enablePageTitleIcon: state.ThemeOptions.enablePageTitleIcon,
    enablePageTitleSubheading: state.ThemeOptions.enablePageTitleSubheading,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle);