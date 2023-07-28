import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';

import App from './app/app';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  );
}
