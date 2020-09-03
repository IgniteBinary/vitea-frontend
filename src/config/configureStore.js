import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducers from '../reducers';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  storage,
}

const middleware = [thunk];
const rootReducer = combineReducers({
  ...reducers
})

let initialState = {};
// const persitedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(
         rootReducer,
         composeWithDevTools(applyMiddleware(...middleware))
       );

export const persistor = persistStore(store)