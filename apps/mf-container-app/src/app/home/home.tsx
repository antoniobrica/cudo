import { Menubar } from '@cudo/shared-components';
import React, { useEffect, useState } from 'react';
import { Switch, Route, Link, useHistory, useRouteMatch, Redirect, useLocation } from "react-router-dom";
import { environment } from '../../environments/environment';
import { Settings } from '../containers/Settings';
import { MfProjectAppMount } from '../mf-project-app-mount/mf-project-app-mount';
import { isAuthenticated, logout, ToEmail } from '../services/auth';
import { UserProfileEdit } from '../user-profile-edit/user-profile-edit';
import { UserProfile } from '../user-profile/user-profile';
import { UserRegistration } from '../user-registration/user-registration';

import './home.module.scss';
const {
  REACT_APP_PROJECT_HOST: projectHost,
} = environment;
/* eslint-disable-next-line */
export interface HomeProps { }

export function Home(props: HomeProps) {
  const [input, setInput] = useState("");
  const [state, setState] = useState('');
  const [menuExpand, setMenuExpand] = React.useState(false)

  const data = "parrent"
  const history = useHistory()
  const location = useLocation();
  // const routeMatch = useRouteMatch();
  const { url, path } = useRouteMatch();
  console.log('path==>', path);

  useEffect(() => {
    if (!isAuthenticated()) ToEmail()
  }, [])
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
    history.push(`/settings`);
  }
  const cancel = (childData) => {
    history.push('/home');
  }
  const update = (childData) => {
    history.push('/home');
  }

  const onClickMenuExpand = () => {
    setMenuExpand(!menuExpand)
  }

  return (
    <div className={menuExpand?"expand-main-menu":""}>
      <div>
        <Menubar data={data} parentCallback={callbackFunction} mainMenuExpand={onClickMenuExpand}></Menubar>
      </div>
      <div>
        <Switch>
          <Route exact path={`${path}/profile`} render={() => <UserProfile />} />
          <Route exact path={`${path}/settings`} render={() => <UserProfileEdit />} />
          <Route exact path={`${path}/project`} render={() => <MfProjectAppMount host={projectHost} />} />
        </Switch>
      </div>
    </div>

  );
}

export default Home;
