import React from 'react';
 

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';
 
  import {Cardbar, Menubar,Tabsbar,Messagebar,Loginbar, Logindrop,Loginpassword} from '@cudo/shared-components';  
  
import ModalExampleModal from 'libs/shared-components/src/lib/components/modal/modal';
import ModalExampleModal2 from 'libs/shared-components/src/lib/components/modal/modal2';
import ModalExampleCompany from 'libs/shared-components/src/lib/components/modal/companypopup'; 
import ModalExamplePrinting from 'libs/shared-components/src/lib/components/modal/addprintingpopup';
import AccordionExampleMenu from 'libs/shared-components/src/lib/components/menu/sidebar';
// import { Sidebar } from 'semantic-ui-react';

export function App() {
  return (
    <div>
   <Menubar></Menubar> 
   <AccordionExampleMenu></AccordionExampleMenu>
   <Tabsbar></Tabsbar>
    <ModalExampleModal></ModalExampleModal> <br/> <br/><br/>  
    <Cardbar></Cardbar> 
    <Messagebar></Messagebar><br/>
    <Loginbar></Loginbar><br/>
    <Logindrop></Logindrop><br/>
    <Loginpassword></Loginpassword>
     <ModalExampleModal2></ModalExampleModal2><br/>
    <ModalExampleCompany></ModalExampleCompany><br/>
    <ModalExamplePrinting></ModalExamplePrinting><br/>

    </div>
    
   
   
    
  );
}

export default App;
