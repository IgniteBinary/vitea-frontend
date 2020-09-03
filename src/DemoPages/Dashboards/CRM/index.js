import React, {Component, Fragment} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {connect} from 'react-redux';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Tabs, {TabPane} from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';


import getALLStores from '../../../actions/stores/getAllStoresAction';
import StoresTable from './storeTable';
import CheckUser from '../../../helpers/authorization';
import {toast} from 'react-toastify';
import Tour from 'reactour';
// import PageTitle from "../Commerce";


class StoresDashBoard extends Component {
  state = {
    steps: [
      {
        selector: '[data-tut="store"]',

        content: () => (
          <div>
            <h3>Stores</h3>
            <p>
              Showcase your business to the world by creating a store here.
              click on add stores to add a store
            </p>
          </div>
        ),
      },
    ],
    store: {},
    isTourOpen: false,
  };

  componentDidMount() {
    if (!CheckUser()) {
      toast.error('Your session has expired redirecting to Login');
      window.setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    }
    const tut = localStorage.getItem('list_store_tut');
    if (tut && tut === 'off') {
      this.closeTour();
    }

    localStorage.setItem('list_store_tut', 'off');

    this.props.getStores();
  }

  editStore = (id) => async () => {
    const store = await this.props.Stores.stores.find((x) => x.id === id);
    localStorage.setItem('store', JSON.stringify(store));
    this.setState({
      product: store,
    });

    this.props.history.push('/dashboard/edit-stores');
  };

  disableBody = (target) => disableBodyScroll(target);
  enableBody = (target) => enableBodyScroll(target);

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };

  createStore = () => this.props.history.push('/dashboard/create-store');

  componentWillUnmount() {
    // setCookie('dash_tut', 'off', 2000000);
    // setCookie('reset', 'off', 100000000);
    console.log('Unmountoooooooooooo');
    //localStorage.setItem('dash_tut', 'off');
  }

  render() {
    const data = this.props.Stores.stores;
    const olineStore = data.filter(
      (store) => !store.store_type || store.store_type !== 'offline'
    );
    console.log(data);
    const accentColor = '#007bff';
    return (
      <Fragment>
        <CSSTransitionGroup
          component='div'
          transitionName='TabsAnimation'
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
          data_tut='store'
        >
          <PageTitle
            useCase='Add Stores'
            tag='Add new store'
            heading='Stores'
            subheading='Store management'
            icon='pe-7s-culture icon-gradient bg-ripe-malin'
            toggle={this.createStore}
            data_tut='add_store'
          />

          {this.state.isTourOpen && (
            <Tour
              steps={this.state.steps}
              isOpen={this.state.isTourOpen}
              onRequestClose={this.closeTour}
              rounded={5}
              accentColor={accentColor}
              onAfterOpen={false}
              onBeforeClose={this.enableBody}
              showButtons={false}
              showNumber={false}
              //disableDotsNavigation={false}
            />
          )}

          <Tabs
            defaultActiveKey='1'
            renderTabBar={() => <ScrollableInkTabBar />}
            renderTabContent={() => <TabContent />}
          >
            <TabPane tab='Stores' key='1'>
              <StoresTable data={olineStore} editStore={this.editStore} />
            </TabPane>
          </Tabs>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getStores: () => dispatch(getALLStores()),
});

export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(StoresDashBoard);