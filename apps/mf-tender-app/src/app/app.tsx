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
//     uri: 'http://localhost:3333/graphql',
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

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MicroFrontend from '../MicroFrontend';

import './app.module.scss';
import { environment } from '../environments/environment';

const { EACT_APP_COST_HOST: costHost, REACT_APP_MEETING_HOST: meetingHost } = environment;

function Header() {
  return (
    <div className="banner">
      <h1 className="banner-title"> Welcome mf-tender-app</h1>
    </div>
  );
}

function MeetingApp(history: any) {
  return <MicroFrontend history={history} host={meetingHost} name="MeetingApp" />;
}

function CostApp(history: any) {
  return <MicroFrontend history={history} host={costHost} name="CostApp" />;
}

function Home() {
  const [input, setInput] = useState('');

  return (
    <div>
      <Header />
      {/* <div className="home">
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
      </div> */}
    </div>
  );
}

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
