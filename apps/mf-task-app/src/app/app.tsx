import React, { Suspense } from 'react';
import Tasks from './components/tasks/tasks';
import { initI18n } from '@cudo/mf-core';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import config from './redux/store'

const defaultLanguage = 'en-GB';
const supportedLanguages = [defaultLanguage, 'en-GB'];
initI18n('./assets/i18n/{{lng}}.json', defaultLanguage);

const { store, persistor } = config()

export function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            <Tasks />
          </div>
        </Suspense>
      </PersistGate>
    </Provider>


  );
}

export default App;
// chagnes to update libs and shared component