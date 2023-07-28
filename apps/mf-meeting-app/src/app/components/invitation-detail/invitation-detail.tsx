import React from "react";
import { ModalDetailInvitation } from "@cudo/shared-components";

import { useInvitationDetailQuery } from '../../services/useRequest';
import { GET_INVITATION_DETAIL } from '../../graphql/graphql'


export interface InvitationDetailProps {
    meetingId?
    sessionDetail?
    openDetailInvitation?
    cancel?
}

export function InvitationDetail(props: InvitationDetailProps) {
    console.log('--detail page--meetingId---', props.meetingId)
    const { loading, error, data } = useInvitationDetailQuery(GET_INVITATION_DETAIL, {
        variables: { meetingId: props?.meetingId },
    });

    console.log('----meeting detail page data----', data)
    return (
        <div>
            {data?.getMeetingById ?
                <ModalDetailInvitation
                    meetingDetail={data?.getMeetingById}
                    sessionDetail={props.sessionDetail}
                    openDetailInvitation={props.openDetailInvitation}
                    cancel={props.cancel}
                /> : null}
        </div>
    )
}

export default InvitationDetail