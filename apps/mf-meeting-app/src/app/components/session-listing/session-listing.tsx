import React, { useState, useEffect } from "react";
import MeetingTab from "libs/shared-components/src/lib/components/tabs/meetingtabs"
import { LoaderPage } from '@cudo/shared-components';
import { useHistory } from 'react-router';
import ModalSession from 'libs/shared-components/src/lib/components/modal/addsession';
import axios from 'axios';
import { ADD_SESSION, GET_SESSIONS } from '../../graphql/graphql'
import { useSessionQuery } from '../../services/useRequest';
import AddSession from '../../add-session/add-session';
// import img8 from '../../../../../libs/shared-components/src/assets/images/default_area.png';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { ISessions } from '../../interfaces/meeting';

import {
  Image, Button
} from 'semantic-ui-react';
import { useMutation } from "@apollo/client";

export function SessionListing() {
  const [sessionList, setSessionList] = useState([]);
  const [sessionAdd, setSessionAdd] = useState(false)
  const [workTypes, setWorkTypes] = React.useState([]);
  const [openAddSession, setOpenAddSession] = React.useState(false)
  const history = useHistory();
  const pathNames = history.location.pathname.split("/");
  const projectId = pathNames[3].toString();
  console.log('session--projectId', projectId);


  const res = history.location.pathname.split("/");
  const referenceID = res[3].toString();

  React.useEffect(() => {
    if (referenceID) {
      getWorkType(referenceID)
    }
  }, [referenceID])

  const { loading, error, data } = useSessionQuery(GET_SESSIONS, {
    variables: { projectId },
  });

  const [addSession] = useMutation(ADD_SESSION,
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
  const cancel = () => {
    setOpenAddSession(false)
  }
  const addNew = () => {
    console.log('add new')
    setOpenAddSession(true);
  }
  if (loading)
    return (
      <h1>
        {' '}
        <LoaderPage />
      </h1>
    );

  if (error) {
    return (<div className="no-data-found-info">
      {/* <img src={img8} className="image_center"></img> */}
      <img src="/assets/images/default_area.png" />

      <h3>No Data Found</h3>
      <p>Hey User, you don't have any active session on this project. Click the button below to create a session list.</p>
      <Button size="small" className="primary" onClick={addNew}>
        + Add New Session
      </Button>
      <AddSession cancel={cancel} openAddSession={openAddSession} />
    </div>)
  }

  //  const emptyData = {paginatedSession:{results:[]}}

  return (
    <div>
      {/* {openAddSession ? <ModalSession cancel={cancel} openAddSession={openAddSession} workTypes={workTypes} createSession={createSession} /> : null} */}
      {sessionAdd === false && data?.paginatedSession?.results?.length > 0 ?

        <MeetingTab sessionListData={data} addSession={setSessionAdd} ></MeetingTab>
        :
        <div className="no-data-found-info">
          {/* <img src={img8} className="image_center"></img> */}
          <img src="/assets/images/default_area.png" />

          <h3>No Data Found</h3>
          <p>Hey User, you don't have any active session on this project. Click the button below to create a session list.</p>
          <Button size="small" className="primary" onClick={addNew}>
            + Add New Session
          </Button>
          <AddSession cancel={cancel} openAddSession={openAddSession} />
        </div>
      }
    </div>
  )
}

export default SessionListing