import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useHistory, useRouteMatch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import MicroFrontend from "../MicroFrontend";
import "./app.module.scss";
import { environment } from "../environments/environment";
import { Email } from './login/login'
import { Menubar, UserProfileView } from '@cudo/shared-components';
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
import UserProfile from "./user-profile/user-profile";
import { UserRegistration } from "./user-registration/user-registration";
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { Home } from "./home/home";
import MfProjectAppMount from "./mf-project-app-mount/mf-project-app-mount";

import { useTranslation } from 'react-i18next';
import { initI18n } from "@cudo/mf-core";
import TestModel from "./test-model/test-model";
const defaultHistory = createBrowserHistory();

const defaultLanguage = 'en-GB';
const supportedLanguages = [defaultLanguage, 'en-GB'];
initI18n('./assets/i18n/{{lng}}.json', defaultLanguage);
function App() {

  const { url, path } = useRouteMatch();
  const history = useHistory();
  return (
    <div className="App">
      <SessionProvider>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route exact path="/" component={LoginSelect} />
          <Route path="/callback" component={Callback} />
          <Route path={config.routes.loginEmail.path} component={Email} />
          <Route path={config.routes.loginPasswoord.path} component={LoginPassword} />
          <Route path={config.routes.loginSelect.path} component={LoginSelect} />
          <Route path={config.routes.login.path} component={LoginPassword} />
          <Route path={config.routes.verification.path} component={Verify} />
          <Route path={config.routes.recovery.path} component={Recover} />
          <Route path={config.routes.registration.path} component={UserRegistration} />
          <Route path={config.routes.error.path} component={Error} />
          <Route path={config.routes.testmodal.path} component={TestModel} />
        </Switch>
      </SessionProvider>
    </div>
  )
}
// const App = ({ children }: any) => (
//   <Router>
//     <Switch>
//       {renderRoutes(routes)}
//     </Switch>
//   </Router>
// );

// App.propTypes = {
//   children: PropTypes.object,
// };

// App.defaultProps = {
//   children: null,
//   data: null
// };
export default App;
// changes for libs and shared components and design
