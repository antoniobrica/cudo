import React, { useState, useEffect } from "react";
import MeetingTab from "libs/shared-components/src/lib/components/tabs/meetingtabs"
import { LoaderPage } from '@cudo/shared-components';
import { useHistory } from 'react-router';
import axios from 'axios';
import { GET_SESSIONS } from '../../graphql/graphql'
import { useSessionQuery } from '../../services/useRequest';
import AddSession from '../../add-session/add-session';
import { MS_SERVICE_URL } from '@cudo/mf-core';

import {
  Image, Button
} from 'semantic-ui-react';


export function SessionListing() {

  const [workTypes, setWorkTypes] = React.useState([]);
  const [openAddSession, setOpenAddSession] = React.useState(false)

  const history = useHistory();
  const pathNames = history.location.pathname.split("/");
  const projectId = pathNames[3].toString();
  // console.log('session--projectId', projectId);


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
    // console.log('sasstoken');
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

  const cancel = () => {
    console.log('---list--cancel function')
    setOpenAddSession(false)
  }
  const addNew = () => {
    console.log('---list--add new function')
    setOpenAddSession(true);
  }

  const onClickOpenAddSession = () => {
    console.log('---list--onClickOpenAddSession function')
    setOpenAddSession(true)
  }


  if (loading)
    return (
      <h1>
        {' '}
        <LoaderPage />
      </h1>
    );

  if (error) {
    return (
      <div className="no-data-found-info">
        {/* <img src={img8} className="image_center"></img> */}
        <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/default_area.png`} />

        <h3>No Data Found</h3>
        <p>Hey User, you don't have any active session on this project. Click the button below to create a session list.</p>
        <Button size="small" className="primary" onClick={addNew}>
          + Add New Session
        </Button>
        <AddSession cancel={cancel} openAddSession={openAddSession} />
      </div>
    )
  }

  //  const emptyData = {paginatedSession:{results:[]}}

  return (
    <div>
      <AddSession cancel={cancel} openAddSession={openAddSession} />
      {data?.paginatedSession?.results?.length > 0 ?

        <MeetingTab sessionListData={data} addSession={onClickOpenAddSession} ></MeetingTab>
        :
        <div className="no-data-found-info">
          {/* <img src={img8} className="image_center"></img> */}
          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/default_area.png`} />

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