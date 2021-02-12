import React from 'react';
 

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';
 
  import {Cardbar, Menubar,Tabsbar,Messagebar} from '@cudo/shared-components';  
  
import ModalExampleModal from 'libs/shared-components/src/lib/components/modal/modal';
import ModalExampleModal2 from 'libs/shared-components/src/lib/components/modal/modal2';

// import { Sidebar } from 'semantic-ui-react';

export function App() {
  return (
    <div>
   <Menubar></Menubar> 
   <Tabsbar></Tabsbar>
    <ModalExampleModal></ModalExampleModal>  
    <Cardbar></Cardbar> 
    <Messagebar></Messagebar><br/>
     
     <ModalExampleModal2></ModalExampleModal2>
    </div>
    
   
   
    
  );
}

export default App;
