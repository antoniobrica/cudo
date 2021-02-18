import React from 'react';
 

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';
 
  import {Cardbar, Menubar,Tabsbar,Messagebar,Loginbar} from '@cudo/shared-components';  
  
import ModalExampleModal from 'libs/shared-components/src/lib/components/modal/modal';
import ModalExampleModal2 from 'libs/shared-components/src/lib/components/modal/modal2';
import AccordionExampleMenu from 'libs/shared-components/src/lib/components/menu/sidebar';
// import { Sidebar } from 'semantic-ui-react';

export function App() {
  return (
    <div>
   <Menubar></Menubar> 
   <AccordionExampleMenu></AccordionExampleMenu>
   <Tabsbar></Tabsbar>
    <ModalExampleModal></ModalExampleModal>  
    <Cardbar></Cardbar> 
    <Messagebar></Messagebar><br/>
    <Loginbar></Loginbar>
     <ModalExampleModal2></ModalExampleModal2><br/>
    
    </div>
    
   
   
    
  );
}

export default App;
