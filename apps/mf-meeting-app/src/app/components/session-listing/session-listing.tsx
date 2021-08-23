import React, { useState, useEffect } from "react";
import MeetingTab from "libs/shared-components/src/lib/components/tabs/meetingtabs"
import { LazyLoading } from '@cudo/shared-components';
import { useHistory } from 'react-router';
import axios from 'axios';
import { DELETE_SESSION, GET_SESSIONS } from '../../graphql/graphql'
import { useSessionQuery } from '../../services/useRequest';
import AddSession from '../session-add/session-add';
import EditSession from '../session-edit/session-edit';
import DeleteSession from '../session-delete/session-delete';
import { MS_SERVICE_URL } from '@cudo/mf-core';

import InvitationListing from "../invitation-listing/invitation-listing";

import {
  Image, Button
} from 'semantic-ui-react';
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { ISessions } from "../../interfaces/session";
import { useMutation } from "@apollo/client";


export function SessionListing() {

  const { t } = useTranslation()
  const [workTypes, setWorkTypes] = useState([]);
  const [openAddSession, setOpenAddSession] = useState(false)
  const [openEditSession, setOpenEditSession] = useState(false)
  const [openDeleteSession, setOpenDeleteSession] = useState(false)
  const [openViewInvitationList, setOpenViewInvitationList] = useState(false)
  const [activeErrorClass, setActiveErrorClass] = useState(false)
  const [costErrors, setCostErrors] = useState("")
  const [sessionId, setSessionId] = useState(null)
  // const [viewInvitationTab, setViewInvitationTab] = useState(false)

  const history = useHistory();
  const pathNames = history.location.pathname.split("/");
  const projectId = pathNames[3].toString();

  const res = history.location.pathname.split("/");
  const referenceID = res[3].toString();
  const [sessionDeleteLoading, setSessionDeleteLoading] = useState(false)

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

  // useEffect(() => {
  //   setSessionDeleteLoading(false)

  // }, [data])

  // set sucess value to toaster function
  const getSessionToasterMessage = (data) => {
    setActiveErrorClass(false)
    toast(data)
  }

  // set error value to task error for toaster function
  const getSessionErrorMessage = (data) => {
    setActiveErrorClass(true)

    let errorExeptionMessage: string;
    switch (data) {
      case 4001:
        errorExeptionMessage = t("toaster.error.meeting.session.session_already_exists")
        break
      case 4002:
        errorExeptionMessage = t("toaster.error.meeting.session.planning_not_found")
        break
      case 4003:
        errorExeptionMessage = t("toaster.error.meeting.session.planning_not_created")
        break
      case 4004:
        errorExeptionMessage = t("toaster.error.meeting.session.no_title")
        break
      case 4005:
        errorExeptionMessage = t("toaster.error.meeting.session.no_worktype")
        break
      case 4007:
        errorExeptionMessage = t("toaster.error.meeting.session.no_assignee")
        break
      case 4008:
        errorExeptionMessage = t("toaster.error.meeting.session.no_category")
        break
      case 4009:
        errorExeptionMessage = t("toaster.error.meeting.session.no_members")
        break
      case 4012:
        errorExeptionMessage = t("toaster.error.meeting.session.no_invitation_template")
        break
      case 4013:
        errorExeptionMessage = t("toaster.error.meeting.session.no_protocol_template")
        break
      case 4014:
        errorExeptionMessage = t("toaster.error.meeting.session.no_admin")
        break
      case 500:
        errorExeptionMessage = t("toaster.error.meeting.session.internal_server_error")
        break
      default:
        errorExeptionMessage = ""
    }
    setCostErrors(errorExeptionMessage)
  }

  // set error message to toaster
  useEffect(() => {
    if (costErrors) {
      toast(costErrors)
    }
  }, [costErrors])

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

  const [deleteSessionDetail, { loading: deleteSessionLoading, error: deleteSessionerror, data: deleteSessionData }] = useMutation(DELETE_SESSION,
    {
      refetchQueries: [{ query: GET_SESSIONS, variables: { projectId: projectId } }]
    }
  )

  useEffect(() => {
    if (!deleteSessionLoading && deleteSessionData) {
      getSessionToasterMessage(t("toaster.success.meeting.session_deleted"))
      cancel()
      setSessionDeleteLoading(false)
    }
    if (!deleteSessionLoading && deleteSessionerror) {
      getSessionErrorMessage(deleteSessionerror?.graphQLErrors[0]?.extensions.exception.status)
      cancel()
      setSessionDeleteLoading(false)
    }

  }, [deleteSessionLoading])

  const deleteSession = (sessionID) => {
    setSessionDeleteLoading(true)

    deleteSessionDetail({
      variables: { sessionID },
      update: (
        cache,
        data
      ) => {
        const cacheData = cache.readQuery({
          query: GET_SESSIONS,
          variables: { projectId: projectId }
        }) as ISessions;
        const newSessions = cacheData?.paginatedSession?.results?.filter(
          (item) => item.sessionID !== sessionID
        );

        cache.writeQuery({
          query: GET_SESSIONS,
          variables: { projectId: projectId },
          data: {
            getSessions: newSessions
          }
        });

      }
    });

    cancel()
  }

  const cancel = () => {
    setOpenAddSession(false)
    setSessionId(null)
    setOpenEditSession(false)
    setOpenDeleteSession(false)

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

  const onClickDeleteSession = (sessionId) => {
    setSessionId(sessionId)
    setOpenDeleteSession(true)
  }

  if (loading || sessionDeleteLoading)
    return (
      <h1>
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
        <AddSession projectId={projectId} cancel={cancel} openAddSession={openAddSession} />
      </div>
    )
  }

  //  const emptyData = {paginatedSession:{results:[]}}

  return (

    <div>
      <ToastContainer className={`${activeErrorClass ? "error" : "success"}`} position="top-right" autoClose={5000} hideProgressBar={true} closeOnClick pauseOnFocusLoss pauseOnHover />

      {
        openViewInvitationList ?
          <InvitationListing sessionId={sessionId} />
          :
          <div>
            <AddSession projectId={projectId} cancel={cancel} openAddSession={openAddSession} dataList={data} getSessionToasterMessage={getSessionToasterMessage} getSessionErrorMessage={getSessionErrorMessage} />

            {data?.paginatedSession?.results?.length > 0 ?

              <div>

                {openEditSession ?
                  <EditSession
                    projectId={projectId}
                    sessionId={sessionId}
                    openEditSession={openEditSession}
                    dataList={data}
                    cancel={cancel}
                    getSessionToasterMessage={getSessionToasterMessage} getSessionErrorMessage={getSessionErrorMessage}
                  /> : null}

                {openDeleteSession ?
                  <DeleteSession
                    projectId={projectId}
                    sessionId={sessionId}
                    openDeleteSession={openDeleteSession}
                    cancel={cancel}
                    getSessionToasterMessage={getSessionToasterMessage} getSessionErrorMessage={getSessionErrorMessage}
                    deleteSession={deleteSession}
                  /> : null}

                <MeetingTab
                  sessionListData={data}
                  addSession={onClickOpenAddSession}
                  selectedSessionId={onClickOpenMeetings}
                  editSession={onClickEditSession}
                  deleteSession={onClickDeleteSession}
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
                <AddSession projectId={projectId} cancel={cancel} openAddSession={openAddSession} />
              </div>
            }
          </div>
      }
    </div>
  )
}

export default SessionListing