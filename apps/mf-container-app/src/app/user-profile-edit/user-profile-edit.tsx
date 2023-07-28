import { UserProfile } from '@cudo/shared-components/src';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialiseRequest } from '../services/kratos';

import './user-profile-edit.module.scss';

/* eslint-disable-next-line */
export interface UserProfileEditProps {}

export function UserProfileEdit(props: UserProfileEditProps) {
  const navigate = useNavigate();

  const [requestResponse, setRequestResponse] = useState<any>();
  useEffect(() => {
    const request = initialiseRequest(
      { type: 'settings' },
      { filterid: 'flow' }
    ) as Promise<any>;
    request
      .then((request) => setRequestResponse(request))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { state } = requestResponse || {};
  const formPassword = requestResponse?.methods?.password?.config;
  const formProfile = requestResponse?.methods?.profile?.config;
  const messages = requestResponse?.messages;

  const cancel = (childData) => {
    navigate(`/home/profile`);
  };
  const update = (childData) => {
    navigate(`/home/profile`);
  };
  return (
    <div>
      {state === 'success' && <p>Your changes have been saved!</p>}
      {/* {messages && <KratosMessages messages={messages} />} */}
      {formProfile ? (
        <UserProfile
          action={formProfile?.action}
          fields={formProfile?.fields}
          messages={formProfile?.messages}
          update={update}
          cancel={cancel}
        ></UserProfile>
      ) : null}
    </div>
  );
}

export default UserProfileEdit;
