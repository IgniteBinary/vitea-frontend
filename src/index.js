import './polyfills'
import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';
import './assets/base.scss';
import Main from './DemoPages/Main';
import {store, persistor} from './config/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const rootElement = document.getElementById('root');

const renderApp = Component => {
    ReactDOM.render(
      <Provider store={store}>
          <BrowserRouter>
            <Component />
          </BrowserRouter>
      </Provider>,
      rootElement
    );
};

renderApp(Main);

if (module.hot) {
    module.hot.accept('./DemoPages/Main', () => {
        const NextApp = require('./DemoPages/Main').default;
        renderApp(NextApp);
    });
}
serviceWorker.unregister();

