// import React from 'react';

// import styles from './app.module.scss';
// import { SetForm, SetList } from '@cudo/ui';
// import {
//   ApolloProvider,
//   ApolloClient,
//   InMemoryCache,
//   NormalizedCacheObject,
//   HttpLink
// } from '@apollo/client';

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: new HttpLink({
//     uri: 'http://192.168.1.5:3333/graphql',
//   }),
// });
// const App = () => (
//   <ApolloProvider  client={client}>
//     <h1>Tender APP</h1>
//     <div className="flex">
//       <SetForm />
//       <SetList />
//     </div>
//   </ApolloProvider>
// );

// export default App;

import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import MicroFrontend from "../MicroFrontend";

import "./app.module.scss";
import { environment } from "../environments/environment";

const defaultHistory = createBrowserHistory();

const {
  EACT_APP_COST_HOST: costHost,
  REACT_APP_MEETING_HOST: meetingHost,
} = environment;

function Header() {
  return (
    <div className="banner">
      <h1 className="banner-title"> Welcome mf-tender-app</h1>

    </div>
  );
}

function MeetingApp(history: any) {
  return (
    <MicroFrontend history={history} host={meetingHost} name="MeetingApp" />
  );
}

function CostApp(history: any) {
  return (
    <MicroFrontend history={history} host={costHost} name="CostApp" />
  );
}

function Home({ history }) {
  const [input, setInput] = useState("");

  return (
    <div>
      <Header />
      <div className="home">
        <div className="content">
          <div className="meetingClass">
            <MeetingApp></MeetingApp>
          </div>

        </div>
        <div className="content">
          <div className="costClass">
            <CostApp></CostApp>
          </div>
        </div>

      </div>
    </div>
  );
}

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter></React.StrictMode>
  );
}

export default App;

