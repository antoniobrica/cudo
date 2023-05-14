import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { LazyLoading } from '@cudo/shared-components/src/lib/components/loader/lazyloader';

import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';

import App from './app/app';
import { initI18n } from '@cudo/mf-core';

const defaultLanguage = 'en-GB';
const supportedLanguages = [defaultLanguage, 'en-GB'];

initI18n('./assets/i18n/en-GB.json', defaultLanguage);

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <Suspense fallback={<LazyLoading />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  );
}

serviceWorker.unregister();
