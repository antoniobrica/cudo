import React from 'react';
import './tab-menu.module.scss';
import { AccordionExampleMenu } from "@cudo/shared-components"
import { environment } from "../../../environments/environment";
import MicroFrontend from "../../../MicroFrontend";
import {
  Button,
  Header,
  Modal,
  Tab, Image,
  Input,
  Form,
  Grid,
  Dropdown,
  Select,
  TextArea,
  Card
} from 'semantic-ui-react';
import { NavLink, BrowserRouter as Router, useRouteMatch, Route, Switch, useLocation, useParams } from 'react-router-dom';
import { useHistory } from "react-router";
import Planning from '../../../../../../libs/mf-task-lib/src/lib/components/planning/planning'
import { useProjectByIdQuery } from '../../services/useRequest';
import { GET_PROJECT_BY_ID } from '../../graphql/graphql';
import { useQuery } from '@apollo/client';



const {
  EACT_APP_COST_HOST: costHost,
  REACT_APP_MEETING_HOST: meetingHost,
  REACT_APP_TASK_HOST: taskHost,
  REACT_APP_DOCUMENT_HOST: documentHost
} = environment;


/* eslint-disable-next-line */
export interface TabMenuProps { }

function TabMenu(props: TabMenuProps) {
  const [worktypeName, setWorktype] = React.useState("");

  const history = useHistory();
  let params = useParams();
  console.log('urlparams', params.projectId)
  let projectId = params.projectId

  const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
    variables: { projectId },
  });
 
  React.useEffect(() => {
    if (data) {
      setWorktype( data.projectById[0].projectWorkTypes[0].workTypeName );
    }
  }, [data]);

  const changeWorktypeName=(data)=>{
    console.log('changeWorktypeName', data)
    setWorktype(data);
  }
  function TaskApp(history: any) {
    console.log('history---', history);

    return (
      <MicroFrontend history={history} host={taskHost} name="TaskApp" />
    );
  }

  function DocumentApp(history: any) {
    return (
      <MicroFrontend history={history} host={documentHost} name="DocumentApp" />
    );
  }



  function Home() {
    const [input, setInput] = React.useState("");

    const [isTask, setIsTask] = React.useState(false);
    const data = "parrent"
    const { url, path } = useRouteMatch();

    const callbackFunction = (childData) => {
      setInput(childData);
      if (childData == "task") {
        setIsTask(true);
      }
      else {
        setIsTask(false);
      }
    };
    const handleOpenProject = (item) => {
      // props.parentCallback(item)
    }
    const panes = [
      {
        menuItem: { key: 'Overview', icon: 'file alternate outline', content: 'Overview', to: `${url}/overview`, as: NavLink, exact: true, },
        render: () => <Route
          path={`${url}/overview`}
          exact
          render={() => (
            <Tab.Pane attached={false} onClick={handleOpenProject('overview')}>

              <div className="ui-tabs">
                <div className="text-center ">
                  <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' wrapped />

                </div>
                <div className="text-center margin-top">

                  <span className="found">No Data Found</span>
                  <p className="project-sub" style={{ color: '#9A9EA1' }}>Hey User, you don't have any active sub project lists on this project. Click the button <br /> below  to create a sub project list.</p>
                </div>
              </div>


            </Tab.Pane>
          )}
        />,
      },
      {
        menuItem: { key: 'Task', icon: 'shield alternate', content: 'Task', to: `${url}/task`, as: NavLink, exact: true, },
        render: () => <Route
          path={`${url}/task`}
          exact
          render={() => (
            <Tab.Pane onClick={handleOpenProject('task')}>
              <TaskApp id={params.projectId}></TaskApp>
            </Tab.Pane>
          )}
        />,
      },
      {

        menuItem: { key: 'Planning', icon: 'flag outline', to: `${url}/planning`, as: NavLink, exact: true, content: 'Planning' },
        render: () => <Route
          path={`${url}/planning`}
          exact
          render={() => (
            <Tab.Pane attached={false} onClick={handleOpenProject('planning')}>
              <Planning></Planning>
              </Tab.Pane>
          )}
        />,
      },
      {

        menuItem: { key: 'Cost', icon: 'money bill alternate outline', content: 'Cost', to: `${url}/cost`, as: NavLink, exact: true, },
        render: () => <Route
          path={`${url}/cost`}
          exact
          render={() => (
            <Tab.Pane attached={false} onClick={handleOpenProject('cost')}>Cost</Tab.Pane>
          )}
        />,
      },
      {

        menuItem: { key: 'Tender', icon: 'gavel', content: 'Tender', to: `${url}/tender`, as: NavLink, exact: true },
        render: () => <Route
          path={`${url}/tender`}
          exact
          render={() => (
            <Tab.Pane attached={false} onClick={handleOpenProject('tender')}>Tender</Tab.Pane>
          )}
        />,
      },
      {

        menuItem: { key: 'Meetings', icon: 'calendar outline', content: 'Meetings', to: `${url}/meetings`, as: NavLink, exact: true },
        render: () => <Route
          path={`${url}/meetings`}
          exact
          render={() => (

            <Tab.Pane attached={false} onClick={handleOpenProject('meetings')}>Meetings</Tab.Pane>
          )}
        />,
      },
      {

        menuItem: { key: ' ', icon: 'folder open outline', content: 'Files', to: `${url}/files`, as: NavLink, exact: true, },
        render: () =>
          <Route
            path={`${url}/files`}
            exact
            render={() => (
              <Tab.Pane attached={false} onClick={handleOpenProject('files')}>
                <DocumentApp />
              </Tab.Pane>
            )}
          />
        ,
      },
      {

        menuItem: { key: 'Questions', icon: 'question circle outline', content: 'Questions', to: `${url}/questions`, as: NavLink, exact: true },
        render: () =>
          <Route
            path={`${url}/questions`}
            exact
            render={() => (
              <Tab.Pane attached={false} onClick={handleOpenProject('questions')}>Questions</Tab.Pane>
            )}
          />
        ,
      },
      {

        menuItem: { key: 'People', icon: 'user outline', content: 'People', to: `${url}/people`, as: NavLink, exact: true },
        render: () =>
          <Route
            path={`${url}/people`}
            exact
            render={() => (

              <Tab.Pane attached={false} onClick={handleOpenProject('people')}>People</Tab.Pane>)}
          />
        ,
      },
      {

        menuItem: { key: 'Settings', icon: 'setting', content: 'Settings', to: `${url}/settings`, as: NavLink, exact: true },
        render: () => <Route
          path={`${url}/settings`}
          exact
          render={() => (
            <Tab.Pane attached={false} onClick={handleOpenProject('settings')}>Settings</Tab.Pane>)}
        />
        ,
      },
      {

        menuItem: { key: 'Messages', icon: 'envelope open outline', content: 'Messages', to: `${url}/messages`, as: NavLink, exact: true },
        render: () => <Route
          path={`${url}/messages`}
          exact
          render={() => (
            <Tab.Pane attached={false} onClick={handleOpenProject('messages')}>Messages</Tab.Pane>)}
        />
        ,
      },
    ]

    return (
      <Router>
        <div className="app-content-body-dash navbar-collapse box-shadow bg-white-only">
          <div>
            <span className="">{worktypeName? worktypeName: 'WorktypeName'}</span> | <span className="preliminary-font">Preliminary Studies</span>
          </div>
          <Switch>
            <Tab className="ui-tabs" menu={{ secondary: true, pointing: true }} panes={panes} />
          </Switch>
        </div>
      </Router>



    );
    // return (
    //   <div>
    //     <Tabsbar parentCallback={callbackFunction}></Tabsbar>
    //     <div className="home">
    //       {isTask ?
    //         <div>
    //           <TaskApp></TaskApp>
    //         </div> :
    //         null}

    //     </div>
    //   </div>
    // );
  }



  return (
    <div>
      {data ?
        <div>
          <AccordionExampleMenu changeWorktypeName={changeWorktypeName} workTypeData={data}>
          </AccordionExampleMenu>
          <Home></Home>
        </div> :
        null}
    </div>
  );
}

export default TabMenu;
