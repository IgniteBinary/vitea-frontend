import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';

export const initialState = {
  orders: [],
  isLoading: false,
  response: null,
  getOrderErrror: null,
  success: null,
  errorMessage: null,
};

// const deactivateOrderSuccessState = (state, action) => {
//   return {
//     ...state,
//     users: state.users.map((content, i) =>
//       content._id === action.payload.id
//         ? { ...content, status: 'INACTIVE' }
//         : content
//     ),
//     isLoading: false,
//     response: action.payload,
//     success: true,
//   };
// };

// const activateOrderSuccessState = (state, action) => {
//   return {
//     ...state,
//     users: state.users.map((content, i) =>
//       content._id === action.payload.id
//         ? { ...content, status: 'ACTIVE' }
//         : content
//     ),
//     isLoading: false,
//     response: action.payload,
//     success: true,
//   };
// };

// const deactivateOrderFailedState = (state, action) => {
//   return {
//     ...state,
//     isLoading: false,
//     response: action.payload,
//     success: false,
//   };
// };

const updateGetOrdersSuccessState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    orders: action.payload,
    success: true,
  };
};

const updateGetOrdersFailedState = (state, action) =>
  updateObject(state, {
    isLoading: false,
    getOrderError: true,
    response: action.payload,
    errorMessage: action.payload.response.data.message,
  });

const updateCreateOrderSuccessState = (state, action) => {
  return {
    ...state,
    orders: [...state.orders, action.payload],
    isLoading: false,
    response: action.payload,
    success: true,
  };
};

const updateCreateOrderFailedState = (state, action) =>
  updateObject(state, {
    isLoading: false,
    createOrderError: true,
    response: action.payload,
    errorMessage: action.payload.response.data.message,
  });

const startCreateOrder = (state) => {
  return {
    ...state,
    isLoading: true,
    success: false,
    createOrderError: false,
    errorMessage: null,
  };
};

const updateEditOrderSuccessState = (state, action) => {
  return {
    ...state,
    // orders: state.orders.map((content, i) =>
    //   content._id === action.payload._id
    //     ? { ...content, ...action.payload }
    //     : content
    // ),
    isLoading: false,
    response: action.payload,
    success: true,
  };
};

const updateEditOrderFailedState = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.payload,
    errorMessage: action.payload.response.data.message,
  };
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.API_REQUEST:
      return startCreateOrder(state);
    case types.GET_ALL_ORDERS_FAILED:
      return updateCreateOrderFailedState(state, action);
    case types.CREATE_ORDER_SUCCESS:
      return updateCreateOrderSuccessState(state, action);
    case types.GET_ALL_ORDERS_SUCCESS:
      return updateGetOrdersSuccessState(state, action);
    case types.CREATE_ORDER_FAILED:
      return updateGetOrdersFailedState(state, action);
    case types.EDIT_ORDER_SUCCESS:
      return updateEditOrderSuccessState(state, action);
    case types.EDIT_ORDER_FAILED:
      return updateEditOrderFailedState(state, action);

    default:
      return state;
  }
};

export default ordersReducer;
