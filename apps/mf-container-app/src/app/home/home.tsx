import { Menubar } from '@cudo/shared-components/src';
import React, { useEffect, useState } from 'react';
import { Route, Link, useLocation, useNavigate, Routes, useMatch } from 'react-router-dom';
import { environment } from '../../environments/environment';
import { Settings } from '../containers/Settings';
import { MfProjectAppMount } from '../mf-project-app-mount/mf-project-app-mount';
import { isAuthenticated, logout, ToEmail } from '../services/auth';
import { UserProfileEdit } from '../user-profile-edit/user-profile-edit';
import { UserProfile } from '../user-profile/user-profile';
import { UserRegistration } from '../user-registration/user-registration';

import './home.module.scss';
const { REACT_APP_PROJECT_HOST: projectHost } = environment;
/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  const [input, setInput] = useState('');
  const [state, setState] = useState('');
  const [pathByHistory, setPathByHistory] = useState('');
  const [menuExpand, setMenuExpand] = useState(false);

  const data = 'parrent';
  const navigate = useNavigate();
  const location = useLocation();

  const match = useMatch('*');
  const { pathname } = match;
  // const routeMatch = useRouteMatch();
  // const { url, path } = useRouteMatch();

  useEffect(() => {
    if (!isAuthenticated()) ToEmail();
  }, []);

  const callbackFunction = (childData) => {
    switch (childData) {
      case 'logout':
        logout();
        break;
      case 'project':
        // goToProjectDashboard();
        navigate('/home/project');
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (location?.pathname.includes('/home/project/')) {
      setPathByHistory(location?.pathname);
    }
  }, []);
  const edit = (childData) => {
    navigate(`/settings`);
  };
  const cancel = (childData) => {
    navigate('/home');
  };
  const update = (childData) => {
    navigate('/home');
  };

  const onClickMenuExpand = () => {
    setMenuExpand(!menuExpand);
  };

  return (
    <div className={menuExpand ? 'expand-main-menu' : 'collapsed-main-menu'}>
      <div>
        <Menubar
          data={data}
          parentCallback={callbackFunction}
          mainMenuExpand={onClickMenuExpand}
          history={navigate}
        ></Menubar>
      </div>
      <div>
        <Routes>
          <Route path={`/profile`} element={<UserProfile />} />
          <Route path={`/settings`} element={<UserProfileEdit />} />
          <Route
            path={pathByHistory ? pathByHistory : `${pathname}/project`}
            element={<MfProjectAppMount host={projectHost} history={navigate} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
