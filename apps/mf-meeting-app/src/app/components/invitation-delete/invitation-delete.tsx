import React, { useState, useEffect } from "react";
import { ModalDeleteInvitation } from "@cudo/shared-components";
import { useMutation } from '@apollo/client';
import { useInvitationDetailQuery } from '../../services/useRequest';
import { DELETE_INVITATION, GET_INVITATION_DETAIL, GET_INVITATIONS } from '../../graphql/graphql'
import { IInvitations } from '../../interfaces/invitation';
import { MS_SERVICE_URL } from '@cudo/mf-core';

export interface InvitationDeleteProps {
    sessionId?
    meetingId?
    openDeleteInvitation?
    cancel?
}

export function InvitationDelete(props: InvitationDeleteProps) {

    const { loading: invitationDetailLoading, error: invitationDetailError, data: invitationDetailData } = useInvitationDetailQuery(GET_INVITATION_DETAIL, {
        variables: { meetingId: props?.meetingId },
    });

    const [deleteMeeting, { data }] = useMutation(DELETE_INVITATION,
        {
            refetchQueries: [
                {
                    query: GET_INVITATIONS,
                    variables: { sessionId: props?.sessionId }
                }
            ]
        }
    )

    const deleteInvitation = (meetingId) => {
 
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
                    variables: { sessionId: props?.sessionId }
                });

            }
        });

        props.cancel(true)
    }

    return (
        <div>
            {invitationDetailData?.getMeetingById ?
                <ModalDeleteInvitation
                    meetingId={invitationDetailData?.getMeetingById?.meetingId}
                    deleteInvitation={deleteInvitation}
                    openDeleteInvitation={props.openDeleteInvitation}
                    cancel={props.cancel}
                /> : null}
        </div>
    )
}

export default InvitationDelete