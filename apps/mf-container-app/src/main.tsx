import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { LazyLoading } from '@cudo/shared-components/src/lib/components/loader/lazyloader';

import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';

import App from './app/app';
import { Provider } from 'react-redux';
import { store } from './app/store';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <Suspense fallback={<LazyLoading />}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
}

serviceWorker.unregister();
