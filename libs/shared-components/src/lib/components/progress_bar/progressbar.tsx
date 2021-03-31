import React from 'react';
 
import '../../../style/index.scss';
import { Progress } from 'semantic-ui-react'
/* eslint-disable-next-line */
export interface Tasks {
  progress
 }

export function ProgressBar(props: Tasks) {

    const description = [
        
      ] 
  return (

      <div>
      
      <Progress percent={props.progress}>file uploading {props.progress} %</Progress>
 
     </div> 
    
 
  );
}

export default ProgressBar;
