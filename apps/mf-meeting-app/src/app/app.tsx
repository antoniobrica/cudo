import React from 'react';
import { initI18n } from '@cudo/mf-core';

// import AddSession from './add-session/add-session';
import SessionList from './components/session-listing/session-listing'

const defaultLanguage = 'en-GB';
const supportedLanguages = [defaultLanguage, 'en-GB'];
initI18n('/assets/i18n/{{lng}}.json', defaultLanguage);

export function App() {
  return (
    <div>
      {/* <AddSession /> */}
      <SessionList />
    </div>
  );
}

export default App;
