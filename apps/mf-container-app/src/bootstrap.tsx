import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { LazyLoading } from '@cudo/shared-components';
import { BrowserRouter } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';

import App from './app/app';
// import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <Suspense fallback={<>Loading...</>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  );
}

export default rootElement;

serviceWorker.unregister();

// import { StrictMode } from 'react';
// import * as ReactDOM from 'react-dom/client';

// import App from './app/app';
// import React from 'react';

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
