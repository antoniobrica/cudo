import React, { useState, useEffect } from "react";
import { ModalAddInvitation } from "@cudo/shared-components";
import axios from 'axios';
import { useHistory } from 'react-router';
import { useMutation } from '@apollo/client';
import { useSessionDetailQuery } from '../../services/useRequest';
import { ADD_INVITATION, GET_INVITATIONS, GET_SESSION_DETAIL } from '../../graphql/graphql'
import { IInvitations } from '../../interfaces/invitation';
import { MS_SERVICE_URL } from '@cudo/mf-core';

export interface InvitationAddProps {
    sessionId?
    openAddInvitation?
    cancel
}

export function InvitationAdd(props: InvitationAddProps) {

    const [workTypes, setWorkTypes] = useState([]);

    const history = useHistory();
    const res = history.location.pathname.split("/");
    const projectId = res[3].toString();
    const companyId = "company_1" // "Sftobiz_1234"

    const { loading: sessionDetailLoading, error: sessionDetailError, data: sessionDetailData } = useSessionDetailQuery(GET_SESSION_DETAIL, {
        variables: { sessionID: props?.sessionId },
    });

    const [addMeeting, { data }] = useMutation(ADD_INVITATION,
        {
            refetchQueries: [
                {
                    query: GET_INVITATIONS,
                    variables: { sessionId: props?.sessionId }
                }
            ]
        }
    )

    const createInvitation = (data) => {

        addMeeting({
            variables: {
                companyId: data.companyId,
                projectTypeId: data.projectTypeId,
                workTypeId: data.workTypeId,
                sessionId: data.sessionId,
                meetingTitle: data.meetingTitle,
                meetingDate: data.meetingDate,
                meetingStartTime: data.meetingStartTime,
                meetingEndTime: data.meetingEndTime,
                inviteGuests: data.inviteGuests,
                meetingDescription: data.meetingDescription,
                protocolId: data.protocolId,
                protocolTitle: data.protocolTitle,
                members: data.members,
                meetingFiles: data.meetingFiles,
                meetingDuration: data.meetingDuration,
                status: data.status
            },
            update: (
                cache,
                data
            ) => {
                const cacheData = cache.readQuery({
                    query: GET_INVITATIONS,
                    variables: { sessionId: props?.sessionId }
                }) as IInvitations;

                cache.writeQuery({
                    query: GET_INVITATIONS,
                    data: {
                        getMeetings: [...cacheData.getMeetingList.results, data]
                    },
                    variables: { sessionId: props?.sessionId }
                });

            }
        });
    }

    return (
        <div>
            <ModalAddInvitation
                sessionId={props?.sessionId}
                openAddInvitation={props.openAddInvitation}
                createInvitation={createInvitation}
                cancel={props.cancel}
                sessionDetail={sessionDetailData}
                projectTypeId={projectId}
                companyId={companyId}
            />
        </div>
    )
}

export default InvitationAdd