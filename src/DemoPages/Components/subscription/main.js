import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import MakeSubscription from './makepayments';

const Payments = ({ match }) => (
  <Fragment>
    <div className='app-container'>
      {/* User Pages */}

      <Route exact path={`${match.url}/subscription`} component={MakeSubscription} />
       
    </div>
  </Fragment>
);

export default Payments;

