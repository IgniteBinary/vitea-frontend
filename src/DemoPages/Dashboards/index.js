import React, { Fragment, useState } from 'react';
import { Route } from 'react-router-dom';

// DASHBOARDS

import AnalyticsDashboard from './Analytics/';
import SalesDashboard from './Sales/';
import CommerceDashboard from './Commerce/';
import CRMDashboard from './CRM/';
//import MinimalDashboard1 from './Minimal/Variation1';
import Loyalty from './Loyalty/Variation1';
import Payment from './Payments/Variation1';
import MinimalDashboard2 from './Minimal/Variation2';
import AddProduct from './Commerce/addProduct';
import EditProduct from './Commerce/editProduct';
import ViewProduct from './Commerce/viewProduct';
import EditStore from './CRM/editStore';
import CreateStore from './CRM/createStore';
import OflineStore from './CRM/offlineStore';
import OrderManageMent from './Order';
import Logistics from './Logistics';
import OrderTracker from './shipping/Variation1';
import Reports from './reports/Variation1';
import FacilityDashBoard from './FacilityDashBoard/Examples/Variation2'
import Merchants from './Merchants';
// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import Intercom from 'react-intercom';
import SubscriptionExpired from './expired_subcription';
import CustomerReports from './reports/customers';
import SalesReports from './reports/sales';
import OfflineSalesReports from './reports/sales/instore_reports';
import PaymentReports from './reports/payments';
// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';
import ResetPassword from '../Dashboards/Minimal/reset';
import Invoice from '../Components/Invoice';
import Domains from '../Dashboards/Domain';
const Dashboards = ({ match }) => {
  const [reset, setReset] = useState(false);
  const toggleSetReset = () => setReset(!reset);
  return (
    <Fragment>
      <ResetPassword modal={reset} toggle={toggleSetReset} />
      {!window.location.href.includes('expired-subscription') && (
        <AppHeader toggle={toggleSetReset} />
      )}
      <div className='app-main'>
        <Intercom appID='wz6k5k91' />
        {!window.location.href.includes('expired-subscription') && (
          <AppSidebar />
        )}
        <div className='app-main__outer'>
          <div className='app-main__inner'>
            <Route
              exact
              path={`${match.url}/users`}
              component={AnalyticsDashboard}
            />
            <Route
              exact
              path={`${match.url}/add-products`}
              component={AddProduct}
            />

            <Route
              exact
              path={`${match.url}/customer-reports`}
              component={CustomerReports}
            />

            <Route
              exact
              path={`${match.url}/payments-reports`}
              component={PaymentReports}
            />
            <Route exact path={`${match.url}/domains`} component={Domains} />
            <Route
              exact
              path={`${match.url}/online-sales-reports`}
              component={SalesReports}
            />
            <Route
              exact
              path={`${match.url}/offline-sales-reports`}
              component={OfflineSalesReports}
            />
            <Route
              exact
              path={`${match.url}/create-store`}
              component={CreateStore}
            />
            <Route
              exact
              path={`${match.url}/sales`}
              component={SalesDashboard}
            />
            <Route
              exact
              path={`${match.url}/appointments`}
              component={CommerceDashboard}
            />
            <Route
              exact
              path={`${match.url}/stores`}
              component={CRMDashboard}
            />
            <Route exact path={`${match.url}/loyalty`} component={Loyalty} />
            <Route exact path={`${match.url}/payments`} component={Payment} />
            <Route exact path={`${match.url}`} component={FacilityDashBoard} />
            <Route
              exact
              path={`${match.url}/minimal-dashboard-2`}
              component={MinimalDashboard2}
            />
            <Route
              exact
              path={`${match.url}/logistics`}
              component={Logistics}
            />
            <Route
              exact
              path={`${match.url}/orders`}
              component={OrderManageMent}
            />
            <Route
              exact
              path={`${match.url}/track-order`}
              component={OrderTracker}
            />
            <Route exact path={`${match.url}/reports`} component={Reports} />
            <Route
              exact
              path={`${match.url}/edit-products`}
              component={EditProduct}
            />
            <Route
              exact
              path={`${match.url}/view-products`}
              component={ViewProduct}
            />
            <Route
              exact
              path={`${match.url}/edit-stores`}
              component={EditStore}
            />
            <Route
              exact
              path={`${match.url}/offline-stores`}
              component={OflineStore}
            />
            <Route
              exact
              path={`${match.url}/order-invoice`}
              component={Invoice}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboards;
