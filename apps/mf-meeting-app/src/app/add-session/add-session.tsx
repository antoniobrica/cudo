import React from 'react';
import ModalSession from 'libs/shared-components/src/lib/components/modal/addsession';
import './add-session.module.scss';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { ADD_SESSION, GET_SESSIONS } from '../graphql/graphql'
import { ISessions } from '../interfaces/meeting';
import { ProjectWorktypes } from '@cudo/mf-project-lib';

/* eslint-disable-next-line */
export interface AddSessionProps { }

export function AddSession(props: AddSessionProps) {
  const [workTypes, setWorkTypes] = React.useState([]);
  const history = useHistory();
  const res = history.location.pathname.split("/");
  const referenceID = res[3].toString();
  console.log('referenceID', referenceID);
  React.useEffect(() => {
    if (referenceID) {
      getWorkType(referenceID)
    }
  }, [referenceID])

  const [addSession, { data }] = useMutation(ADD_SESSION,
    {
      refetchQueries: [
        { query: GET_SESSIONS }
      ]
    }
  )

  const query = `query Game($projectId: String!) {
    projectById( projectId: $projectId)
    {
      projectId
      projectName
      projectNum
      client
      buildingType
      printingCom
      projectWorkTypes{
        workTypeName
        projectWorkTypeID
         workTypeName
        estimatedCost
        }
      description
    }
 }`;

  const getWorkType = (referenceID) => {
    console.log('sasstoken');
    return axios.post(
      'http://192.168.1.5:5005/graphql',
      {
        query,
        variables: {
          projectId: referenceID
        }
      }
    ).then(res => {
      const wt = res.data.data.projectById[0].projectWorkTypes;
      setWorkTypes(wt);
    })
      .catch(err => console.log(err))
  }

  const createSession = (data) => {
    console.log('createSession', data)
    addSession({
      variables: {
        sessionTitle: data.sessionTitle,
        worktypeID: data.worktypeID,
        worktypeTitle: data.worktypeTitle,
        meetingCategoryID: data.meetingCategoryID,
        meetingCategoryTitle: data.meetingCategoryTitle,
        protocolID: data.protocolID,
        protocolTitle: data.protocolTitle,
        invitationID: data.invitationID,
        invitationTitle: data.invitationTitle,
        members: data.members,
        admins: data.admins
      },
      update: (
        cache,
        data
      ) => {
        const cacheData = cache.readQuery({ query: GET_SESSIONS }) as ISessions;
        console.log('data--', data)
        cache.writeQuery({
          query: GET_SESSIONS,
          data: {
            getSessions: [...cacheData.sessions, data]
          }
        });
        console.log('data==', data);
      }
    });

  }
  return (
    <div>
      <ModalSession workTypes={workTypes} createSession={createSession} />
    </div>
  );
}

export default AddSession;
