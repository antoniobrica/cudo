import React, { useState, useEffect } from "react";
import MeetingTab from "libs/shared-components/src/lib/components/tabs/meetingtabs"
import { LoaderPage } from '@cudo/shared-components';
import { useHistory } from 'react-router';

import { GET_SESSIONS } from '../../graphql/graphql'
import { useSessionQuery } from '../../services/useRequest';

// import img8 from '../../../../../libs/shared-components/src/assets/images/default_area.png';

import {
  Image, Button
} from 'semantic-ui-react';

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
       return (<div className="no-data-found-info">
         {/* <img src={img8} className="image_center"></img> */}
         <image src="/assets/images/default_area.png" />

         <h3>No Data Found</h3>
         <p>Hey User, you don't have any active session on this project. Click the button below to create a session list.</p>
         <Button size="small" className="primary">
            + Add New Session
          </Button>
       </div>)
      }
   
    // const sessionEmptyList = []

    return (
        <div>
            <MeetingTab sessionListData={data} ></MeetingTab>            
        </div>
    )    
}

export default SessionListing