import React, { useState, useEffect } from "react";
import { ModalEditInvitation } from "@cudo/shared-components";
import { useMutation } from '@apollo/client';
import { useInvitationDetailQuery } from '../../services/useRequest';
import { UPDATE_INVITATION, GET_INVITATION_DETAIL, GET_INVITATIONS } from '../../graphql/graphql'
import { IInvitations } from '../../interfaces/invitation';
import { MS_SERVICE_URL } from '@cudo/mf-core';

export interface InvitationEditProps {
    sessionId?
    meetingId?
    openEditInvitation?
    cancel?
    dataList?
}

export function InvitationEdit(props: InvitationEditProps) {

    const { loading: invitationDetailLoading, error: invitationDetailError, data: invitationDetailData } = useInvitationDetailQuery(GET_INVITATION_DETAIL, {
        variables: { meetingId: props?.meetingId },
    });

    const [editMeeting, {loading, error, data }] = useMutation(UPDATE_INVITATION,
        {
            refetchQueries: [
                {
                    query: GET_INVITATIONS,
                    variables: { sessionId: props?.sessionId }
                }
            ]
        }
    )

    const editInvitation = (data) => {
 
        editMeeting({
            variables: {
                // companyId: data.companyId,
                // projectTypeId: data.projectTypeId,
                // workTypeId: data.workTypeId,
                sessionId: data.sessionId,
                meetingId: data.meetingId,
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
            {invitationDetailData?.getMeetingById ?
                <ModalEditInvitation
                    meetingDetail={invitationDetailData?.getMeetingById}
                    editInvitation={editInvitation}
                    openEditInvitation={props.openEditInvitation}
                    cancel={props.cancel}
                    loading={loading}
                    data={data}
                    dataList={props.dataList}
                /> : null}
        </div>
    )
}

export default InvitationEdit