import React, { Suspense } from 'react';
import Tasks from './components/tasks/tasks';
// import { initI18n } from '@cudo/mf-core';
// eslint-disable-next-line @nx/enforce-module-boundaries

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import config from './redux/store';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

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
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div>
          <ApolloProvider client={client}>
            <Tasks />
          </ApolloProvider>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
