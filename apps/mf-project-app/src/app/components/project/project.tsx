import React from 'react';

import './project.module.scss';
import { ITodo } from "../../interfaces/project";


/* eslint-disable-next-line */
export interface ProjectProps {
  todo: ITodo;
}

export function Project(props: ProjectProps) {
  const { title, description } = props.todo;
  return (
    <div>
      <h1> project info!</h1>
      <h1>{title}</h1>
      <span>{description}</span>
    </div>
  );
}

export default Project;
