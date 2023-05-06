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
import { isAuthenticated, login, logout, profile, ToEmail } from './services/auth';
import UserProfile from './user-profile/user-profile';
import { UserRegistration } from './user-registration/user-registration';
import { Home } from './home/home';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <SessionProvider>
          <Routes>
            <Route path="/home" element={<Home />} />
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
            {/* <Route path={config.routes.testmodal.path} element={<TestModel />} /> */}
          </Routes>
          <Outlet />
        </SessionProvider>
      </Provider>
    </div>
  );
}

export default App;

// import React, { useEffect, useState } from 'react';

// import { FrontendApi, Configuration, Session, Identity } from '@ory/client';

// // Get your Ory url from .env
// // Or localhost for local development
// const basePath = process.env.REACT_APP_ORY_URL || 'http://localhost:4000';
// const ory = new FrontendApi(
//   new Configuration({
//     basePath,
//     baseOptions: {
//       withCredentials: true,
//     },
//   })
// );

// function App() {
//   const [session, setSession] = useState<Session | undefined>();
//   const [logoutUrl, setLogoutUrl] = useState<string | undefined>();

//   // Returns either the email or the username depending on the user's Identity Schema
//   const getUserName = (identity: Identity) => identity.traits.email || identity.traits.username;

//   // Second, gather session data, if the user is not logged in, redirect to login
//   useEffect(() => {
//     ory
//       .toSession()
//       .then(({ data }) => {
//         // User has a session!
//         setSession(data);
//         ory.createBrowserLogoutFlow().then(({ data }) => {
//           // Get also the logout url
//           setLogoutUrl(data.logout_url);
//         });
//       })
//       .catch((err) => {
//         console.error(err);
//         // Redirect to login page
//         window.location.replace(`${basePath}/ui/login`);
//       });
//   }, []);

//   if (!session) {
//     // Still loading
//     return <h1>Loading...</h1>;
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img className="App-logo" alt="logo" />
//         <p>Welcome to Ory, {getUserName(session?.identity)}.</p>
//         <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
//           Learn React
//         </a>
//         {
//           // Our logout link
//           <a href={logoutUrl}>Logout</a>
//         }
//       </header>
//     </div>
//   );
// }

// export default App;
