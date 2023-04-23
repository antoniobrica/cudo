import React from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
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

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

serviceWorker.unregister();
