import { initI18n, changeLanguage } from '@cudo/mf-core';
import { CostList } from '@cudo/shared-components';
import React, { Suspense } from 'react';
import { Button } from 'semantic-ui-react';
import AddNewItem from './add-new-item/add-new-item';
import { GET_COST } from './graphql/graphql';
import { useCostQuery } from './services/useRequest';
const defaultLanguage = 'de-DE';
const supportedLanguages = [defaultLanguage, 'en-GB'];
initI18n('/assets/i18n/{{lng}}.json', defaultLanguage);

export function App() {
  const { loading, error, data } = useCostQuery(GET_COST);
  if (data) {
    console.log('====================================');
    console.log('data-cost', data);
    console.log('====================================');
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div>
          <AddNewItem ></AddNewItem>
        </div>
        <CostList></CostList>
        {/* <Button onClick={() => changeLanguage('en-GB')}>EN</Button>
        <Button onClick={() => changeLanguage('de-DE')}>DE</Button> */}
      </div>
    </Suspense>
  );
}

export default App;
