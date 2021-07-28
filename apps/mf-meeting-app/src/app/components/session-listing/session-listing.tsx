import React, { useState, useEffect } from "react";
import MeetingTab from "libs/shared-components/src/lib/components/tabs/meetingtabs"
import { LazyLoading } from '@cudo/shared-components';
import { useHistory } from 'react-router';
import axios from 'axios';
import { GET_SESSIONS } from '../../graphql/graphql'
import { useSessionQuery } from '../../services/useRequest';
import AddSession from '../session-add/session-add';
import EditSession from '../session-edit/session-edit';
import { MS_SERVICE_URL } from '@cudo/mf-core';

import InvitationListing from "../invitation-listing/invitation-listing";

import {
  Image, Button
} from 'semantic-ui-react';
import { useTranslation } from "react-i18next";


export function SessionListing() {

  const { t } = useTranslation()
  const [workTypes, setWorkTypes] = useState([]);
  const [openAddSession, setOpenAddSession] = useState(false)
  const [openEditSession, setOpenEditSession] = useState(false)
  const [openViewInvitationList, setOpenViewInvitationList] = useState(false)


  const [sessionId, setSessionId] = useState(null)
  // const [viewInvitationTab, setViewInvitationTab] = useState(false)

  const history = useHistory();
  const pathNames = history.location.pathname.split("/");
  const projectId = pathNames[3].toString();

  const res = history.location.pathname.split("/");
  const referenceID = res[3].toString();

  useEffect(() => {
    if (referenceID) {
      getWorkType(referenceID)
    }
  }, [referenceID])

  // useEffect(() => {
  //   if (sessionId) {
  //     setViewInvitationTab(true)
  //   }
  // }, [sessionId])

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

  const cancel = () => {
    setOpenAddSession(false)
    setSessionId(null)
    setOpenEditSession(false)
  }
  const addNew = () => {
    setOpenAddSession(true);
    setSessionId(null)
  }

  const onClickOpenAddSession = () => {
    setOpenAddSession(true)
    setSessionId(null)
  }

  const onClickOpenMeetings = (sessionId) => {
    setOpenViewInvitationList(true)
    setSessionId(sessionId)
  }

  const onClickEditSession = (sessionId) => {
    setSessionId(sessionId)
    setOpenEditSession(true)
  }



  if (loading)
    return (
      <h1>
        {' '}
        <LazyLoading />
      </h1>
    );

  if (error) {
    return (
      <div className="no-data-found-info">
        {/* <img src={img8} className="image_center"></img> */}
        <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/default_area.png`} />

        <h3>{t("common.data_not_found")}</h3>
        <p>{t("project_tab_menu.meeting.no_session_data_found_desc")}</p>
        <Button size="small" className="primary" onClick={addNew}>
          + {t("project_tab_menu.meeting.add_new_session")}
        </Button>
        <AddSession cancel={cancel} openAddSession={openAddSession} />
      </div>
    )
  }

  //  const emptyData = {paginatedSession:{results:[]}}
  
  return (

    <div>

      {
        openViewInvitationList ?
          <InvitationListing sessionId={sessionId} />
          :
          <div>
            <AddSession cancel={cancel} openAddSession={openAddSession} />

            {data?.paginatedSession?.results?.length > 0 ?

              <div>

                {openEditSession ?
                  <EditSession
                    sessionId={sessionId}
                    openEditSession={openEditSession}
                    cancel={cancel}
                  /> : null}

                <MeetingTab
                  sessionListData={data}
                  addSession={onClickOpenAddSession}
                  selectedSessionId={onClickOpenMeetings}
                  editSession={onClickEditSession}
                />
              </div>
              :
              <div className="no-data-found-info">
                {/* <img src={img8} className="image_center"></img> */}
                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/default_area.png`} />

                <h3>{t("common.data_not_found")}</h3>
                <p>{t("project_tab_menu.meeting.no_session_data_found_desc")}</p>
                <Button size="small" className="primary" onClick={addNew}>
                  + {t("project_tab_menu.meeting.add_new_session")}
                </Button>
                <AddSession cancel={cancel} openAddSession={openAddSession} />
              </div>
            }
          </div>
      }
    </div>
  )
}

export default SessionListing