import React, { Suspense } from 'react';
import Tasks from './components/tasks/tasks';
import { initI18n } from '@cudo/mf-core';

const defaultLanguage = 'en-GB';
const supportedLanguages = [defaultLanguage, 'en-GB'];
initI18n('./assets/i18n/{{lng}}.json', defaultLanguage);
export function App() {
  console.log(' 1 mf task app')
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Tasks />
      </div>
    </Suspense>

    
  );
}

export default App;
