import * as types from '../../actions/action_types';
import updateObject from '../reducer.utils';

export const initialState = {
    products: [],
    isLoading: false,
    response: null,
    getProductError: null,
    success: null,
    errorMessage: null,
}



const updateGetProductsSuccessState = (state, action) =>  {
    return {
      ...state,
      isLoading: false,
      products: action.payload.appointments,
      success: true,
      response: action.payload,
    };
};

const updateGetProductsFailedState = (state, action) => {

  return {
    ...state,
    isLoading: false,
    getProductError: true,
    response: action.payload,
    errorMessage: action.payload.response.data.message,
  };
};

const updateCreateProductSuccessState = (state, action) => {
   
  return {
    ...state,
    products: [...state.products, action.payload],
    isLoading: false,
    response: action.payload,
    success: true,
  };
};

const updateCreateProductFailedState = (state, action) =>
 {
   return {
     ...state,
     isLoading: false,
     createProductError: true,
     response: action.payload,
     errorMessage: action.payload.response.data.message,
     success: false
   };
  };


  const updateEditProductSuccessState = (state, action) => {
    return {
      ...state,
      products: state.products.map((content, i) =>
        content.id === action.payload.id
          ? { ...content, ...action.payload }
          : content
      ),
      isLoading: false,
      response: action.payload,
      success: true,
    };
  };

  const updateEditProductPhotoSuccessState = (state, action) => {
    return {
      ...state,
      products: state.products.map((content, i) =>
        content._id === action.payload._id
          ? { ...content, ...action.payload }
          : content
      ),
      isLoading: false,
      response: action.payload,
      success: true,
    };
  };

  const updateEditProductPhotoFailedState = (state, action) => {
    return {
      ...state,
      isLoading: false,
      createProductError: true,
      response: action.payload,
      errorMessage: action.payload.response.data.message,
      success: false
    };
  };


  const updateEditProductFailedState = (state, action) => {
    return {
      ...state,
      isLoading: false,
      createProductError: true,
      response: action.payload,
      errorMessage: action.payload.response.data.message,
    };
  };

const startCreateProduct = (state) => {
    return {
      ...state,
      isLoading: true,
      success: false,
      createProductError: false,
      errorMessage: null,
    };
}
 const updateDeleteProductSuccessState = (state, action) => {
   return {
     ...state,
     products: state.products.filter((content, i) =>
       content._id !== action.payload._id
     ),
     isLoading: false,
     response: action.payload,
     success: true,
   };
 };

 const updateDeleteProductFailedState = (state, action) => {
   return {
     ...state,
     isLoading: false,
     response: action.payload,
     errorMessage: action.payload.response.data.message,
   };
 };


 

const productsReducer = (state = initialState , action) => {
    switch (action.type) {
      case 'START_CREATE_PRODUCT':
        return startCreateProduct(state);
      case types.GET_ALL_PRODUCTS_FAILED:
        return updateGetProductsFailedState(state, action);
      case types.GET_ALL_PRODUCTS_SUCCESS:
        return updateGetProductsSuccessState(state, action);
      case types.CREATE_PRODUCT_SUCCESS:
        return updateCreateProductSuccessState(state, action);
      case types.CREATE_PRODUCT_FAILED:
        return updateCreateProductFailedState(state, action);
      case types.EDIT_APPOINTMENT_SUCCESS:
        return updateEditProductSuccessState(state, action);
      case types.EDIT_APPOINTMENT_FAILED:
        return updateEditProductFailedState(state, action);
      case types.EDIT_PRODUCT_PHOTOS_SUCCESS:
        return updateEditProductPhotoSuccessState(state, action);
      case types.EDIT_PRODUCT_PHOTOS_FAILED:
        return updateEditProductPhotoFailedState(state, action);
      case types.DELETE_PRODUCT_SUCCESS:
        return updateDeleteProductSuccessState(state, action);
      case types.DELETE_PRODUCT_FAILED:
        return updateDeleteProductFailedState(state, action);
      default:
        return state;
    }
};

export default productsReducer;