import React from 'react';
import { Route, Outlet, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MicroFrontend from '../MicroFrontend';
import './app.module.scss';
import { environment } from '../environments/environment';
import { Email } from './login/login';
// import { Menubar, UserProfileView } from '@cudo/shared-components/src';
// import { SessionProvider } from './services/session';
// import { Callback } from './containers/Callback';
import { Settings } from './containers/Settings';
import { Verify } from './containers/Verify';
import { Recover } from './containers/Recover';
import { Register } from './containers/Register';
import { Error } from './containers/Error';
import { Login } from './containers/Login';
import config from './config/kratos';
import LoginPassword from './login-password/login-password';
import LoginSelect from './login-select/login-select';
import { isAuthenticated, login, logout, profile, ToEmail } from './services/auth';
import UserProfile from './user-profile/user-profile';
import { UserRegistration } from './user-registration/user-registration';
import { Home } from './home/home';
import { Provider } from 'react-redux';
import { store } from './store';
import Signup from './signup';
// import SignIn from './sign-in';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { CudoApolloClient } from './services/apollo-client';
import { initI18n } from '@cudo/mf-core';

const defaultLanguage = 'en-GB';
const supportedLanguages = [defaultLanguage, 'en-GB'];
initI18n('./assets/i18n/de-DE.json', defaultLanguage);

// const client = new CudoApolloClient();

const GRAPHQL_ENDPOINT = (process.env.NEXT_PUBLIC_GRAPHQL as string) || 'http://localhost:5001/graphql';

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Provider store={store}>
          {/* <SessionProvider> */}
            <Routes>
              <Route path="/home" element={<Home />} />
              {/* <Route path="/" element={<HomeLogin />} />
              <Route path="/" element={<LoginSelect />} />
              <Route path="/callback" element={<Callback />} />
              <Route path={config.routes.loginEmail.path} element={<Email />} />
              <Route path={config.routes.loginPasswoord.path} element={<LoginPassword />} />
              <Route path={config.routes.loginSelect.path} element={<LoginSelect />} />
              <Route path={config.routes.login.path} element={<LoginPassword />} />
              <Route path={config.routes.verification.path} element={<Verify />} />
              <Route path={config.routes.recovery.path} element={<Recover />} />
              <Route path={config.routes.registration.path} element={<UserRegistration />} />
              <Route path={config.routes.error.path} element={<Error />} />
              <Route path="/sign-up" element={<Signup />} /> */}
            </Routes>
            <Outlet />
          {/* </SessionProvider> */}
        </Provider>
      </ApolloProvider>
    </div>
  );
}

export default App;
