import React, { lazy, Suspense, useEffect, useState } from 'react';
// import { LazyLoading } from '@cudo/shared-components'
import { BrowserRouter as Router, Route, Link, useLocation, Routes, useParams, useNavigate } from 'react-router-dom';

import { initI18n } from '@cudo/mf-core';
// import { Loading } from '@cudo/ui'
// import { TestComponent } from './test-component/test-component';
// import MicroFrontend from "../MicroFrontend";
// import { environment } from '../environments/environment';

import TabMenu from './components/tab-menu/tab-menu';
import ProjectInfo from './components/project-info/project-info';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import config from './redux/store';

// const TabMenu = lazy(() => import('./components/tab-menu/tab-menu'))
// const ProjectInfo = lazy(() => import('./components/project-info/project-info'))

const defaultLanguage = 'en-GB';
// const supportedLanguages = [defaultLanguage, 'en-GB'];
initI18n('./assets/i18n/{{lng}}.json', defaultLanguage);

// const {
//   EACT_APP_COST_HOST: costHost,
//   REACT_APP_MEETING_HOST: meetingHost,
//   REACT_APP_TASK_HOST: taskHost,
// } = environment;

// function Header() {
//   return (
//     <div className="banner">
//       <h1 className="banner-title"> Welcome project</h1>
//     </div>
//   );
// }

// function MeetingApp(history: any) {
//   return (
//     <MicroFrontend history={history} host={meetingHost} name="MeetingApp" />
//   );
// }

// function CostApp(history: any) {
//   return (
//     <MicroFrontend history={history} host={costHost} name="CostApp" />
//   );
// }

// function TaskApp(history: any) {
//   return (
//     <MicroFrontend history={history} host={taskHost} name="TaskApp" />
//   );
// }

// function Home({ history }) {
//   const [input, setInput] = useState("");

//   return (
//     <div>
//       <Header />
//       <div className="home">
//         <div className="content">
//           <div className="meetingClass">
//             <TaskApp></TaskApp>
//           </div>
//         </div>
//         <div className="content">
//           <div className="costClass">
//             <CostApp></CostApp>
//           </div>
//         </div>
//       </div>
//     </div>

//   );
// }

// function loadApp() {
//   return (
//     <div>
//       <ProjectInfo ></ProjectInfo>
//     </div>
//   );
// }

const { store, persistor } = config();

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/home/project/')) {
      navigate(location.pathname);
    }
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes>
          <Route path="/home/project" element={<ProjectInfo />} />
          <Route path="/home/project/:projectId" element={<TabMenu />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
// modifying for shared component build */
