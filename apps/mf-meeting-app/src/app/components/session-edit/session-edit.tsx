import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { useSessionDetailQuery } from '../../services/useRequest';
import { UPDATE_SESSION, GET_SESSIONS, GET_SESSION_DETAIL } from '../../graphql/graphql'
import { ISessions } from '../../interfaces/session';
import { ModalEditSession } from '@cudo/shared-components'
import { MS_SERVICE_URL } from '@cudo/mf-core';

/* eslint-disable-next-line */
export interface EditSessionProps {
  projectId?
  sessionId?
  openEditSession?
  cancel?
}

export function EditSession(props: EditSessionProps) {
  const [workTypes, setWorkTypes] = React.useState([]);
  const history = useHistory();
  const res = history.location.pathname.split("/");
  const referenceID = res[3].toString();

  useEffect(() => {
    if (referenceID) {
      getWorkType(referenceID)
    }
  }, [referenceID])

  const { loading: sessionDetailLoading, error: sessionDetailError, data: sessionDetailData } = useSessionDetailQuery(GET_SESSION_DETAIL, {
    variables: { sessionID: props?.sessionId },
  });

  const [editSession, { data }] = useMutation(UPDATE_SESSION,
    {
      refetchQueries: [
        { query: GET_SESSIONS, variables: { projectId: props.projectId } }
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

  const updateSession = (data) => {
    editSession({
      variables: {
        sessionID: data.sessionID,
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
        const cacheData = cache.readQuery({ query: GET_SESSIONS, variables: { projectId: props.projectId } }) as ISessions;

        cache.writeQuery({
          query: GET_SESSIONS,
          variables: {projectId: props?.projectId},
          data: {
            getSessions: [...cacheData.paginatedSession.results, data]
          }
        });
      }
    });
  }


  return (
    <div>

      <ModalEditSession
        workTypes={workTypes}
        sessionDetail={sessionDetailData}
        openEditSession={props.openEditSession}
        cancel={props.cancel}
        editSession={updateSession}
      />
    </div>
  );
}

export default EditSession;
