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
}

export function SessionDelete(props: SessionDeleteProps) {

    const { loading: sessionDetailLoading, error: sessionDetailError, data: sessionDetailData } = useSessionDetailQuery(GET_SESSION_DETAIL, {
        variables: { sessionID: props?.sessionId },
    });

    const [deleteSessionDetail, { data }] = useMutation(DELETE_SESSION,
        {
            refetchQueries: [{ query: GET_SESSIONS, variables: { projectId: props.projectId } }]
        }
    )

    const deleteSession = (sessionID) => {

        deleteSessionDetail({
            variables: { sessionID },
            update: (
                cache,
                data
            ) => {
                const cacheData = cache.readQuery({
                    query: GET_SESSIONS,
                    variables: { projectId: props?.projectId }
                }) as ISessions;
                const newSessions = cacheData?.paginatedSession?.results?.filter(
                    (item) => item.sessionID !== sessionID
                );
                cache.writeQuery({
                    query: GET_SESSIONS,
                    variables: { projectId: props.projectId },
                    data: {
                        getSessions: newSessions
                    }
                });

            }
        });
    }

    return (
        <div>
            {sessionDetailData?.SessionByID?.sessionID ?
                <ModalDeleteSession
                    sessionId={sessionDetailData?.SessionByID?.sessionID}
                    deleteSession={deleteSession}
                    openDeleteSession={props.openDeleteSession}
                    cancel={props.cancel}
                /> : null}
        </div>
    )
}

export default SessionDelete