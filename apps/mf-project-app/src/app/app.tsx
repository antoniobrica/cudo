import React, { Suspense, useState } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProjectInfo from './components/project-info/project-info';

import { initI18n } from '@cudo/mf-core';
import { Loading } from '@cudo/ui'
import { TestComponent } from './test-component/test-component';
import { createBrowserHistory } from "history";
import MicroFrontend from "../MicroFrontend";
import { environment } from '../environments/environment';
import TabMenu from './components/tab-menu/tab-menu';

const defaultLanguage = 'de-DE';
const supportedLanguages = [defaultLanguage, 'en-GB'];
initI18n('./assets/i18n/{{lng}}.json', defaultLanguage);

const defaultHistory = createBrowserHistory();

const {
  EACT_APP_COST_HOST: costHost,
  REACT_APP_MEETING_HOST: meetingHost,
  REACT_APP_TASK_HOST: taskHost,
} = environment;


function Header() {
  return (
    <div className="banner">
      <h1 className="banner-title"> Welcome project</h1>
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

function TaskApp(history: any) {
  return (
    <MicroFrontend history={history} host={taskHost} name="TaskApp" />
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
            <TaskApp></TaskApp>
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

function loadApp() {
  return (
    <div>
      <ProjectInfo ></ProjectInfo>
    </div>
  );
}

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/tabs" component={TabMenu} />
          <Route exact path="/" component={ProjectInfo} />
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;

