import React from 'react';

import './project.module.scss';
import { ITodo, IProject } from "../../interfaces/project";
import '../../../assets/style/index.scss'
/* eslint-disable-next-line */
export interface ProjectProps {
  project: IProject;
}

export function Project(props: ProjectProps) {
  const {  projectId,
    projectName,
    projectNum,buildingType,workType } = props.project;
  return (
    <div style={{margin:20}}>
       <div className="ui card">
            <div className="content">
            <div className="description"><img src="" alt="Logo"></img>
                <span className="summary"><span className="dot">...</span>
                    
                    </span>
                </div>
                <div className="header">{projectName}</div>
                <div className="description">{projectNum}</div>
                <div className="description"> 
                <span className="summary">{buildingType}
                    </span>
                </div>
                 {workType}
                <div className="description">Level of building
                <span className="summary">3rd
                    
                    </span>
                </div>
              
                </div>
                <div className="content">
                    <div className="description"> This is description will be show officia .</div>
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
      <h1>{projectName}</h1>
      <span>{projectNum}</span> */}
    </div>
  );
}

export default Project;
