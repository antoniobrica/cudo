import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import MicroFrontend from "../MicroFrontend";
import "./app.module.scss";
import { environment } from "../environments/environment";
import email from './login/login'
import { Menubar } from '@cudo/shared-components';
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
import { isAuthenticated, login, logout, profile } from "./services/auth";


// import Home from './home/home'
const defaultHistory = createBrowserHistory();

const {
  // EACT_APP_COST_HOST: costHost,
  REACT_APP_PROJECT_HOST: projectHost,
} = environment;

function Header() {
  return (
    <div className="banner">
      <h1 className="banner-title"> Welcome mf-container-app</h1>
    </div>
  );
}

function ProjectApp(history: any) {
  return (
    <MicroFrontend history={history} host={projectHost} name="ProjectApp" />
  );
}

// function CostApp(history: any) {
//   return (
//     <MicroFrontend history={history} host={costHost} name="CostApp" />
//   );
// }

function Home({ history }) {
  const [input, setInput] = useState("");
  const [isProject, setIsProject] = useState(false);
  const data = "parrent"
  useEffect(() => {
    if (!isAuthenticated()) login()
  }, [])
  const callbackFunction = (childData) => {
    setInput(childData);
    if (childData === "project") {
      setIsProject(true);
    }
    else if (childData === "logout") {
      setIsProject(false);
      logout();
    }
    else if (childData === "profile") {
      setIsProject(false);
      profile();
    }
    else {
      setIsProject(false);
    }
  };
  // const isAuth = () => (<div>
  //   {isAuthenticated() &&
  //     <React.Fragment>
  //       <div className="settings">
  //         <Link to={config.routes.settings.path}>Setting</Link>
  //       </div>
  //       <div className="logout">
  //         <button onClick={logout} className="a">Sign Out</button>
  //       </div>
  //     </React.Fragment>}
  // </div>)
  return (
    <div>
      {/* <Header /> */}
      <Menubar data={data} parentCallback={callbackFunction}></Menubar>
      <div className="home">
        {isProject ?
          <div>
            <ProjectApp></ProjectApp>
          </div> :
          null}

      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <SessionProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/callback" component={Callback} />
            <Route exact path={config.routes.login.path} component={Login} />
            <Route exact path={config.routes.settings.path} component={Settings} />
            <Route exact path={config.routes.verification.path} component={Verify} />
            <Route exact path={config.routes.recovery.path} component={Recover} />
            <Route exact path={config.routes.registration.path} component={Register} />
            <Route exact path={config.routes.error.path} component={Error} />
          </Switch>
        </SessionProvider>
      </Router>
    </div>
  )
}

export default App;

