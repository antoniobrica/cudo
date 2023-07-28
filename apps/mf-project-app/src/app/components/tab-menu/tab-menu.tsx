import React from 'react';

import './tab-menu.module.scss';
// import { AccordionExampleMenu } from '@cudo/shared-components';
import { AccordionExampleMenu } from '@shared-components/lib/components/menu/sidebar';
import { environment } from '../../../environments/environment';
import MicroFrontend from '../../../MicroFrontend';
import { Tab, Image } from 'semantic-ui-react';
import { NavLink, Route, useLocation, useParams, useNavigate, useMatch, Routes } from 'react-router-dom';
// import { PlanningIndex } from '@cudo/mf-task-lib';
import { useProjectByIdQuery } from '../../services/useRequest';
import { GET_PROJECT_BY_ID } from '../../graphql/graphql';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

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
  console.log('tab menu');

  const [worktypeName, setWorktype] = React.useState('');
  const [worktypes, setWorktypes] = React.useState();
  const { t } = useTranslation();

  const history = useNavigate();
  const params = useParams<params>();
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
    setWorktype(data);
  };

  function TaskApp(history: any) {
    console.log('--tabmenu--TaskApp--history--', history);
    return <MicroFrontend history={history} host={taskHost} name="TaskApp" />;
  }

  function CostApp(history: any) {
    return <MicroFrontend history={history} host={costHost} name="CostApp" />;
  }

  function MeetingApp(history: any) {
    return <MicroFrontend history={history} host={meetingHost} name="MeetingApp" />;
  }

  function DocumentApp(history: any) {
    console.log('--tab-menu--DocumentApp--history--', history);
    return <MicroFrontend history={history} host={documentHost} name="DocumentApp" />;
  }

  function Home() {
    const [input, setInput] = React.useState('');

    const [isTask, setIsTask] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(null);
    const data = 'parrent';

    const location = useLocation();
    const url = location.pathname;

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
      console.log('--handleOpenProject--item--', item);
    };
    const onTabChange = (e, { activeIndex }) => {
      setActiveIndex(activeIndex);
    };
    const panes = [
      {
        menuItem: {
          key: 'Overview',
          icon: 'file alternate outline',
          content: t('project_tab_menu.overview.title'),
          to: `${projectId}/overview`,
          as: NavLink,
          exact: true,
        },
      },
      {
        menuItem: {
          key: 'Task',
          icon: 'shield alternate',
          content: t('project_tab_menu.task.title'),
          to: `${url}/task`,
          as: NavLink,
          exact: true,
        },
        // render: () => <Route
        //   path={`${url}/task`}
        //   exact
        //  element={
        //     <Tab.Pane onClick={handleOpenProject('task')}>
        //       {/* <TaskApp id={params.projectId}></TaskApp> */}
        //       <TaskApp id={projectId}></TaskApp>
        //     </Tab.Pane>
        //   )}
        // />,
      },
      {
        menuItem: {
          key: 'Planning',
          icon: 'flag outline',
          to: `${url}/planning`,
          as: NavLink,
          exact: true,
          content: t('project_tab_menu.planning.title'),
        },
      },
      {
        menuItem: {
          key: 'Cost',
          icon: 'money bill alternate outline',
          content: t('project_tab_menu.cost.title'),
          to: `${url}/cost`,
          as: NavLink,
          exact: true,
        },
        // render: () => <Route
        //   path={`${url}/cost`}
        //   exact
        //  element={
        //     <Tab.Pane attached={false} onClick={handleOpenProject('cost')}>
        //       <CostApp />
        //     </Tab.Pane>
        //   )}
        // />,
      },
      {
        menuItem: {
          key: 'Tender',
          icon: 'gavel',
          content: t('project_tab_menu.tender.title'),
          to: `${url}/tender`,
          as: NavLink,
          exact: true,
        },
        // render: () => <Route
        //   path={`${url}/tender`}
        //   exact
        //  element={
        //     <Tab.Pane attached={false} onClick={handleOpenProject('tender')}>Tender</Tab.Pane>
        //   )}
        // />,
      },
      {
        menuItem: {
          key: 'Meetings',
          icon: 'calendar outline',
          content: t('project_tab_menu.meeting.title'),
          to: `${url}/meetings`,
          as: NavLink,
          exact: true,
        },
        // render: () => <Route
        //   path={`${url}/meetings`}
        //   exact
        //  element={

        //     <Tab.Pane attached={false} onClick={handleOpenProject('meetings')}>
        //       <MeetingApp />
        //     </Tab.Pane>
        //   )}
        // />,
      },
      {
        menuItem: {
          key: ' ',
          icon: 'folder open outline',
          content: t('project_tab_menu.files.title'),
          to: `${url}/files`,
          as: NavLink,
          exact: true,
        },
        // render: () =>
        //   <Route
        //     path={`${url}/files`}
        //     exact
        //    element={
        //       <Tab.Pane attached={false} onClick={handleOpenProject('files')}>
        //         <DocumentApp />
        //       </Tab.Pane>
        //     )}
        //   />
        // ,
      },
      {
        menuItem: {
          key: 'Questions',
          icon: 'question circle outline',
          content: t('project_tab_menu.questions'),
          to: `${url}/questions`,
          as: NavLink,
          exact: true,
        },
        // render: () =>
        //   <Route
        //     path={`${url}/questions`}
        //     exact
        //    element={
        //       <Tab.Pane attached={false} onClick={handleOpenProject('questions')}>Questions</Tab.Pane>
        //     )}
        //   />
        // ,
      },
      {
        menuItem: {
          key: 'People',
          icon: 'user outline',
          content: t('project_list.add_new_project.people'),
          to: `${url}/people`,
          as: NavLink,
          exact: true,
        },
        // render: () =>
        //   <Route
        //     path={`${url}/people`}
        //     exact
        //    element={

        //       <Tab.Pane attached={false} onClick={handleOpenProject('people')}>People</Tab.Pane>)}
        //   />
        // ,
      },
      {
        menuItem: {
          key: 'Settings',
          icon: 'setting',
          content: t('project_tab_menu.setting'),
          to: `${url}/settings`,
          as: NavLink,
          exact: true,
        },
        // render: () => <Route
        //   path={`${url}/settings`}
        //   exact
        //  element={
        //     <Tab.Pane attached={false} onClick={handleOpenProject('settings')}>Settings</Tab.Pane>)}
        // />
        // ,
      },
      {
        menuItem: {
          key: 'Messages',
          icon: 'envelope open outline',
          content: t('project_tab_menu.messages.title'),
          to: `${url}/messages`,
          as: NavLink,
          exact: true,
        },
        // render: () => <Route
        //   path={`${url}/messages`}
        //   exact
        //  element={
        //     <Tab.Pane attached={false} onClick={handleOpenProject('messages')}>Messages</Tab.Pane>)}
        // />
        // ,
      },
    ];

    return (
      <div className="app-content-body-dash navbar-collapse">
        <div className="main-page-heading">
          <span className="">{worktypeName ? worktypeName : 'WorktypeName'}</span>
          <span className="preliminary-font">{t('project_tab_menu.preiminary_studies')}</span>
        </div>
        <Tab
          renderActiveOnly={true}
          activeIndex={activeIndex}
          onTabChange={onTabChange}
          className="ui-tabs"
          menu={{ secondary: true, pointing: true }}
          panes={panes}
        />
        <Routes>
          {/* issue is here */}
          {/* <Route path={`${url}/planning`} element={<PlanningIndex worktypes={worktypes}></PlanningIndex>} /> */}
          <Route
            path={`${url}/overview`}
            element={
              <Tab.Pane attached={false} onClick={handleOpenProject('overview')}>
                <div className="ui-tabs">
                  <div className="text-center ">
                    <Image src="https://react.semantic-ui.com/images/wireframe/image.png" size="small" wrapped />
                  </div>
                  <div className="text-center margin-top">
                    <span className="found">{t('common.data_not_found')}</span>
                    <p className="project-sub" style={{ color: '#9A9EA1' }}>
                      {t('project_tab_menu.overview.desc_line1')} <br /> {t('project_tab_menu.overview.desc_line2')}
                    </p>
                  </div>
                </div>
              </Tab.Pane>
            }
          />
          {/* start Added for  */}
          <Route
            path={`${url}/task`}
            element={
              <Tab.Pane onClick={handleOpenProject('task')}>
                <TaskApp id={projectId}></TaskApp>
              </Tab.Pane>
            }
          />
          <Route
            path={`${url}/cost`}
            element={
              <Tab.Pane onClick={handleOpenProject('costs')}>
                <CostApp id={projectId}></CostApp>
              </Tab.Pane>
            }
          />
          <Route
            path={`${url}/meetings`}
            element={
              <Tab.Pane onClick={handleOpenProject('meetings')}>
                <MeetingApp id={projectId}></MeetingApp>
              </Tab.Pane>
            }
          />
          <Route
            path={`${url}/files`}
            element={
              <Tab.Pane onClick={handleOpenProject('files')}>
                <DocumentApp id={projectId}></DocumentApp>
              </Tab.Pane>
            }
          />
        </Routes>
        {/* end Added for  */}
      </div>
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
          <AccordionExampleMenu
            t={t}
            changeWorktypeName={changeWorktypeName}
            workTypeData={data}
          ></AccordionExampleMenu>
          <Home></Home>
        </div>
      ) : null}
    </div>
  );
}

export default TabMenu;
