import React from 'react';
 
import '../../../style/index.scss';
import { Message } from 'semantic-ui-react'

/* eslint-disable-next-line */
export interface MessageProps { }

export function Messagebar(props: MessageProps) {

    const description = [
        <Message color='red'>Red</Message>
      
      ] 
  return (

      <div className="app-content-body ">
      <div>
          <div className="ui red message">Warning Alert</div>
          
          <div className="ui yellow message">Error Alert</div>
          <div className="ui green message">Success Alert</div> 
          </div>
      </div>
  
        
    
 
  );
}

export default Messagebar;
