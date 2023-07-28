import { UserProfileView } from '@cudo/shared-components/src';
import React from 'react';
import { Link, Route, useNavigate } from 'react-router-dom';
import { UserRegistration } from '../user-registration/user-registration';

import './user-profile.module.scss';

/* eslint-disable-next-line */
export interface UserProfileProps {}

export function UserProfile(props: UserProfileProps) {
  const navigate = useNavigate();
  const edit = (childData) => {
    navigate(`/home/settings`);
  };
  return <UserProfileView edit={edit} />;
}

export default UserProfile;
