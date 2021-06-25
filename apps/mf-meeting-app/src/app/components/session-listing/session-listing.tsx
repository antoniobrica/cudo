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
      
    const sessionListData = [
        {
            sessionID: "ssessionID1",
            sessionTitle: "sessionTitle1",
            worktypeID: "WorkType1",
            worktypeTitle: "worktypeTitle1",
            meetingCategoryID: "meetingCategoryID1",
            meetingCategoryTitle: "meetingCategoryTitle1",
            invitationID: "invitationID1",
            invitationTitle: "invitationTitle1",
            protocolID: "protocolID1",
            protocolTitle: "protocolTitle1",
            updatedAt: "2021-06-23 08:45:22",
            createdAt: "2021-06-23 08:50:21",
            updatedBy: "updatedBy1",
            createdBy: "createdBy1",
            admins: [{adminID: "adminID1", adminName: "adminName1", image: "image1"}],
            members:[
                        {memberID: "adminID1", memberName: "adminName1", image: "image1"},
                        {memberID: "memberID2", memberName: "memberName2", image: "image2"}
                    ]
        },
        {
            sessionID: "ssessionID2",
            sessionTitle: "sessionTitle2",
            worktypeID: "WorkType1",
            worktypeTitle: "worktypeTitle1",
            meetingCategoryID: "meetingCategoryID1",
            meetingCategoryTitle: "meetingCategoryTitle1",
            invitationID: "invitationID2",
            invitationTitle: "invitationTitle2",
            protocolID: "protocolID2",
            protocolTitle: "protocolTitle2",
            updatedAt: "2021-06-23 09:15:25",
            createdAt: "2021-06-23 09:05:23",
            updatedBy: "updatedBy1",
            createdBy: "createdBy1",
            admins: [{adminID: "adminID1", adminName: "adminName1", image: "image1"}],
            members:[
                        {memberID: "adminID1", memberName: "adminName1", image: "image1"},
                        {memberID: "memberID2", memberName: "memberName2", image: "image2"}
                    ]
        },
        {
            sessionID: "ssessionID3",
            sessionTitle: "sessionTitle3",
            worktypeID: "WorkType1",
            worktypeTitle: "worktypeTitle1",
            meetingCategoryID: "meetingCategoryID2",
            meetingCategoryTitle: "meetingCategoryTitle2",
            invitationID: "invitationID3",
            invitationTitle: "invitationTitle3",
            protocolID: "protocolID3",
            protocolTitle: "protocolTitle3",
            updatedAt: "2021-06-23 09:25:15",
            createdAt: "2021-06-23 09:20:12",
            updatedBy: "updatedBy1",
            createdBy: "createdBy1",
            admins: [{adminID: "adminID1", adminName: "adminName1", image: "image1"}],
            members:[
                        {memberID: "adminID1", memberName: "adminName1", image: "image1"},
                        {memberID: "memberID2", memberName: "memberName2", image: "image2"}
                    ]
        },
        {
            sessionID: "ssessionID4",
            sessionTitle: "sessionTitle4",
            worktypeID: "WorkType1",
            worktypeTitle: "worktypeTitle1",
            meetingCategoryID: "meetingCategoryID2",
            meetingCategoryTitle: "meetingCategoryTitle2",
            invitationID: "invitationID4",
            invitationTitle: "invitationTitle4",
            protocolID: "protocolID4",
            protocolTitle: "protocolTitle4",
            updatedAt: "2021-06-23 11:25:15",
            createdAt: "2021-06-23 11:20:12",
            updatedBy: "updatedBy1",
            createdBy: "createdBy1",
            admins: [{adminID: "adminID1", adminName: "adminName1", image: "image1"}],
            members:[
                        {memberID: "memberID1", memberName: "memberName1", image: "image11"},
                        {memberID: "memberID2", memberName: "memberName2", image: "image22"}
                    ]
        },
        {
            sessionID: "ssessionID5",
            sessionTitle: "sessionTitle5",
            worktypeID: "WorkType1",
            worktypeTitle: "worktypeTitle1",
            meetingCategoryID: "meetingCategoryID3",
            meetingCategoryTitle: "meetingCategoryTitle3",
            invitationID: "invitationID4",
            invitationTitle: "invitationTitle4",
            protocolID: "protocolID4",
            protocolTitle: "protocolTitle4",
            updatedAt: "2021-06-23 11:25:15",
            createdAt: "2021-06-23 11:20:12",
            updatedBy: "updatedBy1",
            createdBy: "createdBy1",
            admins: [{adminID: "adminID1", adminName: "adminName1", image: "image1"}],
            members:[
                        {memberID: "memberID1", memberName: "memberName1", image: "image11"},
                        {memberID: "memberID2", memberName: "memberName2", image: "image22"}
                    ]
        },
        {
            sessionID: "ssessionID16",
            sessionTitle: "sessionTitle16",
            worktypeID: "WorkType1",
            worktypeTitle: "worktypeTitle1",
            meetingCategoryID: "meetingCategoryID4",
            meetingCategoryTitle: "meetingCategoryTitle4",
            invitationID: "invitationID4",
            invitationTitle: "invitationTitle4",
            protocolID: "protocolID4",
            protocolTitle: "protocolTitle4",
            updatedAt: "2021-06-23 11:25:15",
            createdAt: "2021-06-23 11:20:12",
            updatedBy: "updatedBy1",
            createdBy: "createdBy1",
            admins: [{adminID: "adminID1", adminName: "adminName1", image: "image1"}],
            members:[
                        {memberID: "memberID1", memberName: "memberName1", image: "image11"},
                        {memberID: "memberID2", memberName: "memberName2", image: "image22"}
                    ]
        },
        {
            sessionID: "ssessionID14",
            sessionTitle: "sessionTitle14",
            worktypeID: "WorkType1",
            worktypeTitle: "worktypeTitle1",
            meetingCategoryID: "meetingCategoryID22",
            meetingCategoryTitle: "meetingCategoryTitle22",
            invitationID: "invitationID4",
            invitationTitle: "invitationTitle4",
            protocolID: "protocolID4",
            protocolTitle: "protocolTitle4",
            updatedAt: "2021-06-23 11:25:15",
            createdAt: "2021-06-23 11:20:12",
            updatedBy: "updatedBy1",
            createdBy: "createdBy1",
            admins: [{adminID: "adminID1", adminName: "adminName1", image: "image1"}],
            members:[
                        {memberID: "memberID1", memberName: "memberName1", image: "image11"},
                        {memberID: "memberID2", memberName: "memberName2", image: "image22"}
                    ]
        },
        {
            sessionID: "ssessionID24",
            sessionTitle: "sessionTitle24",
            worktypeID: "WorkType1",
            worktypeTitle: "worktypeTitle1",
            meetingCategoryID: "meetingCategoryID22",
            meetingCategoryTitle: "meetingCategoryTitle22",
            invitationID: "invitationID4",
            invitationTitle: "invitationTitle4",
            protocolID: "protocolID4",
            protocolTitle: "protocolTitle4",
            updatedAt: "2021-06-23 11:25:15",
            createdAt: "2021-06-23 11:20:12",
            updatedBy: "updatedBy1",
            createdBy: "createdBy1",
            admins: [{adminID: "adminID1", adminName: "adminName1", image: "image1"}],
            members:[
                        {memberID: "memberID1", memberName: "memberName1", image: "image11"},
                        {memberID: "memberID2", memberName: "memberName2", image: "image22"}
                    ]
        },
        {
            sessionID: "ssessionID34",
            sessionTitle: "sessionTitle34",
            worktypeID: "WorkType1",
            worktypeTitle: "worktypeTitle1",
            meetingCategoryID: "meetingCategoryID22",
            meetingCategoryTitle: "meetingCategoryTitle22",
            invitationID: "invitationID4",
            invitationTitle: "invitationTitle4",
            protocolID: "protocolID4",
            protocolTitle: "protocolTitle4",
            updatedAt: "2021-06-23 11:25:15",
            createdAt: "2021-06-23 11:20:12",
            updatedBy: "updatedBy1",
            createdBy: "createdBy1",
            admins: [{adminID: "adminID1", adminName: "adminName1", image: "image1"}],
            members:[
                        {memberID: "memberID1", memberName: "memberName1", image: "image11"},
                        {memberID: "memberID2", memberName: "memberName2", image: "image22"}
                    ]
        },
        {
            sessionID: "ssessionID6",
            sessionTitle: "sessionTitle6",
            worktypeID: "WorkType1",
            worktypeTitle: "worktypeTitle1",
            meetingCategoryID: "meetingCategoryID6",
            meetingCategoryTitle: "meetingCategoryTitle6",
            invitationID: "invitationID4",
            invitationTitle: "invitationTitle4",
            protocolID: "protocolID4",
            protocolTitle: "protocolTitle4",
            updatedAt: "2021-06-23 11:25:15",
            createdAt: "2021-06-23 11:20:12",
            updatedBy: "updatedBy1",
            createdBy: "createdBy1",
            admins: [{adminID: "adminID1", adminName: "adminName1", image: "image1"}],
            members:[
                        {memberID: "memberID1", memberName: "memberName1", image: "image11"},
                        {memberID: "memberID2", memberName: "memberName2", image: "image22"}
                    ]
        },
        {
            sessionID: "ssessionID8",
            sessionTitle: "sessionTitle8",
            worktypeID: "WorkType1",
            worktypeTitle: "worktypeTitle1",
            meetingCategoryID: "meetingCategoryID6",
            meetingCategoryTitle: "meetingCategoryTitle6",
            invitationID: "invitationID4",
            invitationTitle: "invitationTitle4",
            protocolID: "protocolID4",
            protocolTitle: "protocolTitle4",
            updatedAt: "2021-06-23 11:25:15",
            createdAt: "2021-06-23 11:20:12",
            updatedBy: "updatedBy1",
            createdBy: "createdBy1",
            admins: [{adminID: "adminID1", adminName: "adminName1", image: "image1"}],
            members:[
                        {memberID: "memberID1", memberName: "memberName1", image: "image11"},
                        {memberID: "memberID2", memberName: "memberName2", image: "image22"}
                    ]
        },
        {
            sessionID: "ssessionID9",
            sessionTitle: "sessionTitle9",
            worktypeID: "WorkType1",
            worktypeTitle: "worktypeTitle1",
            meetingCategoryID: "meetingCategoryID6",
            meetingCategoryTitle: "meetingCategoryTitle6",
            invitationID: "invitationID4",
            invitationTitle: "invitationTitle4",
            protocolID: "protocolID4",
            protocolTitle: "protocolTitle4",
            updatedAt: "2021-06-23 11:25:15",
            createdAt: "2021-06-23 11:20:12",
            updatedBy: "updatedBy1",
            createdBy: "createdBy1",
            admins: [{adminID: "adminID1", adminName: "adminName1", image: "image1"}],
            members:[
                        {memberID: "memberID1", memberName: "memberName1", image: "image11"},
                        {memberID: "memberID2", memberName: "memberName2", image: "image22"}
                    ]
        }
    ]

    // const sessionEmptyList = []

    return (
        <div>
            <MeetingTab sessionListData={data} ></MeetingTab>            
        </div>
    )    
}

export default SessionListing