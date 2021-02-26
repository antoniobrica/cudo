import React from 'react';
 
// import ModalExampleModal2 from 'libs/shared-components/src/lib/components/modal/modal2';
import Tabsbar from 'libs/shared-components/src/lib/components/tabs/tabs'
import CreateTask from './components/create-task/create-task';


export function App() {
  return (
    <div>
    <Tabsbar></Tabsbar>
    <CreateTask />
    </div>
       
  );
}

export default App;
