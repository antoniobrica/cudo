import React from 'react';
import ModalSession from 'libs/shared-components/src/lib/components/modal/addsession';
import './add-session.module.scss';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { ADD_SESSION, GET_SESSIONS } from '../graphql/graphql'
import { ISessions } from '../interfaces/session';
import { ProjectWorktypes } from '@cudo/mf-project-lib';
import { MS_SERVICE_URL } from '@cudo/mf-core';

/* eslint-disable-next-line */
export interface AddSessionProps {
  openAddSession
  cancel
}

export function AddSession(props: AddSessionProps) {
  const [workTypes, setWorkTypes] = React.useState([]);
  const history = useHistory();
  const res = history.location.pathname.split("/");
  const referenceID = res[3].toString();
  
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
      printingCompany
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
    
    return axios.post(
      MS_SERVICE_URL['ms_project'].url,
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
        
        cache.writeQuery({
          query: GET_SESSIONS,
          data: {
             getSessions: [...cacheData.paginatedSession.results, data]
          }
        });
        
      }
    });

  }
  return (
    <div>
      <ModalSession openAddSession={props.openAddSession} cancel={props.cancel} workTypes={workTypes} createSession={createSession} />
    </div>
  );
}

export default AddSession;
