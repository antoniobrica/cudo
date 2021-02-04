import React from 'react';

import './project.module.scss';
import { ITodo } from "../../interfaces/project";
import '../../../assets/style/index.scss'
/* eslint-disable-next-line */
export interface ProjectProps {
  todo: ITodo;
}

export function Project(props: ProjectProps) {
  const { title, description } = props.todo;
  return (
    <div style={{margin:20}}>
       <div className="ui card">
            <div className="content">
            <div className="description"><img src="" alt="Logo"></img>
                <span className="summary"><span className="dot">...</span>
                    
                    </span>
                </div>
                <div className="header">Burj Khalifa</div>
                <div className="description">John & co.</div>
                <div className="description">Type of building
                <span className="summary">Residential Buildings
                    </span>
                </div>
                 
                <div className="description">Level of building
                <span className="summary">3rd
                    
                    </span>
                </div>
              
                </div>
                <div className="content">
                    <div className="description"> This is description will be show sunt in culpa qui officia deserunt mollit anim id est laborum...</div>
                    <div className="event">
                        <div className="label-green">
                           <span className="white-text">AB</span>
                            </div>
                            <div className="label-purple">
                           <span className="white-text">RJ</span>
                            </div>
                            <div className="label-blue">
                           <span className="white-text">JB</span>
                            </div>
                       </div>
                    </div>
                    </div>
   
      {/* <h1> project info!</h1>
      <h1>{title}</h1>
      <span>{description}</span> */}
    </div>
  );
}

export default Project;
