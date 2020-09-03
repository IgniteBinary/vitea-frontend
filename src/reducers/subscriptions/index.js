import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';

export const initialState = {
  subscriptions: [],
  isLoading: false,
  response: null,
  success: null,
  errorMessage: null,
};


const getSubscriptionSuccess = (state, action) => {
    return {
      ...state,
      isLoading: false,
      subscriptions: action.payload.message,
      response: action.payload,
      success: true,
    };

}

const getSubscriptionFailed = (state, action) => {
  return {
    ...state,
    isLoading: false,
    success: false,
    response: action.payload
  };
};

const makePaymentsSuccess = (state, action ) =>{
    return {
      ...state,
      isLoading: false,
      success: true,
      response: action.payload,
    };
}

const makePaymentsFailed = (state, action) => {
  return {
    ...state,
    isLoading: false,
    success: false,
    response: action.payload,
  };
};




const startGetSubscription = (state) => {
  return {
    ...state,
    isLoading: true,
    success: false,
    errorMessage: null,
  };
};

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GET_ALL_SUBSCRIPTION':
      return startGetSubscription(state);
    case types.GET_ALL_SUBSCRIPTIONS_SUCCESS:
      return getSubscriptionSuccess(state, action);
    case types.GET_ALL_SUBSCRIPTIONS_FAILED:
      return getSubscriptionFailed(state, action);
    case types.MAKE_SUBSCRIPTION_PAYMENTS_FAILED:
        return makePaymentsFailed(state, action);
    case types.MAKE_SUBSCRIPTION_PAYMENTS_SUCCESS:
        return makePaymentsSuccess(state, action)
    default:
      return state;
  }
};

export default subscriptionReducer;
