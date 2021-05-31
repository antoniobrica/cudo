import { initI18n, changeLanguage } from '@cudo/mf-core';
import React, { Suspense } from 'react';
import { Button } from 'semantic-ui-react';
import AddNewItem from './add-new-item/add-new-item';
const defaultLanguage = 'de-DE';
const supportedLanguages = [defaultLanguage, 'en-GB'];
initI18n('/assets/i18n/{{lng}}.json', defaultLanguage);

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <AddNewItem></AddNewItem>
        <Button onClick={() => changeLanguage('en-GB')}></Button>
        <Button onClick={() => changeLanguage('de-DE')}></Button>
      </div>
    </Suspense>
  );
}

export default App;
