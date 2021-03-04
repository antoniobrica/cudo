import React from 'react';
 
// import ModalExampleModal2 from 'libs/shared-components/src/lib/components/modal/modal2';
import Tabsbar from 'libs/shared-components/src/lib/components/tabs/tabs'
import CreateTask from './components/create-task/create-task';
import Tasks from '../components/tasks/tasks';
import AccordionExampleMenu from 'libs/shared-components/src/lib/components/menu/sidebar';
import { Menubar } from '@cudo/shared-components';



export function App() {
  return (
    <div>
    {/* <Tabsbar></Tabsbar> */}
    <Menubar data={'data'} parentCallback={''}></Menubar>
    <AccordionExampleMenu/>
    <Tasks/>
    </div>
       
  );
}

export default App;
