import React from 'react';

import './../../../assets/style/index.scss'
import { Progress } from 'semantic-ui-react'
/* eslint-disable-next-line */
export interface Tasks {
  progress?
}

export function ProgressBar(props: Tasks) {

  const description = [

  ]
  return (

    <div>

      <Progress percent={props.progress}>Completed {props.progress} %</Progress>

    </div>


  );
}

export default ProgressBar;
