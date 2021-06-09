import React from 'react';

import './../../../assets/style/index.scss'
import { Message } from 'semantic-ui-react'

/* eslint-disable-next-line */
export interface MessageProps {
    warning?
    error?
    succes?
}

export function Messagebar({
    warning = "Warning Alert",
    error = "Error Alert",
    succes = "Success Alert"
}: MessageProps) {

    const description = [
        <Message color='red'>Red</Message>
    ]
    return (
        <div className="app-content-body ">
            <div>
                <div className="ui red message">{warning}</div>
                <div className="ui yellow message">{error}</div>
                <div className="ui green message">{succes}</div>
            </div>
        </div>




    );
}

export default Messagebar;
