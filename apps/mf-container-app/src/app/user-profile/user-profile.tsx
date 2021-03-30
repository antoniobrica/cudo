import { UserProfileView } from '@cudo/shared-components';
import React from 'react';
import { Link, Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import { UserRegistration } from '../user-registration/user-registration';

import './user-profile.module.scss';

/* eslint-disable-next-line */
export interface UserProfileProps {
}

export function UserProfile(props: UserProfileProps) {
  const history = useHistory()
  const { path, url } = useRouteMatch();
  const edit = (childData) => {
    history.push(`/home/settings`);
  }
  return (
    <UserProfileView edit={edit} />
  );
}

export default UserProfile;
