import * as React from 'react';

// import NxWelcome from './nx-welcome';

import { initI18n } from '@cudo/mf-core';

import { Link, Route, Routes, useNavigate } from 'react-router-dom';
// import Menubar from './components/menu/menu';
import Menubar from '@shared-components/lib/components/menu/menu';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import config from './redux/store';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const Container = React.lazy(() => import('mf-container-app/Module'));
const Project = React.lazy(() => import('mf-project-app/Module'));
const Task = React.lazy(() => import('mf-task-app/Module'));

const { store, persistor } = config();

const client = new ApolloClient({
  uri: 'http://localhost:5007/graphql',
  cache: new InMemoryCache(),
});

const defaultLanguage = 'en-GB';
const supportedLanguages = [defaultLanguage, 'en-GB'];
initI18n('./assets/i18n/en-GB.json', defaultLanguage);
// import './assets/i18n/en-GB.json';

const data = 'parrent';

const callbackFunction = (childData) => {
  // switch (childData) {
  //   case 'logout':
  //     logout();
  //     break;
  //   case 'project':
  //     // goToProjectDashboard();
  //     navigate('/home/project');
  //     break;
  //   default:
  //     break;
  // }
};

const logoutUrl = 'logoutUrl';

export function App() {
  const [menuExpand, setMenuExpand] = React.useState(false);

  const navigate = useNavigate();

  const onClickMenuExpand = () => {
    setMenuExpand(!menuExpand);
  };

  return (
    <React.Suspense fallback={null}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ApolloProvider client={client}>
            <div className={menuExpand ? 'expand-main-menu' : 'collapsed-main-menu'}>
              <div>
                <Menubar
                  data={data}
                  parentCallback={callbackFunction}
                  mainMenuExpand={onClickMenuExpand}
                  history={navigate}
                  logoutUrl={logoutUrl}
                  username={'Fahim Arif'}
                ></Menubar>
              </div>
            </div>
          </ApolloProvider>
        </PersistGate>
      </Provider>

      <Routes>
        <Route path="/mf-container-app" element={<Container />} />
        <Route path="/" element={<Project />} />
        <Route path="/home/project/*" element={<Task />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
