import { LazyLoading } from '@cudo/shared-components/src';
import React, { useEffect } from 'react';
import { useSession } from '../services/session';
import { useLazyQuery, useMutation } from '@apollo/client';
import { IUser, loginUser } from '../store/user';
import { QUERY_USER_BY_EMAIL } from '../graphql/queries';
import { MUTATION_CREATE_USER } from '../graphql/mutations';
import { useAppDispatch } from '../hooks';
import { useNavigate } from 'react-router-dom';

interface IGetUserData {
  userByEmail: IUser[];
}

interface IGetRegistrationData {
  createUser: IUser;
}

function HomeLogin() {
  const { session, logoutUrl } = useSession();

  const [fetchCurrentUser, { data: userInfo }] = useLazyQuery<IGetUserData>(QUERY_USER_BY_EMAIL, {});

  const [registerSessionUser, { data: registeredUser }] = useMutation<IGetRegistrationData>(MUTATION_CREATE_USER);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session) {
      fetchCurrentUser({ variables: { email: session.identity.traits.email } });
    }
  }, [session]);

  useEffect(() => {
    if (session && userInfo?.userByEmail[0] && userInfo?.userByEmail[0].userID) {
      console.log('redirect');
      console.log(userInfo);
      // navigate('/home');
    } else if (session && userInfo && userInfo?.userByEmail && userInfo?.userByEmail.length === 0) {
      console.log('no user do register');

      registerSessionUser({
        variables: {
          userName: session.identity.traits.username,
          userID: session.identity.id,
          imageUrl: '',
          email: session.identity.traits.email,
          referenceID: 'CUDO',
          referenceType: 'COMPANY',
        },
      });
    }
  }, [userInfo, session]);

  useEffect(() => {
    if (
      session &&
      ((registeredUser?.createUser && registeredUser.createUser.userID) ||
        (userInfo?.userByEmail[0] && userInfo?.userByEmail[0].userID))
    ) {
      dispatch(
        loginUser({
          email: session.identity.traits.email,
          userID: session.identity.id,
          userName: session.identity.traits.username,
          imageUrl: '',
          logoutUrl: logoutUrl,
        })
      );
      navigate('/home');
    }
  }, [registeredUser, userInfo, session]);

  return (
    <div>
      {session && (
        <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 888800 }}>
          <a style={{ zIndex: 10000, color: '#000000' }} href={logoutUrl}>
            <h1 style={{ zIndex: 10000, color: '#000000' }}>Logout</h1>
          </a>
        </div>
      )}
      <LazyLoading />
    </div>
  );
}

export default HomeLogin;
