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
//     uri: 'http://192.168.0.31:3333/graphql',
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

import React, { useEffect, useRef, useState } from "react";
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
  const canvasToDrawCircle = useRef<HTMLCanvasElement>();
  const [CTX, setCtxToDrawCircle] = React.useState(null);
  useEffect(() => {
    const canvasToDrawCircleEle = canvasToDrawCircle.current;
    canvasToDrawCircleEle.width = canvasToDrawCircleEle.clientWidth;
    canvasToDrawCircleEle.height = canvasToDrawCircleEle.clientHeight;
    setCtxToDrawCircle(canvasToDrawCircleEle.getContext("2d"));
  }, []);
  console.clear();
  const INTERVAL = 16; //16 ms animation interval
  const src = "https://www.c00lsch00l.eu/Games/AA/BulletOrbRed.png";
  // const CTX = document.getElementById("myCanvas").getContext("2d");
  console.log(CTX);
  const frame = {
    start: null,
    delta: null,
    count: 0
  };

  const img = new Image();
  img.onload = function () {
    run(test.bind(null, CTX, img));
  };
  img.src = src;

  function run(func) {
    if (!frame.start) frame.start = performance.now();
    frame.delta = performance.now() - frame.start;
    if (frame.delta >= INTERVAL) {
      func.call();
      frame.start = null; //reset
      frame.count++;
    }
    //for this example the loop will be repeated only 100 time
    if (frame.count < 100) requestAnimationFrame(run.bind(null, func));
    //without counting limit
    //requestAnimationFrame(run.bind(null, func));
  }

  function test(CTX, img) {
    //simple function for demonstration
    // avoid using console in animation loop, except for debugging
    // console operations are very slow
    console.log(`${frame.count}`);
    draw(CTX, img);
  }
  function draw(CTX, img) {
    CTX.clearRect(0, 0, CTX.canvas.width, CTX.canvas.height);
    CTX.drawImage(img, frame.count, frame.count);
  }
  return (
    <div className="banner">
      <h1 className="banner-title"> Welcome mf-tender-app</h1>
      <canvas ref={canvasToDrawCircle} width="200" height="200"></canvas>
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

