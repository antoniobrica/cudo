import React from 'react';
import './tab-menu.module.scss';
import { AccordionExampleMenu } from '@cudo/shared-components';
import { environment } from '../../../environments/environment';
import MicroFrontend from '../../../MicroFrontend';
import { Tab, Image } from 'semantic-ui-react';
import { NavLink, BrowserRouter as Router, Route, useLocation, useParams, useNavigate } from 'react-router-dom';
import { PlanningIndex } from '@cudo/mf-task-lib';
import { useProjectByIdQuery } from '../../services/useRequest';
import { GET_PROJECT_BY_ID } from '../../graphql/graphql';
import { useQuery } from '@apollo/client';
import { useMatch } from 'react-router-dom';

const {
  EACT_APP_COST_HOST: costHost,
  REACT_APP_MEETING_HOST: meetingHost,
  REACT_APP_TASK_HOST: taskHost,
  REACT_APP_DOCUMENT_HOST: documentHost,
} = environment;

/* eslint-disable-next-line */
export interface TabMenuProps {}
type params = {
  projectId: string;
};
function TabMenu(props: TabMenuProps) {
  const [worktypeName, setWorktype] = React.useState('');
  const [worktypes, setWorktypes] = React.useState();

  const history = useNavigate();
  const params = useParams<params>();
  console.log('urlparams', params.projectId);
  const projectId = params.projectId;

  const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
    variables: { projectId },
  });

  React.useEffect(() => {
    if (data) {
      setWorktype(data.projectById[0].projectWorkTypes[0].workTypeName);
      setWorktypes(data.projectById[0].projectWorkTypes);
    }
  }, [data]);

  const changeWorktypeName = (data) => {
    console.log('changeWorktypeName', data);
    setWorktype(data);
  };
  function TaskApp(history: any) {
    console.log('history---', history);

    return <MicroFrontend history={history} host={taskHost} name="TaskApp" />;
  }

  function DocumentApp(history: any) {
    return <MicroFrontend history={history} host={documentHost} name="DocumentApp" />;
  }

  function MeetingApp(history: any) {
    return <MicroFrontend history={history} host={meetingHost} name="MeetingApp" />;
  }

  function CostApp(history: any) {
    return <MicroFrontend history={history} host={costHost} name="CostApp" />;
  }
  function Home() {
    const [input, setInput] = React.useState('');

    const [isTask, setIsTask] = React.useState(false);
    const data = 'parrent';

    // const { path, url } = useMatch('/:projectId/*');
    //     const { url  } = useRouteMatch();
    // const { url } = useMatch();
    const match = useMatch('/projects/:projectId/*');
    if (!match) {
      return <div>No match</div>;
    }

    const { projectId } = match.params;

    const callbackFunction = (childData) => {
      setInput(childData);
      if (childData == 'task') {
        setIsTask(true);
      } else {
        setIsTask(false);
      }
    };
    const handleOpenProject = (item) => {
      // props.parentCallback(item)
    };
    const panes = [
      {
        menuItem: {
          key: 'Overview',
          icon: 'file alternate outline',
          content: 'Overview',
          to: `${projectId}/overview`,
          as: NavLink,
          exact: true,
        },
        render: () => (
          <Route
            // path={`${projectId}/overview`}
            path={`/overview`}
            element={
              <Tab.Pane attached={false} onClick={handleOpenProject('overview')}>
                <div className="ui-tabs">
                  <div className="text-center ">
                    <Image src="https://react.semantic-ui.com/images/wireframe/image.png" size="small" wrapped />
                  </div>
                  <div className="text-center margin-top">
                    <span className="found">No Data Found</span>
                    <p className="project-sub" style={{ color: '#9A9EA1' }}>
                      Hey User, you don't have any active sub project lists on this project. Click the button <br />{' '}
                      below to create a sub project list.
                    </p>
                  </div>
                </div>
              </Tab.Pane>
            }
          />
        ),
      },
      {
        menuItem: {
          key: 'Task',
          icon: 'shield alternate',
          content: 'Task',
          to: `${projectId}/task`,
          as: NavLink,
          exact: true,
        },
        render: () => (
          <Route
            path={`${projectId}/task`}
            element={
              <Tab.Pane onClick={handleOpenProject('task')}>
                <TaskApp id={params.projectId}></TaskApp>
              </Tab.Pane>
            }
          />
        ),
      },
      {
        menuItem: {
          key: 'Planning',
          icon: 'flag outline',
          to: `${projectId}/planning`,
          as: NavLink,
          exact: true,
          content: 'Planning',
        },
        render: () => (
          <Route
            path={`${projectId}/planning`}
            element={
              <Tab.Pane attached={false} onClick={handleOpenProject('planning')}>
                <PlanningIndex worktypes={worktypes}></PlanningIndex>
              </Tab.Pane>
            }
          />
        ),
      },
      {
        menuItem: {
          key: 'Cost',
          icon: 'money bill alternate outline',
          content: 'Cost',
          to: `${projectId}/cost`,
          as: NavLink,
          exact: true,
        },
        render: () => (
          <Route
            path={`${projectId}/cost`}
            element={
              <Tab.Pane attached={false} onClick={handleOpenProject('cost')}>
                <CostApp />
              </Tab.Pane>
            }
          />
        ),
      },
      {
        menuItem: {
          key: 'Tender',
          icon: 'gavel',
          content: 'Tender',
          to: `${projectId}/tender`,
          as: NavLink,
          exact: true,
        },
        render: () => (
          <Route
            path={`${projectId}/tender`}
            element={
              <Tab.Pane attached={false} onClick={handleOpenProject('tender')}>
                Tender
              </Tab.Pane>
            }
          />
        ),
      },
      {
        menuItem: {
          key: 'Meetings',
          icon: 'calendar outline',
          content: 'Meetings',
          to: `${projectId}/meetings`,
          as: NavLink,
          exact: true,
        },
        render: () => (
          <Route
            path={`${projectId}/meetings`}
            element={
              <Tab.Pane attached={false} onClick={handleOpenProject('meetings')}>
                <MeetingApp />
              </Tab.Pane>
            }
          />
        ),
      },
      {
        menuItem: {
          key: ' ',
          icon: 'folder open outline',
          content: 'Files',
          to: `${projectId}/files`,
          as: NavLink,
          exact: true,
        },
        render: () => (
          <Route
            element={
              <Tab.Pane attached={false} onClick={handleOpenProject('files')}>
                <DocumentApp />
              </Tab.Pane>
            }
          />
        ),
      },
      {
        menuItem: {
          key: 'Questions',
          icon: 'question circle outline',
          content: 'Questions',
          to: `${projectId}/questions`,
          as: NavLink,
          exact: true,
        },
        render: () => (
          <Route
            path={`${projectId}/questions`}
            element={
              <Tab.Pane attached={false} onClick={handleOpenProject('questions')}>
                Questions
              </Tab.Pane>
            }
          />
        ),
      },
      {
        menuItem: {
          key: 'People',
          icon: 'user outline',
          content: 'People',
          to: `${projectId}/people`,
          as: NavLink,
          exact: true,
        },
        render: () => (
          <Route
            path={`${projectId}/people`}
            element={
              <Tab.Pane attached={false} onClick={handleOpenProject('people')}>
                People
              </Tab.Pane>
            }
          />
        ),
      },
      {
        menuItem: {
          key: 'Settings',
          icon: 'setting',
          content: 'Settings',
          to: `${projectId}/settings`,
          as: NavLink,
          exact: true,
        },
        render: () => (
          <Route
            path={`${projectId}/settings`}
            element={
              <Tab.Pane attached={false} onClick={handleOpenProject('settings')}>
                Settings
              </Tab.Pane>
            }
          />
        ),
      },
      {
        menuItem: {
          key: 'Messages',
          icon: 'envelope open outline',
          content: 'Messages',
          to: `${projectId}/messages`,
          as: NavLink,
          exact: true,
        },
        render: () => (
          <Route
            path={`${projectId}/messages`}
            element={
              <Tab.Pane attached={false} onClick={handleOpenProject('messages')}>
                Messages
              </Tab.Pane>
            }
          />
        ),
      },
    ];

    return (
      <Router>
        <div className="app-content-body-dash navbar-collapse box-shadow bg-white-only">
          <div>
            <span className="">{worktypeName ? worktypeName : 'WorktypeName'}</span> |{' '}
            <span className="preliminary-font">Preliminary Studies</span>
          </div>
          <Route>
            <Tab className="ui-tabs" menu={{ secondary: true, pointing: true }} panes={panes} />
          </Route>
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
      {data ? (
        <div>
          <AccordionExampleMenu changeWorktypeName={changeWorktypeName} workTypeData={data}></AccordionExampleMenu>
          <Home></Home>
        </div>
      ) : null}
    </div>
  );
}

export default TabMenu;
