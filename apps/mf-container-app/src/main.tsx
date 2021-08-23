import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
// import Modal from 'react-modal'
import { LazyLoading } from '@cudo/shared-components'

import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import App from './app/app';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import {
  CONTAINER_REDUX_FEATURE_KEY,
  containerReduxReducer,
} from './app/container-redux.slice';

const store = configureStore({
  reducer: { [CONTAINER_REDUX_FEATURE_KEY]: containerReduxReducer },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

// const App = lazy(() => import('./app/app'))

ReactDOM.render(
  <Suspense fallback={<LazyLoading />}>
    <Provider store={store}>
      <BrowserRouter forceRefresh={true} >
        <App />
      </BrowserRouter>
    </Provider>
   </Suspense>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
