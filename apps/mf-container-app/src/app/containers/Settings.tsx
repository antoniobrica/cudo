import React, { useEffect, useState } from 'react';
import { initialiseRequest } from '../services/kratos';
import { Header } from '../components/Header';
import { KratosMessages } from '../components/KratosMessages';
import { KratosForm } from '../components/KratosForm';
import UserRegistration from '../user-registration/user-registration';
import { useNavigate } from 'react-router-dom';

export const Settings = () => {
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

  const navigate = useNavigate();

  const cancel = (childData) => {
    navigate(`/home/profile`);
  };
  const update = (childData) => {
    navigate(`/home/profile`);
  };
  return (
    <div className="content">
      <Header />
      <div className="container">
        <h2>Settings</h2>
        {state === 'success' && <p>Your changes have been saved!</p>}
        {messages && <KratosMessages messages={messages} />}
        <div id="user-password">
          <h3>Profile</h3>
          {formProfile && (
            <KratosForm
              submitLabel="Save"
              action={formProfile.action}
              fields={formProfile.fields}
              messages={formProfile.messages}
            />
          )}
        </div>
        {/* <div id="user-password">
            <h3>Password</h3>
            {formPassword &&
              <KratosForm
                submitLabel="Save"
                action={formPassword.action}
                fields={formPassword.fields}
                messages={formPassword.messages} />}
          </div> */}
      </div>
    </div>
    // <div>
    //   <UserRegistration update={update} cancel={cancel}></UserRegistration>
    // </div>
  );
};
