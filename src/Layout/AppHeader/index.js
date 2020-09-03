import React, {Fragment} from 'react';
import cx from 'classnames';

import {connect} from 'react-redux';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import HeaderLogo from '../AppLogo';

import SearchBox from './Components/SearchBox';
import MegaMenu from './Components/MegaMenu';
import UserBox from './Components/UserBox';
import HeaderRightDrawer from "./Components/HeaderRightDrawer";
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import HeaderDots from "./Components/HeaderDots";

class Header extends React.Component {
  state = {
    steps: [
      {
        selector: '[data-tut="top_market_credit"]',
        content: 'Marketing credit amount. Click to top up your marketing credit',
      },
      {
        selector: '[data-tut="new_orders"]',
        content: 'New orders. Updates when there are new orders',
      },
    ],
    isTourOpen: true,
  };

  disableBody = (target) => disableBodyScroll(target);
  enableBody = (target) => enableBodyScroll(target);

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };
  render() {
    let {
      headerBackgroundColor,
      enableMobileMenuSmall,
      enableHeaderShadow,
    } = this.props;
    const accentColor = '#007bff';
    return (
      <Fragment>
        <CSSTransitionGroup
          component='div'
          className={cx('app-header', headerBackgroundColor, {
            'header-shadow': enableHeaderShadow,
          })}
          transitionName='HeaderAnimation'
          transitionAppear={true}
          transitionAppearTimeout={1500}
          transitionEnter={false}
          transitionLeave={false}
        >
          {/* <Tour
            steps={this.state.steps}
            isOpen={this.state.isTourOpen}
            onRequestClose={this.closeTour}
            rounded={5}
            accentColor={accentColor}
            onAfterOpen={this.disableBody}
            onBeforeClose={this.enableBody}
          /> */}
          <HeaderLogo />

          <div
            className={cx('app-header__content', {
              'header-mobile-open': enableMobileMenuSmall,
            })}
          >
            {/* <div className="app-header-left">
                            <SearchBox/>
                            <MegaMenu/>
                        </div> */}
            <div className='app-header-right'>
              <UserBox toggle={this.props.toggle} />
              <HeaderRightDrawer />
            </div>
          </div>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
    enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
    closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
    headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);