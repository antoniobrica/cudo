import React, { useEffect, useState } from 'react'
import { ModalAddProtocol } from '@cudo/shared-components'
import { useHistory } from 'react-router';
import { useSessionDetailQuery } from '../../services/useRequest';
import { ADD_PROTOCOL, GET_PROTOCOLS, GET_SESSION_DETAIL } from '../../graphql/graphql';
import { useMutation } from '@apollo/client';
import { IProtocol, IProtocolResults, IProtocols } from '../../interfaces/protocol';

export interface ProtocolAddProps {
    sessionId?
    openAddProtocol?
    cancel?
}

export function ProtocolAdd(props: ProtocolAddProps) {

    const [workTypes, setWorkTypes] = useState([]);

    const history = useHistory();
    const res = history.location.pathname.split("/");
    const projectId = res[3].toString();
    const companyId = localStorage.getItem('selectedCompany')

    const { loading: sessionDetailLoading, error: sessionDetailError, data: sessionDetailData } = useSessionDetailQuery(GET_SESSION_DETAIL, {
        variables: { sessionID: props?.sessionId },
    });

    const [addProtocol, { data }] = useMutation(ADD_PROTOCOL, 
        {
            refetchQueries: [
                {
                    query: GET_PROTOCOLS
                }
            ]
        }
    )

    const createProptocol = (data) => {
        addProtocol({
            variables:{
                companyId: data.companyId,
                    projectTypeId: data.projectTypeId,
                    workTypeId: data.workTypeId,
                    sessionId: data.sessionId,
                    protocolTitle: data.protocolTitle,
                    protocolDate: data.protocolDate,
                    protocolStartTime: data.protocolStartTime,
                    protocolEndTime: data.protocolEndTime,
                    protocolDescription: data.protocolDescription,
                    protocolId: data.protocolId,
                    protocolFiles: data.protocolFiles,
                    protocolDuration: data.protocolDuration,
                    status: data.status
            },
            update: (
                cache,
                data
            ) => {
                const cacheData = cache.readQuery({
                    query: GET_PROTOCOLS
                }) as IProtocols;

                cache.writeQuery({
                    query: GET_PROTOCOLS,
                    data: {
                        getProtocols:[...cacheData.getProtocolList.results,data]
                    }
                })
            }
        })
    }

    return (
        <div>
            <ModalAddProtocol
                sessionId={props.sessionId}
                openAddProtocol={props.openAddProtocol}
                createProtocol={createProptocol}
                cancel={props.cancel}
                sessionDetail={sessionDetailData}
                projectTypeId={projectId}
                companyId={companyId}
            />
        </div>
    )
}