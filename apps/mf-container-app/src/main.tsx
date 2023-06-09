import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { LazyLoading } from '@cudo/shared-components';

import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';

import App from './app/app';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <>
      <App />
    </>
  );
}

serviceWorker.unregister();
