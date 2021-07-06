import React, { useState, useEffect } from "react";
import MeetingTab from "libs/shared-components/src/lib/components/tabs/meetingtabs"
import { LoaderPage } from '@cudo/shared-components';
import { useHistory } from 'react-router';

import { GET_SESSIONS } from '../../graphql/graphql'
import { useSessionQuery } from '../../services/useRequest';


export function SessionListing(){
  const [sessionList, setSessionList] = useState([]);
  const history = useHistory();
  const pathNames = history.location.pathname.split("/");
  const projectId = pathNames[3].toString();
  console.log('session--projectId', projectId);
  

const { loading, error, data } = useSessionQuery(GET_SESSIONS, {
    variables: { projectId },
  });

  if (loading)
    return (
      <h1>
        {' '}
        <LoaderPage />
      </h1>
    );

    if (error){
       return (<div>No Data Found</div>)
      }
   
    // const sessionEmptyList = []

    return (
        <div>
            <MeetingTab sessionListData={data} ></MeetingTab>            
        </div>
    )    
}

export default SessionListing