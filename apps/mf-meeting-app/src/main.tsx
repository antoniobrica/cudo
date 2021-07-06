import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from "./serviceWorker";
import App from './app/app';
// import "./SubscriberWidgetElement";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { MS_SERVICE_URL } from '@cudo/mf-core';

declare global {
  interface Window {
    renderMeetingApp: any;
    unmountMeetingApp: any;
  }
}
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_meeting'].url,
  cache: new InMemoryCache()
});

window.renderMeetingApp = (containerId, history) => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client as any}>
            <App />
          </ApolloHooksProvider>
        </ApolloProvider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById(containerId)
  );
  serviceWorker.unregister();
};

window.unmountMeetingApp = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

if (!document.getElementById("MeetingApp-container")) {
  // ReactDOM.render(<App />, document.getElementById("root"));
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client as any}>
            <App />
          </ApolloHooksProvider>
        </ApolloProvider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
  serviceWorker.unregister();
}