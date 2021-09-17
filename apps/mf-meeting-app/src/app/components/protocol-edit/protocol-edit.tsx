import React from 'react'
import { ModalEditProtocol } from "@cudo/shared-components";
import { useMutation } from '@apollo/client';
import { GET_INVITATIONS, GET_PROTOCOLS, UPDATE_PROTOCOL } from '../../graphql/graphql';
import { IProtocols } from '../../interfaces/protocol';

export interface ProtocolEditProps {
    openProtcolEdit?
    cancel
    protocolData
    sessionId?
}

export function ProtocolEdit(props: ProtocolEditProps) {

    const [editProtocol, { loading, error, data }] = useMutation(UPDATE_PROTOCOL,{
        refetchQueries: [
            {
                query: GET_PROTOCOLS,
                variables: { sessionId: props?.sessionId }
            },
            {
                query: GET_INVITATIONS,
                variables: { sessionId: props?.sessionId }
            }
        ]
    })

    const OneditProtocol = data => {
        editProtocol({
            variables: {
                // companyId: data.companyId,
                // projectTypeId: data.projectTypeId,
                // workTypeId: data.workTypeId,
                sessionId: data.sessionId,
                protocolId: data.protocolId,
                protocolTitle: data.protocolTitle,
                protocolDate: data.protocolDate,
                protocolStartTime: data.protocolStartTime,
                protocolEndTime: data.protocolEndTime,
                protocolDescription: data.protocolDescription,
                protocolFiles: data.protocolFiles,
                protocolDuration: data.protocolDuration,
                status: data.status,
            },
            update: (
                cache,
                data
            ) => {
                const cacheData = cache.readQuery({
                    query: GET_PROTOCOLS,
                    variables: { sessionId: props?.sessionId }
                }) as IProtocols;

                cache.writeQuery({
                    query: GET_PROTOCOLS,
                    data: {
                        getProtocols: [...cacheData.getProtocolList.results, data]
                    },
                    variables: { sessionId: props?.sessionId }
                })
            }
        })
    }

    return (
        <div>
            <ModalEditProtocol
                openProtcolEdit={props?.openProtcolEdit}
                cancel={props.cancel}
                protocolData={props.protocolData}
                editProtocol={OneditProtocol}
                loading={loading}
                error={error}
                data={data}
            />
        </div>
    )
}

export default ProtocolEdit