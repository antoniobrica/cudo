import React, { Suspense, useState }  from 'react';

import styles from './app.module.scss';
import {SetList} from '@cudo/ui';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import ProjectInfo from './components/project-info/project-info';
 
import { initI18n } from '@cudo/mf-core';
import { Loading } from '@cudo/ui'
// import { Route, Link } from 'react-router-dom';
import { TestComponent } from './test-component/test-component';
import { createBrowserHistory } from "history";
import MicroFrontend from "../MicroFrontend";
const defaultLanguage = 'de-DE';
const supportedLanguages = [defaultLanguage, 'en-GB'];
import {Menubar} from '@cudo/shared-components';  
  
import ModalExampleModal from 'libs/shared-components/src/lib/components/modal/modal';
import Tabsbar from 'libs/shared-components/src/lib/components/tabs/tabs'
import { environment } from "../environments/environment";
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
    <Suspense fallback={<Loading />}>
      <div>
      <div className={styles.app}>
       {/* <Tabsbar></Tabsbar> */}
       {/* <TaskApp></TaskApp> */}
       <ProjectInfo ></ProjectInfo>
    </div>
      </div> 
      </Suspense>

  );
}

  


function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={loadApp} />
        </Switch>
      </BrowserRouter></React.StrictMode>
  );
}

export default loadApp;

