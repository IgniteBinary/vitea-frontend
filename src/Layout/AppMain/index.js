import { Route, Redirect, Switch , BrowserRouter, HashRouter, browserHistory} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';
import Loader from 'react-loaders'
import Julla from '../../assets/utils/images/app_logo.png'
import {
    ToastContainer,
} from 'react-toastify';


const UserPages = lazy(() => import('../../DemoPages/UserPages'));
const Applications = lazy(() => import('../../DemoPages/Applications'));
const Dashboards = lazy(() => import('../../DemoPages/Dashboards'));
const Subscription = lazy(() => import('../../DemoPages/Components/subscription/main'))
const ExpiredSub = lazy(() => import('../../DemoPages/Dashboards/expired_subcription'))
const Widgets = lazy(() => import('../../DemoPages/Widgets'));
const Elements = lazy(() => import('../../DemoPages/Elements'));
const Components = lazy(() => import('../../DemoPages/Components'));
const Charts = lazy(() => import('../../DemoPages/Charts'));
const Forms = lazy(() => import('../../DemoPages/Forms'));
const Tables = lazy(() => import('../../DemoPages/Tables'));

const AppMain = () => {

    return (
      <Fragment>
        {/* Components */}
        <BrowserRouter>
          <Suspense
            fallback={
              <div className='loader-container'>
                <div className='loader-container-inner'>
                  <div className='text-center'>
                    <img src={Julla} alt='loader' />
                  </div>
                </div>
              </div>
            }
          >
            <Route path='/components' component={Components} />
          </Suspense>

          {/* Forms */}

          {/* <Suspense
          fallback={
            <div className='loader-container'>
              <div className='loader-container-inner'>
                <div className='text-center'>
                  <img src={Julla} alt='loader' />
                </div>
              </div>
            </div>
          }
        >
          <Route path='/forms' component={Forms} />
        </Suspense> */}

          {/* Charts */}

          <Suspense
            fallback={
              <div className='loader-container'>
                <div className='loader-container-inner'>
                  <div className='text-center'>
                    <img src={Julla} alt='loader' />
                  </div>
                </div>
              </div>
            }
          >
            <Route path='/charts' component={Charts} />
          </Suspense>

          <Suspense
            fallback={
              <div className='loader-container'>
                <div className='loader-container-inner'>
                  <div className='text-center'>
                    <img src={Julla} alt='loader' />
                  </div>
                </div>
              </div>
            }
          >
            <Route path='/expired-sub' component={ExpiredSub} />
          </Suspense>

          {/* Tables */}

          <Suspense
            fallback={
              <div className='loader-container'>
                <div className='loader-container-inner'>
                  <div className='text-center'>
                    <img src={Julla} alt='loader' />
                  </div>
                </div>
              </div>
            }
          >
            <Route path='/tables' component={Tables} />
          </Suspense>

          {/* Elements */}

          {/* <Suspense
          fallback={
            <div className='loader-container'>
              <div className='loader-container-inner'>
                <div className='text-center'>
                  <img src={Julla} alt='loader' />
                </div>
              </div>
            </div>
          }
        >
          <Route path='/elements' component={Elements} />
        </Suspense> */}

          {/* Dashboard Widgets */}

          {/* <Suspense
          fallback={
            <div className='loader-container'>
              <div className='loader-container-inner'>
                <div className='text-center'>
                  <img src={Julla} alt='loader' />
                </div>
              </div>
            </div>
          }
        >
          <Route path='/widgets' component={Widgets} />
        </Suspense> */}

          {/* Pages */}

          <Suspense
            fallback={
              <div className='loader-container'>
                <div className='loader-container-inner'>
                  <div className='text-center'>
                    <img src={Julla} alt='loader' />
                  </div>
                </div>
              </div>
            }
          >
            <Route path='/facility' component={UserPages} />
          </Suspense>

          {/* Applications */}

          {/* <Suspense
          fallback={
            <div className='loader-container'>
              <div className='loader-container-inner'>
                <div className='text-center'>
                  <img src={Julla} alt='loader' />
                </div>
              </div>
            </div>
          }
        >
          <Route path='/apps' component={Applications} />
        </Suspense> */}

          {/* Dashboards */}

          <Suspense
            fallback={
              <div className='loader-container'>
                <div className='loader-container-inner'>
                  <div className='text-center'>
                    <img src={Julla} alt='loader' />
                  </div>
                </div>
              </div>
            }
          >
            <Route path='/dashboard' component={Dashboards} />
          </Suspense>

          <Suspense
            fallback={
              <div className='loader-container'>
                <div className='loader-container-inner'>
                  <div className='text-center'>
                    <img src={Julla} alt='loader' />
                  </div>
                </div>
              </div>
            }
          >
            <Route path='/payments' component={Subscription} />
          </Suspense>

          <Route
            exact
            path='/'
            render={() => <Redirect to='/facility/login' />}
          />
          <ToastContainer />
        </BrowserRouter>
      </Fragment>
    );
};

export default AppMain;