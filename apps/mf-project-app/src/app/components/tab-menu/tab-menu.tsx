import React from 'react';
import Tabsbar from 'libs/shared-components/src/lib/components/tabs/tabs'
import AccordionExampleMenu from 'libs/shared-components/src/lib/components/menu/sidebar';
import './tab-menu.module.scss';
 
import { environment } from "../../../environments/environment";
import MicroFrontend from "../../../MicroFrontend";


const {
  EACT_APP_COST_HOST: costHost,
  REACT_APP_MEETING_HOST: meetingHost,
  REACT_APP_TASK_HOST: taskHost,
} = environment;


/* eslint-disable-next-line */
export interface TabMenuProps {}

 function TabMenu(props: TabMenuProps) {

  function TaskApp(history: any) {
    return (
      <MicroFrontend history={history} host={taskHost} name="TaskApp" />
    );
  }


  function Home() {
    const [input, setInput] = React.useState("");
    const [isTask, setIsTask] = React.useState(false);
    const data = "parrent"
    const callbackFunction = (childData) => {
      setInput(childData);
      if (childData == "task") {
        setIsTask(true);
      }
      else {
        setIsTask(false);
      }
    };
    return (
      <div>
        {/* <Header /> */}
        <Tabsbar parentCallback={callbackFunction}></Tabsbar>
        <div className="home">
          {isTask ?
            <div>
              <TaskApp></TaskApp>
            </div> :
            null}
  
        </div>
      </div>
    );
  }
  
  

  return (
    <div>
     <AccordionExampleMenu>
     </AccordionExampleMenu>
     <Home></Home>
    </div>
  );
}

export default TabMenu;
