import React, { Suspense, useState }  from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProjectInfo from './components/project-info/project-info';
 
import { initI18n } from '@cudo/mf-core';
import { createBrowserHistory } from "history";
import MicroFrontend from "../MicroFrontend";
const defaultLanguage = 'de-DE';
const supportedLanguages = [defaultLanguage, 'en-GB'];
  
import TabMenu from '../app/components/tab-menu/tab-menu';
 
import { environment } from "../environments/environment";
initI18n('./assets/i18n/{{lng}}.json', defaultLanguage);


const defaultHistory = createBrowserHistory();

const {
  EACT_APP_COST_HOST: costHost,
  REACT_APP_MEETING_HOST: meetingHost,
  REACT_APP_TASK_HOST: taskHost,
  REACT_APP_DOCUMENT_HOST: documentHost
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
  console.log('TabMenu',TabMenu)
  return (
    <React.StrictMode>
      <Router>
       <Switch>
          <Route exact path="/home/tabs" component={TabMenu} /> 
          <Route exact path="/home" component={ProjectInfo} />
        </Switch>
      </Router>
      </React.StrictMode>
  );
}

export default App;

