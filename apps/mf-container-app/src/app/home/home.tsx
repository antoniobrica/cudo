import { Menubar } from '@cudo/shared-components/src';
import React, { useEffect, useState } from 'react';
import { Route, Link, useLocation, useNavigate, Routes } from 'react-router-dom';
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
  const data = 'parrent';

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) ToEmail();
  }, []);
  const callbackFunction = (childData) => {
    switch (childData) {
      case 'logout':
        logout();
        break;

      default:
        break;
    }
    // history.push('/project')
  };
  const edit = (childData) => {
    navigate(`/settings`);
  };
  const cancel = (childData) => {
    navigate('/home');
  };
  const update = (childData) => {
    navigate('/home');
  };
  return (
    <div>
      <Menubar data={data} parentCallback={callbackFunction}></Menubar>
      <div>
        <Routes>
          <Route path={`/profile`} element={<UserProfile />} />
          <Route path={`/settings`} element={<UserProfileEdit />} />
          <Route path={`/project`} element={<MfProjectAppMount host={projectHost} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
