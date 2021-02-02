import React, { Suspense } from 'react';
import { initI18n } from '@cudo/mf-core';
import { Loading } from '@cudo/ui'
import { Route, Link } from 'react-router-dom';
import { TestComponent } from './test-component/test-component';
const defaultLanguage = 'de-DE';
const supportedLanguages = [defaultLanguage, 'en-GB'];

initI18n('./assets/i18n/{{lng}}.json', defaultLanguage);
export function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <header className="flex">
          <h1>Welcome to mf-project-app!</h1>
        </header>
        <TestComponent></TestComponent>
      </div></Suspense>

  );
}

export default App;
