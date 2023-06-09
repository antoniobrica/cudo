import React, { Suspense } from 'react';
import Tasks from './components/tasks/tasks';
import { initI18n } from '@cudo/mf-core';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import config from './redux/store';
import { Routes } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { LazyLoading } from '@cudo/shared-components';
import { Route } from 'react-router-dom';

const defaultLanguage = 'en-GB';
const supportedLanguages = [defaultLanguage, 'en-GB'];
initI18n('./assets/i18n/en-GB.json', defaultLanguage);

const { store, persistor } = config();

const client = new ApolloClient({
  uri: 'http://localhost:5007/graphql',
  cache: new InMemoryCache(),
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<LazyLoading />}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Routes>
              <Route path="/" element={<Tasks />} />
            </Routes>
          </PersistGate>
        </Provider>
      </Suspense>
    </ApolloProvider>
  );
}

export default App;
