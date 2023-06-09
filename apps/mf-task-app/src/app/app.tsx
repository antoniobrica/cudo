import React, { Suspense } from 'react';
import Tasks from './components/tasks/tasks';
// import { initI18n } from '@cudo/mf-core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import TabMenu from '../../../mf-project-app/src/app/components/tab-menu/tab-menu';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import config from './redux/store';
import { Routes } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AccordionExampleMenu, LazyLoading, Menubar } from '@cudo/shared-components';
import { Route } from 'react-router-dom';

// const defaultLanguage = 'en-GB';
// const supportedLanguages = [defaultLanguage, 'en-GB'];
// initI18n('./assets/i18n/en-GB.json', defaultLanguage);

const { store, persistor } = config();

const client = new ApolloClient({
  uri: 'http://localhost:5007/graphql',
  cache: new InMemoryCache(),
});

const client2 = new ApolloClient({
  uri: 'http://localhost:5005/graphql',
  cache: new InMemoryCache(),
});

export function App() {
  return (
    <Suspense fallback={<LazyLoading />}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div>
            <ApolloProvider client={client2}>
              <TabMenu />
            </ApolloProvider>
            <ApolloProvider client={client}>
              <Tasks />
            </ApolloProvider>
          </div>
        </PersistGate>
      </Provider>
    </Suspense>
  );
}

export default App;
