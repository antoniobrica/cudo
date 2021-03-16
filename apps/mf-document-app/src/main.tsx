// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'semantic-ui-css/semantic.min.css'


// import { BrowserRouter } from 'react-router-dom';

// import App from './app/app';

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );


import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import * as serviceWorker from "./serviceWorker";
import App from './app/app';
// import "./SubscriberWidgetElement";

declare global {
  interface Window {
    renderDocumentApp: any;
    unmountMeetingApp: any;
  }
}
const client = new ApolloClient({
  uri: 'http://localhost:50010/graphql',
  cache: new InMemoryCache()
});

window.renderDocumentApp = (containerId, history) => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
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

if (!document.getElementById("DocumentApp-container")) {
  // ReactDOM.render(<App />, document.getElementById("root"));
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <App />
          </ApolloHooksProvider>
        </ApolloProvider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
  serviceWorker.unregister();
}