import React, { useState, useEffect } from "react";
import { InvitationTab } from "@cudo/shared-components";
import { LazyLoading } from '@cudo/shared-components';
import { useInvitationQuery, useSessionDetailQuery } from '../../services/useRequest';
import { GET_INVITATIONS, GET_SESSION_DETAIL } from '../../graphql/graphql'
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { Button } from 'semantic-ui-react';
import { useTranslation } from "react-i18next";

import InvitationAdd from "../invitation-add/invitation-add";
import InvitationDetail from "../invitation-detail/invitation-detail";
import InvitationEdit from "../invitation-edit/invitation-edit";
import InvitationDelete from "../invitation-delete/invitation-delete";
import { ProtocolAdd } from "../protocol-add/protocol-add";
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

    const { loading: sessionDetailLoading, error: sessionDetailError, data: sessionDetailData } = useSessionDetailQuery(GET_SESSION_DETAIL, {
        variables: { sessionID: props?.sessionId },
    });

    const { loading, error, data } = useInvitationQuery(GET_INVITATIONS, {
        variables: { sessionId },
    });

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

                <h3>No Data Found</h3>
                <p>Hey User, you don't have any active invitation on this session. Click the button below to create a invitation list.</p>
                <Button size="small" className="primary" onClick={addNew}>
                    + Add New Invitation
                </Button>
            </div>
        )
    }

    return (
        <div>
            <InvitationAdd sessionId={props.sessionId} openAddInvitation={openPageAddInvitation} cancel={cancel} />
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
                                cancel={cancel} />
                        </div> : null}

                    {openMeetingDelete ?
                        <div>
                            <InvitationDelete
                                meetingId={selectedMeetingId}
                                sessionId={sessionId}
                                openDeleteInvitation={openMeetingDelete}
                                cancel={cancel} />
                        </div> : null}

                    <InvitationTab
                        sessionId={props?.sessionId}
                        invitations={data?.getMeetingList?.results}
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
                        + {t("project_tab_menu.meeting.add_new_invitation")}
                    </Button>

                </div>

            }
        </div>
    )

}

export default InvitationListing