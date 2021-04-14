import React from 'react';


import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { AccordionExampleMenu, ModalExampleModal2, Cardbar, Menubar, Tabsbar, Messagebar, Loginbar, Logindrop, Loginpassword } from '@cudo/shared-components';

// import ModalExampleModal2 from 'libs/shared-components/src/lib/components/modal/modal2';
import ModalExampleCompany from 'libs/shared-components/src/lib/components/modal/companypopup';
import ModalExamplePrinting from 'libs/shared-components/src/lib/components/modal/addprintingpopup';
// import AccordionExampleMenu from 'libs/shared-components/src/lib/components/menu/sidebar';
import ListExampleFloated from 'libs/shared-components/src/lib/components/task/taskarea';
import ModalAddPrint from 'libs/shared-components/src/lib/components/modal/addfile';
import ModalAddFile from 'libs/shared-components/src/lib/components/modal/addedfile';
import FileStructure from 'libs/shared-components/src/lib/components/filestructure/filestask';
import ModalExampleSize from 'libs/shared-components/src/lib/components/modal/viewdetailsfile';
import UploadNewVersion from 'libs/shared-components/src/lib/components/modal/uploadnewversion';
import AddNewFolder from 'libs/shared-components/src/lib/components/modal/addfolder';
import PeopleList from 'libs/shared-components/src/lib/components/people/peoplelist';
import AddNewPeople from 'libs/shared-components/src/lib/components/people/addnewpeople';
import ModalDelete from 'libs/shared-components/src/lib/components/people/deleteconfirm';
import PremissionPeople from 'libs/shared-components/src/lib/components/people/premissionpeople';
import AddPeoplePermission from 'libs/shared-components/src/lib/components/people/addpeoplepermission';
import ProgressBar from 'libs/shared-components/src/lib/components/progress_bar/progressbar';
import ModalPin from 'libs/shared-components/src/lib/components/modal/pinaddfile';
import ManageFileStructure from 'libs/shared-components/src/lib/components/modal/managefilestructure';
import ProjectSetting from 'libs/shared-components/src/lib/components/projectsetting/projectsetting';
import EditProject from 'libs/shared-components/src/lib/components/projectsetting/editproject';
import UserProfile from 'libs/shared-components/src/lib/components/userprofile/userprofile';
import RegisterPage from 'libs/shared-components/src/lib/components/login/register';
import ModalAddSubLevel from 'libs/shared-components/src/lib/components/modal/addsublevel';
import UserProfileView from 'libs/shared-components/src/lib/components/userprofile/userprofileview';
import LoaderPage from 'libs/shared-components/src/lib/components/loader/loader';
import ModalAlert from 'libs/shared-components/src/lib/components/modal/alert';


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
    <ListExampleFloated></ListExampleFloated><br/><br/>
    <ModalAddPrint></ModalAddPrint><br/>
    <ModalAddFile></ModalAddFile><br/>
    <FileStructure></FileStructure><br/> 
    <ModalExampleSize></ModalExampleSize><br/>
    <UploadNewVersion></UploadNewVersion><br/>
    <AddNewFolder></AddNewFolder><br/>  
    <AddNewPeople></AddNewPeople><br/>
    <PeopleList></PeopleList><br/>
    <ModalDelete></ModalDelete><br/>
    <PremissionPeople></PremissionPeople><br/>
    <AddPeoplePermission></AddPeoplePermission><br/> 
     <ProgressBar></ProgressBar><br/>
     <ModalPin></ModalPin><br/>
     <ManageFileStructure></ManageFileStructure><br/>
    <ProjectSetting></ProjectSetting><br/>
   <ModalAddSubLevel></ModalAddSubLevel><br/>
    <EditProject></EditProject><br/>
    <UserProfile></UserProfile><br/>
    <RegisterPage></RegisterPage><br/>
    <UserProfileView></UserProfileView><br/>
    <LoaderPage></LoaderPage><br/>
    <ModalAlert></ModalAlert>
    </div>




  );
}

export default App;
