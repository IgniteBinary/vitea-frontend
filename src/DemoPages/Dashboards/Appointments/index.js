import React, { Component, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import deleteProduct from '../../../actions/appointments/deleteProduct';
import PageTitle from '../../../Layout/AppMain/PageTitle';

import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

import AppointmentsTable from './appointmentsTable';
import getALLAppointments from '../../../actions/appointments/getAllAppointments';
import { toast, ToastContainer } from 'react-toastify';
import CheckUser from '../../../helpers/authorization';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

class Appointments extends Component {
  state = {
    appointment: {},
    toEditProduct: {},
  };

  componentDidMount() {
    if (!CheckUser()) {
      toast.error('Your session has expired redirecting to Login');
      window.setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    }
    this.props.getALLAppointments();
  }

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };

  disableBody = (target) => disableBodyScroll(target);
  enableBody = (target) => enableBodyScroll(target);

  // getProduct = (_id) => async () => {
  //   const product = await this.props.Products.products.find((x) => x._id === _id);
  //   this.setState({
  //     toEditProduct: product,
  //   });
  //   localStorage.setItem('product', JSON.stringify(product));
  //   this.props.history.push('/dashboard/edit-products');
  // };
  addNewProduct = () => this.props.history.push('/dashboard/add-products');

  editProduct = (_id) => async () => {
    const product = await this.props.Products.products.find(
      (x) => x._id === _id
    );
    localStorage.setItem('product', JSON.stringify(product));
    this.setState({
      product: product,
    });

    this.props.history.push('/dashboard/edit-products');
  };

  viewProduct = (_id) => async () => {
    const product = await this.props.Products.products.find(
      (x) => x._id === _id
    );
    localStorage.setItem('product', JSON.stringify(product));
    this.setState({
      product: product,
    });

    this.props.history.push('/dashboard/view-products');
  };

  deleteProduct = (_id) => async () => {
    await this.props.deleteProduct(_id);
  };

  render() {
    const products = this.props.Products.products;
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
        >
          <PageTitle
            heading='Appointments'
            subheading='Facility appointment'
            icon='pe-7s-note2 icon-gradient bg-ripe-malin'
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
            />
          )}
          <Tabs
            defaultActiveKey='1'
            renderTabBar={() => <ScrollableInkTabBar />}
            renderTabContent={() => <TabContent />}
          >
            <TabPane tab='All Appointments' key='1'>
              <AppointmentsTable
                data={products}
                editProduct={this.editProduct}
                deleteProduct={this.deleteProduct}
                viewProduct={this.viewProduct}
              />
            </TabPane>
            <TabPane tab='Approved Appointments' key='2'>
              <AppointmentsTable
                data={products}
                editProduct={this.editProduct}
                deleteProduct={this.deleteProduct}
                viewProduct={this.viewProduct}
              />
            </TabPane>
            <TabPane tab='Completed Appointments' key='3'>
              <AppointmentsTable
                data={products}
                editProduct={this.editProduct}
                deleteProduct={this.deleteProduct}
                viewProduct={this.viewProduct}
              />
            </TabPane>
          </Tabs>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
export const mapDispatchToProps = (dispatch) => ({
         getALLAppointments: () => dispatch(getALLAppointments()),
         deleteProduct: (id) => dispatch(deleteProduct(id)),
       });

export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
