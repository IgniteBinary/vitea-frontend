import React, { Component, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import PageTitle from '../../../Layout/AppMain/PageTitle';

import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

import AppointmentsTable from './appointmentsTable';
import getALLAppointments from '../../../actions/appointments/getAllAppointments';
import editAppointment from '../../../actions/appointments/editAppointment';
import { toast, ToastContainer } from 'react-toastify';
import CheckUser from '../../../helpers/authorization';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import AsignDoctor from '../../updateUpoitment/updateDoctor';
import getALLUsers from '../../../actions/users/getAllUsersAction';
class Appointments extends Component {
  state = {
    appointment: {},
    toEditProduct: {},
    modal: false,
  };

  componentDidMount() {
    if (!CheckUser()) {
      toast.error('Your session has expired redirecting to Login');
      window.setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    }
    this.props.getALLAppointments();
    this.props.getUsers();
  }

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };

  toggleModal = (id) => {
    this.setState({ modal: !this.state.modal })
    localStorage.setItem('appointment_id', id)
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

  editAppointment = async (id) => {
    const { editAppointment } = this.props;
    const { error } = this.state;
    if (Object.keys(error).length > 0) {
      toast.error('Invalid Fields', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }

    const doctorObj = {
      ...this.state.doctor,
      id,
    };

    await editAppointment(doctorObj);

    if (this.props.Products.success) {
      toast.success('Doctor  successfully assigned', {
        position: toast.POSITION.TOP_RIGHT,
      });
      this.props.toggle();
    }
  };

  render() {
    const products = this.props.Products.products;
    const { users } = this.props.Users;
    const accentColor = '#007bff';
    return (
      <Fragment>
        <AsignDoctor
          modal={this.state.modal}
          toggle={this.toggleModal}
          doctors={users}
        />
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
                assignDoctor={this.toggleModal}
                data={products}
                editProduct={this.editProduct}
                deleteProduct={this.deleteProduct}
                viewProduct={this.viewProduct}
              />
            </TabPane>
            <TabPane tab='Approved Appointments' key='2'>
              <AppointmentsTable
                assignDoctor={this.toggleModal}
                data={products}
                editProduct={this.editProduct}
                deleteProduct={this.deleteProduct}
                viewProduct={this.viewProduct}
              />
            </TabPane>
            <TabPane tab='Completed Appointments' key='3'>
              <AppointmentsTable
                assignDoctor={this.toggleModal}
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
         getUsers: () => dispatch(getALLUsers()),
       });

export const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
