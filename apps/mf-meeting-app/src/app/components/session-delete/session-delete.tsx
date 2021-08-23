import React, { useState, useEffect } from "react";
import { ModalDeleteSession } from "@cudo/shared-components";
import { useMutation } from '@apollo/client';
import { useSessionDetailQuery } from '../../services/useRequest';
import { DELETE_SESSION, GET_SESSIONS, GET_SESSION_DETAIL } from '../../graphql/graphql'
import { ISessions } from '../../interfaces/session';
import { MS_SERVICE_URL } from '@cudo/mf-core';

export interface SessionDeleteProps {
    projectId?
    sessionId?
    openDeleteSession?
    cancel?
    setSessionDeleteLoading?
    getSessionErrorMessage?
    getSessionToasterMessage?
    deleteSession?
    error?
    data?
    loading?
}

export function SessionDelete(props: SessionDeleteProps) {

    const { loading: sessionDetailLoading, error: sessionDetailError, data: sessionDetailData } = useSessionDetailQuery(GET_SESSION_DETAIL, {
        variables: { sessionID: props?.sessionId },
    });

    // const [deleteSessionDetail, { loading, error, data }] = useMutation(DELETE_SESSION,
    //     {
    //         refetchQueries: [{ query: GET_SESSIONS, variables: { projectId: props.projectId } }]
    //     }
    // )

    

    return (
        <div>
            {sessionDetailData?.SessionByID?.sessionID ?
                <ModalDeleteSession
                    sessionId={sessionDetailData?.SessionByID?.sessionID}
                    deleteSession={props.deleteSession}
                    openDeleteSession={props.openDeleteSession}
                    cancel={props.cancel}
                    setSessionDeleteLoading={props.setSessionDeleteLoading}
                    loading={props.loading}
                    data={props.data}
                    error={props.error}
                    getSessionToasterMessage={props.getSessionToasterMessage} getSessionErrorMessage={props.getSessionErrorMessage}
                /> : null}
        </div>
    )
}

export default SessionDelete