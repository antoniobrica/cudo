import React, { useEffect, useState } from 'react';

import './user-registration.module.scss';
import { UserProfile, UserProfileView } from '@cudo/shared-components';
import { useHistory } from 'react-router-dom';
import { KratosMessages } from '../components/KratosMessages';
import { initialiseRequest } from '../services/kratos';

/* eslint-disable-next-line */
export interface UserRegistrationProps {
}

export function UserRegistration(props: UserRegistrationProps) {
  const [requestResponse, setRequestResponse] = useState<any>()
  useEffect(() => {
    const request = initialiseRequest({ type: "settings" }, { filterid: "flow" }) as Promise<any>
    request
      .then(request => setRequestResponse(request))
      .catch((error) => { console.log(error) })
  }, [])

  const { state } = requestResponse || {}
  const formPassword = requestResponse?.methods?.password?.config
  const formProfile = requestResponse?.methods?.profile?.config
  const messages = requestResponse?.messages
  const history = useHistory()
  const cancel = (childData) => {
    history.push(`/home/profile`);
  }
  const update = (childData) => {
    history.push(`/home/profile`);
  }
  return (

    <div>
      {state === "success" && <p>Your changes have been saved!</p>}
      {/* {messages && <KratosMessages messages={messages} />} */}
      {formProfile ? <UserProfile action={formProfile?.action}
        fields={formProfile?.fields}
        messages={formProfile?.messages} update={update} cancel={cancel}></UserProfile> : null}
    </div>
  );
}

export default UserRegistration;
