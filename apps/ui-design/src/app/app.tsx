import React from 'react';
 

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';
 
  import {Cardbar, Menubar,Tabsbar,Messagebar} from '@cudo/shared-components';  
  
import ModalExampleModal from 'libs/shared-components/src/lib/components/modal/modal';

// import { Sidebar } from 'semantic-ui-react';

export function App() {
  return (
    <div>
   <Menubar></Menubar> 
   <Tabsbar></Tabsbar>
    <ModalExampleModal></ModalExampleModal>  
    <Cardbar></Cardbar> 
    <Messagebar></Messagebar>
    </div>
    
   
   
    
  );
}

export default App;
