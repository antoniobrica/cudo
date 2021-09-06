import React, { useState, useEffect } from "react";
import { InvitationTab } from "@cudo/shared-components";
import { LazyLoading } from '@cudo/shared-components';
import { useInvitationQuery, useProtocolQuery, useSessionDetailQuery } from '../../services/useRequest';
import { DELETE_INVITATION, GET_INVITATIONS, GET_PROTOCOLS, GET_SESSION_DETAIL, UPDATE_INVITATION } from '../../graphql/graphql'
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { Button } from 'semantic-ui-react';
import { useTranslation } from "react-i18next";

import InvitationAdd from "../invitation-add/invitation-add";
import InvitationDetail from "../invitation-detail/invitation-detail";
import InvitationEdit from "../invitation-edit/invitation-edit";
import InvitationDelete from "../invitation-delete/invitation-delete";
import { ProtocolAdd } from "../protocol-add/protocol-add";
import { toast } from "react-toastify";
import { IInvitations } from "../../interfaces/invitation";
import { useMutation } from "@apollo/client";
export interface InvitationListingProps {
    sessionId?
}

export function InvitationListing(props: InvitationListingProps) {

    const { t } = useTranslation()
    const [openPageAddInvitation, setOpenPageAddInvitation] = useState(false)
    const [openPageAddProtocol, setOpenPageAddProtocol] = useState(false)
    const [openAddInvitationFromTab, setOpenAddInvitationFromTab] = useState(false)
    const [openAddProtocolFromTab, setOpenAddProtocolFromTab] = useState(false)
    const [sessionId, setSessionId] = useState(null)

    const [selectedMeetingId, setSelectedMeetingId] = useState(null)
    const [openMeetingDetail, setOpenMeetingDetail] = useState(false)
    const [openMeetingEdit, setOpenMeetingEdit] = useState(false)
    const [openMeetingDelete, setOpenMeetingDelete] = useState(false)
    const [activeErrorClass, setActiveErrorClass] = useState(false)
    const [invitationError, setInvitationError] = useState("")
    const [invitationDeleteLoading, setInvitationDeleteLoading] = useState(false)

    const { loading: sessionDetailLoading, error: sessionDetailError, data: sessionDetailData } = useSessionDetailQuery(GET_SESSION_DETAIL, {
        variables: { sessionID: props?.sessionId },
    });

    const { loading, error, data } = useInvitationQuery(GET_INVITATIONS, {
        variables: { sessionId },
    });

    const { loading: protocolLoading, error: protocolError, data: protocolData } = useProtocolQuery(GET_PROTOCOLS, {
        variables: {sessionId},
    }); 

     // set sucess value to toaster function
  const getInvitationToasterMessage = (data) => {
    setActiveErrorClass(false)
    toast(data)
  }

  // set error value to task error for toaster function
  const getInvitationErrorMessage = (data) => {
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
    setInvitationError(errorExeptionMessage)
  }

  // set error message to toaster
  useEffect(() => {
    if (invitationError) {
      toast(invitationError)
    }
  }, [invitationError])

    useEffect(() => {
        if (props.sessionId) {
            setSessionId(props.sessionId)
        }
    }, [props.sessionId])

    useEffect(() => {
        if (openAddInvitationFromTab) {
            setOpenPageAddInvitation(true);
        }
    }, [openAddInvitationFromTab])

    useEffect(() => {
        if(openAddProtocolFromTab){
            setOpenPageAddProtocol(true)
        }
    },[openAddProtocolFromTab])

    const onTabInvitationAddClick = () => {
        setOpenAddInvitationFromTab(true)
        setOpenPageAddInvitation(true);
    }

    const onTabProtocolAddClick = () => {
        setOpenAddProtocolFromTab(true)
        setOpenPageAddProtocol(true)
    }

    const addNew = () => {  
         setOpenPageAddInvitation(true);
    }
    const cancel = () => {
        setOpenPageAddInvitation(false)
        setOpenMeetingDetail(false)
        setOpenMeetingEdit(false)
        setOpenPageAddProtocol(false)
        setOpenMeetingDelete(false)
    }

    const onClickViewInvitation = (meetingId) => {
        setSelectedMeetingId(meetingId)
        setOpenMeetingDetail(true)
    }

    const onClickEditInvitation = (meetingId) => {
        setSelectedMeetingId(meetingId)
        setOpenMeetingEdit(true)
    }

    const onClickDeleteInvitation = (meetingId) => {
        setSelectedMeetingId(meetingId)
        setOpenMeetingDelete(true)
    }

    const [deleteMeeting, { loading: deleteInvitationLoading, error: deleteInvitationError, data: deleteInvitationData }] = useMutation(DELETE_INVITATION,
        {
            refetchQueries: [
                {
                    query: GET_INVITATIONS,
                    variables: { sessionId: props?.sessionId }
                }
            ]
        }
    )

    useEffect(() => {
        if(!deleteInvitationLoading && deleteInvitationData){
          getInvitationToasterMessage(t("toaster.success.meeting.meeting_deleted"))      
          cancel()
          setInvitationDeleteLoading(false)

        }
        if(!deleteInvitationLoading && deleteInvitationError){
          getInvitationErrorMessage(deleteInvitationError?.graphQLErrors[0]?.extensions?.exception?.status)
          cancel()
          setInvitationDeleteLoading(false)
        }
      },[deleteInvitationLoading])

    const deleteInvitation = (meetingId) => {
        setInvitationDeleteLoading(true)
 
        deleteMeeting({
            variables: { meetingId },
            update: (
                cache,
                data
            ) => {
                const cacheData = cache.readQuery({
                    query: GET_INVITATIONS,
                    variables: { sessionId: props?.sessionId }
                }) as IInvitations;
 
                const newMeetings = cacheData?.getMeetingList?.results?.filter(
                    (item) => item.meetingId !== meetingId
                  );
                  
                cache.writeQuery({
                    query: GET_INVITATIONS,
                    data: {
                        getMeetings: newMeetings
                    },
                    variables: { sessionId: sessionId }
                });

            }
        });

        cancel()
    }

   

    if (loading || invitationDeleteLoading)
        return (
                <LazyLoading />
        );

    if (error) {
        return (
            <div className="no-data-found-info">
                {/* <img src={img8} className="image_center"></img> */}
                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/default_area.png`} />

                <h3>{t("common.data_not_found")}</h3>
                <p>{t("project_tab_menu.meeting.no_invitation_data_found_desc")}</p>
                <Button size="small" className="primary" onClick={addNew}>
                <i className="ms-Icon ms-font-xl ms-Icon--Add"></i> {t("project_tab_menu.meeting.add_new_invitation")}
                </Button>
            </div>
        )
    }

    return (
        <div>
            <InvitationAdd sessionId={props.sessionId} openAddInvitation={openPageAddInvitation} dataList={data} cancel={cancel} getInvitationToasterMessage={getInvitationToasterMessage} getInvitationErrorMessage={getInvitationErrorMessage} />
            <ProtocolAdd sessionId={props.sessionId} openAddProtocol= {openPageAddProtocol} cancel={cancel} />


            {data?.getMeetingList?.results?.length > 0 ?
                <div>
                    {openMeetingDetail ?
                        <div>
                            <InvitationDetail meetingId={selectedMeetingId}
                                sessionDetail={sessionDetailData}
                                openDetailInvitation={openMeetingDetail}
                                cancel={cancel} />
                        </div> : null}

                    {openMeetingEdit ?
                        <div>
                            <InvitationEdit
                                meetingId={selectedMeetingId}
                                sessionId={sessionId}
                                openEditInvitation={openMeetingEdit}
                                dataList={data}
                                cancel={cancel} 
                                getInvitationToasterMessage={getInvitationToasterMessage} getInvitationErrorMessage={getInvitationErrorMessage}
                                />
                        </div> : null}

                    {openMeetingDelete ?
                        <div>
                            <InvitationDelete
                                meetingId={selectedMeetingId}
                                sessionId={sessionId}
                                openDeleteInvitation={openMeetingDelete}
                                cancel={cancel}
                                deleteInvitation={deleteInvitation} />
                        </div> : null}

                    <InvitationTab
                        sessionId={props?.sessionId}
                        invitations={data?.getMeetingList?.results}
                        protocols = {protocolData?.getProtocolList?.results}
                        addInvitationClick={onTabInvitationAddClick}
                        addProtocolClick={onTabProtocolAddClick}
                        sessionDetail={sessionDetailData}
                        viewInvitation={onClickViewInvitation}
                        editInvitation={onClickEditInvitation}
                        deleteInvitation={onClickDeleteInvitation}
                    />
                </div>
                : // null

                <div className="no-data-found-info">
                    {/* <img src={img8} className="image_center"></img> */}
                    <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/default_area.png`} />

                    <h3>{t("common.data_not_found")}</h3>
                    <p>{t("project_tab_menu.meeting.no_invitation_data_found_desc")}</p>
                    <Button size="small" className="primary" onClick={addNew}>
                    <i className="ms-Icon ms-font-xl ms-Icon--Add"></i> {t("project_tab_menu.meeting.add_new_invitation")}
                    </Button>

                </div>

            }
        </div>
    )

}

export default InvitationListing