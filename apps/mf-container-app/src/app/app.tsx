import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import MicroFrontend from "../MicroFrontend";
import "./app.module.scss";
import { environment } from "../environments/environment";
import { Email } from './login/login'
import { Menubar, UserProfile } from '@cudo/shared-components';
import '../../../../libs/shared-components/src/style/index.scss';
import { SessionProvider } from "./services/session";
import { Callback } from "./containers/Callback";
import { Settings } from "./containers/Settings";
import { Verify } from "./containers/Verify";
import { Recover } from "./containers/Recover";
import { Register } from "./containers/Register";
import { Error } from "./containers/Error"
import { Login } from "./containers/Login"
import config from "./config/kratos"
import LoginPassword from "./login-password/login-password";
import LoginSelect from "./login-select/login-select";
import { isAuthenticated, login, logout, profile, ToEmail } from "./services/auth";

const defaultHistory = createBrowserHistory();

const {
  REACT_APP_PROJECT_HOST: projectHost,
} = environment;

function ProjectApp(history: any) {
  return (
    <MicroFrontend history={history} host={projectHost} name="ProjectApp" />
  );
}

function userprofile(history: any) {
  return (
    <UserProfile image ></UserProfile>
  );
}

function Home({ history }) {
  const [input, setInput] = useState("");
  const [state, setState] = useState('');
  const data = "parrent"
  useEffect(() => {
    if (!isAuthenticated()) ToEmail()
  }, [])
  const callbackFunction = (childData) => {
    setInput(childData);
    switch (childData) {
      case "project":
        console.log(childData)
        setState('add-project');
        break;
      case "logout":
        setState('');
        logout();
        break;
      case "profile":
        // setState('add-profile');
        // profile();
        break;
      default:
        setState('');
        break;
    }
  };

  return (
    <div>
      <Router>
        <Menubar data={data} parentCallback={callbackFunction}></Menubar>
        <Switch>
          <Route path='/project' render={() => <ProjectApp history={history} />} />
          <Route path='/profile' render={() => <UserProfile history={history} />} />
        </Switch>
        {/* <div className="home">
          {state === 'add-project' ?
            <div>
              <ProjectApp></ProjectApp>
            </div> :
            null}
          {state === 'add-profile' ?
            <div>
              <UserProfile image ></UserProfile>
            </div> :
            null}
        </div> */}
      </Router>
    </div>
  );
}

function App() {
  const history = useHistory();
  return (
    <div className="App">
      <Router>
        <SessionProvider>
          <Switch>
            <Route exact path="/home" render={() => <Home history={history} />} />
            <Route exact path="/" component={LoginSelect} />
            <Route path="/callback" component={Callback} />
            <Route path={config.routes.loginEmail.path} component={Email} />
            <Route path={config.routes.loginPasswoord.path} component={LoginPassword} />
            <Route path={config.routes.loginSelect.path} component={LoginSelect} />
            <Route path={config.routes.login.path} component={LoginPassword} />
            <Route path={config.routes.settings.path} component={Settings} />
            <Route path={config.routes.verification.path} component={Verify} />
            <Route path={config.routes.recovery.path} component={Recover} />
            <Route path={config.routes.registration.path} component={Register} />
            <Route path={config.routes.error.path} component={Error} />
          </Switch>
        </SessionProvider>
      </Router>
    </div>
  )
}

export default App;

