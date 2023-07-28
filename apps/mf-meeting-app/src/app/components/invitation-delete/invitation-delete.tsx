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
    deleteInvitation?
}

export function InvitationDelete(props: InvitationDeleteProps) {

    const { loading: invitationDetailLoading, error: invitationDetailError, data: invitationDetailData } = useInvitationDetailQuery(GET_INVITATION_DETAIL, {
        variables: { meetingId: props?.meetingId },
    });

    return (
        <div>
            {invitationDetailData?.getMeetingById ?
                <ModalDeleteInvitation
                    meetingId={invitationDetailData?.getMeetingById?.meetingId}
                    deleteInvitation={props.deleteInvitation}
                    openDeleteInvitation={props.openDeleteInvitation}
                    cancel={props.cancel}
                /> : null}
        </div>
    )
}

export default InvitationDelete