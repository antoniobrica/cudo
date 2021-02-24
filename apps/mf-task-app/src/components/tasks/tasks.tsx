import React from 'react';
import CreateTask from '../../app/components/create-task/create-task';

import './tasks.module.scss';

/* eslint-disable-next-line */
export interface TasksProps {}

export function Tasks(props: TasksProps) {
  return (
    <div>
      <h1>Welcome to tasks!</h1>
      <CreateTask />
    </div>
  );
}

export default Tasks;
