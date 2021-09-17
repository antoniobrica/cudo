
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { LazyLoading } from '@cudo/shared-components'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import * as serviceWorker from "./serviceWorker";
import App from './app/app';
import { environment } from './environments/environment';
import { MS_SERVICE_URL } from '@cudo/mf-core';
// import "./SubscriberWidgetElement";

declare global {
  interface Window {
    renderTaskApp: any;
    unmountTaskApp: any;
  }
}
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_task'].url,
  cache: new InMemoryCache()
});

window.renderTaskApp = (containerId, history) => {
  console.log('---**task --main--containerId--', containerId, '--history--', history)
  ReactDOM.render(
    // <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client as any}>
          <App />
        </ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>   
    // </React.StrictMode>
    ,
    document.getElementById(containerId)
  );
  serviceWorker.unregister();
};

window.unmountTaskApp = (containerId) => {
  console.log('--**task --main-unmountTaskApp--task app unmount calling--containerId--', containerId)
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

if (!document.getElementById("TaskApp-container")) {
  console.log('---task app--main--!getElementById--TaskApp-container--')
  ReactDOM.render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client as any}>
          <App />
        </ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>
    ,
    document.getElementById("root")
  );
  serviceWorker.unregister();
}