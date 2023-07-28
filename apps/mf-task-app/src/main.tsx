
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import * as serviceWorker from "./serviceWorker";
import App from './app/app';
import { environment } from './environments/environment';
// import "./SubscriberWidgetElement";

declare global {
  interface Window {
    renderTaskApp: any;
    unmountMeetingApp: any;
  }
}
const client = new ApolloClient({
  uri: environment.MS_TASK_API_URL,
  cache: new InMemoryCache()
});

window.renderTaskApp = (containerId, history) => {
  console.log("In Container APP")
  ReactDOM.render(
    // <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client as any}>
          <App />
        </ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>
    ,
    document.getElementById(containerId)
  );
  serviceWorker.unregister();
};

window.unmountMeetingApp = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

if (!document.getElementById("TaskApp-container")) {
  // ReactDOM.render(<App />, document.getElementById("root"));
  console.log("Not In Container APP")
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