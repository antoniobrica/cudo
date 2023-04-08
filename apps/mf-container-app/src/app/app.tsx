import React from 'react';
import { Route, Outlet, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MicroFrontend from '../MicroFrontend';
import './app.module.scss';
import { environment } from '../environments/environment';
import { Email } from './login/login';
import { Menubar, UserProfileView } from '@cudo/shared-components/src';
import '@cudo/shared-components/src/style/index.scss';
import { SessionProvider } from './services/session';
import { Callback } from './containers/Callback';
import { Settings } from './containers/Settings';
import { Verify } from './containers/Verify';
import { Recover } from './containers/Recover';
import { Register } from './containers/Register';
import { Error } from './containers/Error';
import { Login } from './containers/Login';
import config from './config/kratos';
import LoginPassword from './login-password/login-password';
import LoginSelect from './login-select/login-select';
import {
  isAuthenticated,
  login,
  logout,
  profile,
  ToEmail,
} from './services/auth';
import UserProfile from './user-profile/user-profile';
import { UserRegistration } from './user-registration/user-registration';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { Home } from './home/home';
import MfProjectAppMount from './mf-project-app-mount/mf-project-app-mount';

import { useTranslation } from 'react-i18next';
// import { initI18n } from '@cudo/mf-core';
// const defaultHistory = createBrowserHistory();

// const defaultLanguage = 'en-GB';
// const supportedLanguages = [defaultLanguage, 'en-GB'];
// initI18n('./assets/i18n/{{lng}}.json', defaultLanguage);

function App() {
  return (
    <div className="App">
      <SessionProvider>
        <Routes>
          <Route path="/" element={<LoginSelect />} />
          <Route path="/home" element={<Home />} />
          <Route path="/callback" element={<Callback />} />
          <Route path={config.routes.loginEmail.path} element={<Email />} />
          <Route
            path={config.routes.loginPasswoord.path}
            element={<LoginPassword />}
          />
          <Route
            path={config.routes.loginSelect.path}
            element={<LoginSelect />}
          />
          <Route path={config.routes.login.path} element={<LoginPassword />} />
          <Route path={config.routes.verification.path} element={<Verify />} />
          <Route path="/recovery" element={<Recover />} />
          <Route
            path={config.routes.registration.path}
            element={<UserRegistration />}
          />
          <Route path={config.routes.error.path} element={<Error />} />
        </Routes>
        <Outlet />
      </SessionProvider>
    </div>
  );
}

export default App;
