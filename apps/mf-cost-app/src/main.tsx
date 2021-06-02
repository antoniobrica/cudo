import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from "./serviceWorker";
import App from './app/app';
import "./SubscriberWidgetElement";

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
declare global {
  interface Window {
    renderCostApp: any;
    unmountMeetingApp: any;
  }
}

const client = new ApolloClient({
  uri: 'http://localhost:5002/graphql',
  cache: new InMemoryCache()
});
window.renderCostApp = (containerId, history) => {
  ReactDOM.render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client as any}>
          <App />
        </ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>,
    document.getElementById(containerId)
  );
  serviceWorker.unregister();
};

window.unmountMeetingApp = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

if (!document.getElementById("CostApp-container")) {
  // ReactDOM.render(<App />, document.getElementById("root"));
  ReactDOM.render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client as any}>
          <App />
        </ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );
  serviceWorker.unregister();
}